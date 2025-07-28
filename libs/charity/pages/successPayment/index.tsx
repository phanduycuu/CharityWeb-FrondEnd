"use client";
import CustomButton from "@/libs/core/components/button/button";

import { NextPage } from "next";

import { useRouter } from "next/navigation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const Success: NextPage = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 h-[300px ] border-2 border-solid flex flex-col items-center mt-8 p-8">
        <div className=" flex flex-col items-center space-y-8 w-4/5  ">
          <CheckCircleOutlineIcon
            style={{ width: "80px", height: "80px", color: "green" }}
          />
          <h1 className="text-2xl text-lime-600">Cảm ơn vì sự ủng hộ từ bạn</h1>
          <CustomButton
            fullWidth={true}
            backgroundColor="#2962FF"
            textColor="#ffffff"
            onClick={() => router.push("/system")}
          >
            Quay lại trang chủ
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
