"use client";
import CustomButton from "@/libs/core/components/button/button";
import InputField from "@/libs/core/components/input/Input";
import { TextField } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { login, loginGoogle, Register } from "../../services/authServices";
import CustomSnackbar from "@/libs/core/components/SnackBar";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import axios from "axios";

function GoogleLoginButton() {
  const router = useRouter();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    const res = await loginGoogle(idToken || "");

    // Lưu token, redirect, hoặc hiển thị thông tin
    if (res) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("tokenKit", JSON.stringify(res.data.tokenKit));
      router.push("/system");
    }
    return res.data;
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export const Login: NextPage = () => {
  const router = useRouter();
  const pageType = useParams();
  const isLogin = pageType?.pageType === "login";
  const [openError, setOpenError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const handSubmit = async () => {
    email === "" ? setErrorEmail("Vui lòng nhập email") : setErrorEmail("");
    !isLogin && name === ""
      ? setErrorName("Vui lòng nhập tên người dùng")
      : setErrorName("");
    password === ""
      ? setErrorPassword("Vui lòng nhập password")
      : setErrorPassword("");
    if (isLogin && errorEmail === "" && errorPassword === "") {
      try {
        const response = await login({
          email,
          password,
        });

        console.log(response.data);

        if (response) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "tokenKit",
            JSON.stringify(response.data.tokenKit)
          );
          router.push("/system");
        }
      } catch (error: any) {
        console.error("Đăng nhập thất bại:", error);

        // Nếu API trả lỗi từ server
        if (error.response?.data?.message) {
          setMessageError(error.response.data.message);
          setOpenError(true);
        } else {
          alert("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
        }
      }
    }
    if (
      !isLogin &&
      errorEmail === "" &&
      errorPassword === "" &&
      errorName === ""
    ) {
      try {
        const response = await Register({
          email,
          name,
          password,
          role: "Donor",
        });
        router.push("/auth/login");
      } catch (error: any) {
        console.error("Đăng kí thất bại:", error);

        // Nếu API trả lỗi từ server
        if (error.response?.data) {
          setMessageError(error.response.data);
          setOpenError(true);
        } else {
          alert("Đã xảy ra lỗi khi đăng kí. Vui lòng thử lại.");
        }
      }
    }
  };
  return (
    <form>
      <CustomSnackbar
        open={openError}
        onClose={() => setOpenError(false)}
        message={messageError}
        severity="error"
      />
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/3 h-[300px ] border-2 border-solid flex flex-col items-center mt-8 p-8">
          <div className=" flex flex-col items-center space-y-8 w-4/5  ">
            <Image
              src="/img/image.png" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
              alt="Mô tả ảnh" // Bắt buộc
              width={60} // Bắt buộc
              height={60} // Bắt buộc
            />

            <InputField
              label="Email"
              type="text"
              helperText={true}
              errorMessage={errorEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isLogin && (
              <InputField
                label="Tên người dùng"
                helperText={true}
                errorMessage={errorName}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <InputField
              type="password"
              label="Mật khẩu"
              errorMessage={errorPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
              fullWidth={true}
              backgroundColor="#2962FF"
              textColor="#ffffff"
              onClick={handSubmit}
            >
              {isLogin ? "Đăng nhập" : "Đăng kí"}
            </CustomButton>
            <GoogleOAuthProvider clientId="343317132434-l7rnqda6cl651ljl2h7ahocmclgaabrj.apps.googleusercontent.com">
              <GoogleLoginButton />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </form>
  );
};
