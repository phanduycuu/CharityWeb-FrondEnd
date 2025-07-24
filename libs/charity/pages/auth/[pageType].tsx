"use client";
import CustomButton from "@/libs/core/components/button/button";
import InputField from "@/libs/core/components/input/Input";
import { TextField } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { login, Register } from "../../services/authServices";

export const Login: NextPage = () => {
  const router = useRouter();
  const pageType = useParams();
  const isLogin = pageType?.pageType === "login";

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
    if (isLogin) {
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
    } else {
      const response = await Register({
        email,
        name,
        password,
        role: "Donor",
      });
      router.push("/auth/login");
    }
  };
  return (
    <form>
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
          </div>
        </div>
      </div>
    </form>
  );
};
