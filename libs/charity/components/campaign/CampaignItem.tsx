import ProgressBar from "@/libs/core/components/progressBar";
import { Campaign } from "@/libs/shared/charity/model/campaign.model";
import { Grid } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CampaignItem({ campaign }: { campaign: Campaign }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGE;
  // const [campaign, setCampaign] = useState<Campaign[]>([]);
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const fetchgetcampaign = async () => {
  //   try {
  //     const response = await getcampaign();
  //     console.log(response.data.items);
  //     // setcampaign(response.data);
  //   } catch (err) {
  //     console.error("Lỗi :", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchgetcampaign();
  // }, []);
  const router = useRouter();
  return (
    <Grid size={4}>
      <div
        className="relative h-[460px] border-2 border-solid flex flex-col items-center justify-start"
        onClick={() => router.push(`/system/campaign/${campaign.id}`)}
      >
        <div className="relative w-full h-1/2">
          <Image
            src={`${API_URL}${campaign.imageUrl}`} // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
            alt="Mô tả ảnh" // Bắt buộc
            fill // Bắt buộc
            // sizes="100vw"
          />
        </div>
        <div className="absolute top-2 right-2 bg-rose-500 text-white px-3 py-1 text-sm rounded">
          {campaign.category.name}
        </div>

        <div className="w-10/12">
          <h1 className="text-2xl h-[60px] mb-4 mt-4">{campaign.title}</h1>
          <ProgressBar
            amount={campaign.currentAmount}
            percent={(campaign.currentAmount / campaign.goalAmount) * 100}
          />
          <h1 className="mt-4 text-gray-400">
            Với mục tiêu {campaign.goalAmount.toLocaleString("vi-VN")}đ
          </h1>
        </div>
      </div>
    </Grid>
  );
}
