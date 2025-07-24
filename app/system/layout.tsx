import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SideBar from "@/libs/core/components/sidebar/sidebar";
import Image from "next/image";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("✅ Đã dùng layout system");
  return (
    <div>
      <header className="">
        <SideBar />
      </header>
      <main style={{ flexGrow: 1 }}>{children}</main>
      <footer className="w-full h-[400px] bg-sky-700 flex flex-col">
        <div className="h-1/3 flex items-center justify-start space-x-10 border-b-2 border-x-gray-700 pl-[400px]">
          <Image
            src="/img/image.png" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
            alt="Mô tả ảnh" // Bắt buộc
            width={70} // Bắt buộc
            height={70} // Bắt buộc
          />
          <h1 className="w-[300px] text-white">
            Nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy và minh
            bạch.
          </h1>
        </div>
        <div className="w-full h-2/3 flex mt-4 mb-4">
          <div className=" flex flex-col items-start justify-around pl-[510px] mr-[200px]">
            <h1 className="text-white">
              Giới thiệu . Điều khoản và điều kiện . Tin tức . Báo chí
            </h1>
            <h1 className="text-white">
              <LocalPhoneIcon /> hotline: 0369214578
            </h1>
            <h1 className="text-white">
              <EmailIcon /> emxample@gmail.com
            </h1>
            <h1 className="text-white">
              <LocationOnIcon /> Số 09, ngõ 04, phố Duy Tân, Cầu Giấy, Hà Nội.
            </h1>
          </div>
          <Image
            src="/img/tu_thien.jpg" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
            alt="Mô tả ảnh" // Bắt buộc
            width={300} // Bắt buộc
            height={0} // Bắt buộc
          />
        </div>
      </footer>
    </div>
  );
}
