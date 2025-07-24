import ProgressBar from "@/libs/core/components/progressBar";
import { Grid } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";

export const CampaignItem: NextPage = () => {
  const amount: number = 1000000;
  return (
    <Grid
      container
      sx={{ padding: "0 10px", marginTop: "10px" }}
      rowSpacing={4}
      columnSpacing={4}
    >
      <Grid size={4}>
        <div className="relative h-[450px] border-2 border-solid flex flex-col items-center justify-start">
          <Image
            src="/img/tu_thien.jpg" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
            alt="Mô tả ảnh" // Bắt buộc
            width={400} // Bắt buộc
            height={300} // Bắt buộc
            sizes="100vw"
          />
          <div className="absolute top-2 right-2 bg-rose-500 text-white px-3 py-1 text-sm rounded">
            Trẻ em
          </div>

          <div className="w-10/12">
            <h1 className="text-2xl mb-4 mt-4">aaaaaa</h1>
            <ProgressBar amount={4831500} percent={10} />
            <h1 className="mt-4 text-gray-400">
              Với mục tiêu {amount.toLocaleString("vi-VN")}đ
            </h1>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
