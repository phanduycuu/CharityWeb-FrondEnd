"use client";
import ProgressBar from "@/libs/core/components/progressBar";
import { Grid } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCampaign } from "../../services/campaignServices";
import { Campaign } from "@/libs/shared/charity/model/campaign.model";
import { CampaignItem } from "../../components/campaign/CampaignItem";
import { getStatisticalUser } from "../../services/statisticalServices";
import { StatisticalUser } from "@/libs/shared/charity/model/statistiacal.model";

export const Home: NextPage = () => {
  const [campaign, setCampaign] = useState<Campaign[]>([]);
  const [statistical, setStatistical] = useState<StatisticalUser | null>(null);
  const fetchgetcampaign = async () => {
    try {
      const response = await getCampaign();
      setCampaign(response.data.items);
    } catch (err) {
      console.error("Lỗi :", err);
    }
  };
  const fetchgetStatistical = async () => {
    try {
      const response = await getStatisticalUser();
      setStatistical(response.data);
    } catch (err) {
      console.error("Lỗi :", err);
    }
  };

  useEffect(() => {
    fetchgetcampaign();
    fetchgetStatistical();
  }, []);

  function formatVietNamCurrency(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(".", ",") + " tỷ";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(".", ",") + " triệu";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(".", ",") + " nghìn";
    }
    return num.toString();
  }
  return (
    <div className="w-full h-full flex flex-col items-center font-roboto ">
      <div
        className=" w-full h-[500px] bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/img/tu_thien.jpg')" }}
      ></div>
      <h1 className="text-5xl mt-20 mb-10 ">Dự án đang gây quỹ</h1>
      <h1 className="text-3xl ">
        Hãy lựa chọn đồng hành cùng dự án mà bạn quan tâm
      </h1>
      <div className="w-2/3">
        <Grid
          container
          sx={{ padding: "0 10px", marginTop: "10px" }}
          rowSpacing={4}
          columnSpacing={4}
        >
          {campaign.map((campaign) => (
            <CampaignItem key={campaign.id} campaign={campaign} />
          ))}
        </Grid>
      </div>
      <div className="w-3/5 flex items-center justify-around space-x-6 m-8"></div>
      <h1 className="text-red-600 text-xl font-bold m-3">Xem tất cả</h1>
      <div
        className="relative w-full h-[300px] bg-cover bg-center bg-no-repeat m-4"
        style={{ backgroundImage: "url('/img/tu_thien.jpg')" }}
      >
        {/* Lớp overlay để làm mờ ảnh */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Nội dung chữ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Những con số biết nói
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm mb-1">Dự án</p>
              <p className="text-2xl font-bold">{statistical?.totalCampaign}</p>
            </div>

            <div>
              <p className="text-sm mb-1">Lượt ủng hộ</p>
              <p className="text-2xl font-bold">
                {statistical?.toltalDonation}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1">Tiền ủng hộ</p>
              <p className="text-2xl font-bold">
                {formatVietNamCurrency(statistical?.totalAmount || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-start justify-center space-x-10 m-10">
        <Image
          src="/img/tu_thien.jpg" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
          alt="Mô tả ảnh" // Bắt buộc
          width={600} // Bắt buộc
          height={400} // Bắt buộc
          sizes="100vw"
        />

        <div className="w-1/3">
          <h1 className="font-bold text-3xl">GiveNow là gì?</h1>
          <p>
            GiveNow là nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy
            và minh bạch. Được ghi nhận Top 3 bài toán Chuyển đổi số xuất sắc
            nhất cho các dự án vì cộng đồng, Cuộc thi Tìm kiếm Giải pháp Chuyển
            đổi số Quốc gia 2022 và là Chiến dịch Marketing vì sự phát triển bền
            vững tại Marketing for Development Awards 2022.
          </p>
          <p className="mt-4">
            GiveNow được tin dùng bởi các tổ chức uy tín như: Hội chữ thập đỏ
            Việt Nam, Quỹ Bảo Trợ Trẻ Em Việt Nam, Quỹ Hy vọng, Quỹ Vì Tầm Vóc
            Việt, Quỹ Trò nghèo vùng cao, Quỹ từ thiện Nâng bước tuổi thơ và
            nhiều tổ chức khác.
          </p>
          <p className="mt-4">
            GiveNow được hỗ trợ công nghệ bởi FPT Smart Cloud, Comartek, Viettel
            Money và VNPay, đảm bảo ứng dụng hoạt động ổn định, phương thức
            thanh toán đa dạng và an toàn.
          </p>
        </div>
      </div>
    </div>
  );
};
