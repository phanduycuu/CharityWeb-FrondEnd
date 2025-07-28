"use client";
import { NextPage } from "next";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCampaignById } from "../../services/campaignServices";
import { Campaign as CampaignType } from "@/libs/shared/charity/model/campaign.model";
import ProgressBar from "@/libs/core/components/progressBar";
import CustomButton from "@/libs/core/components/button/button";
import BasicTabs from "../../components/campaign/TabCampaign";
import Payment from "../../components/campaign/Payment";
import dayjs from "dayjs";

export const Campaign: NextPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGE;
  const [displayValue, setDisplayValue] = useState("");
  const [rawValue, setRawValue] = useState("");
  const [open, setopen] = useState<boolean>(false);
  const params = useParams();
  const id = params?.id as string;

  const [campaign, setCampaign] = useState<CampaignType | null>(null);

  useEffect(() => {
    const fetchCampaignById = async () => {
      try {
        if (id) {
          const response = await getCampaignById(id);
          console.log(response.data);
          setCampaign(response.data);
        }
      } catch (err) {
        console.error("Lỗi :", err);
      }
    };

    fetchCampaignById();
  }, [id]);

  const handSubmit = () => {
    setopen(true);
  };

  const formatMoney = (value: string) => {
    const numeric = value.replace(/\D/g, ""); // Loại bỏ mọi ký tự không phải số
    if (!numeric) return "";
    return new Intl.NumberFormat("vi-VN").format(Number(numeric));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numeric = input.replace(/\D/g, "");
    const formatted = formatMoney(input);

    setDisplayValue(formatted); // Hiển thị người dùng thấy
    setRawValue(numeric); // Lưu giá trị thực (dùng khi submit)
  };

  if (!campaign) return <p>Đang tải chiến dịch...</p>;

  return (
    <div className="w-full h-full flex flex-col items-center font-roboto ">
      <div
        className=" w-full h-[200px] bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/img/tu_thien.jpg')" }}
      ></div>
      <div className="flex w-full h-1/2 items-center justify-center m-10 space-x-10">
        <div className="relative w-1/4 h-[300px] ">
          <Image
            src={
              campaign?.imageUrl
                ? `${API_URL}${campaign?.imageUrl}`
                : "/img/image.png" // ảnh mặc định trong /public
            }
            alt="Mô tả ảnh" // Bắt buộc
            fill
            className="rounded-xl object-cover"
          />
          <div className="absolute top-2 right-2 bg-rose-500 text-white px-3 py-1 text-sm rounded">
            {campaign?.category?.name}
          </div>
        </div>
        <div className="flex flex-col h-[300px] items-start w-1/4 rounded-xl object-cover border-2 border-solid p-6 space-y-5">
          <h1 className="text-2xl h-[60px] font-bold">{campaign.title}</h1>
          <ProgressBar
            amount={campaign.currentAmount}
            percent={(campaign.currentAmount / campaign.goalAmount) * 100}
          />
          <h1 className="mt-4 text-gray-400">
            Với mục tiêu {campaign.goalAmount.toLocaleString("vi-VN")}đ
          </h1>
          <div className="w-full flex  space-x-6">
            {/* <TextField
              label="Nhập số tiền"
              value={displayValue}
              onChange={handleChange}
              fullWidth
              placeholder="Nhập số tiền"
            /> */}
            <CustomButton
              fullWidth={true}
              backgroundColor={
                campaign.status === "Finished" ||
                dayjs(campaign.deadline).isBefore(dayjs())
                  ? "#e2e2e4"
                  : "#2962FF"
              }
              textColor="#ffffff"
              onClick={handSubmit}
              disabled={
                campaign.status === "Finished" ||
                dayjs(campaign.deadline).isBefore(dayjs())
              }
            >
              {campaign.status === "Finished"
                ? "Mục tiêu đã hoàn thành 🥰"
                : dayjs(campaign.deadline).isBefore(dayjs())
                ? "Kết thúc thời gian dự án"
                : " Ủng hộ ngay"}
            </CustomButton>
            <Payment
              open={open}
              onClose={() => setopen(false)}
              campaignId={campaign.id}
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 ">
        <BasicTabs campaign={campaign} />
      </div>
    </div>
  );
};
