"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputField from "../input/Input";
import SearchIcon from "@mui/icons-material/Search";
const SideBar = () => {
  const router = useRouter();
  return (
    <div className="w-full h-16 flex items-center justify-center mt-3 mb-3">
      <div>
        <Image
          src="/img/image.png" // Đường dẫn ảnh (tương đối hoặc tuyệt đối)
          alt="Mô tả ảnh" // Bắt buộc
          width={60} // Bắt buộc
          height={60} // Bắt buộc
        />
      </div>
      <div className="w-1/2 flex items-center justify-end space-x-16">
        <button className="text-xl font-bold" onClick={() => router.push("/")}>
          Trang chủ
        </button>
        <button className="text-xl font-bold" onClick={() => router.push("")}>
          Dự án
        </button>
        <button
          className="text-xl font-bold"
          onClick={() => router.push("/category")}
        >
          Danh mục
        </button>
        <div className=" flex items-center">
          <InputField fullWidth={false} />
          <SearchIcon fontSize="large" />
        </div>
        <div className=" flex items-center font-bold">
          <h1 className="text-xl" onClick={() => router.push("/")}>
            Đăng kí/
          </h1>
          <h1 className="text-xl font-bold" onClick={() => router.push("")}>
            Đăng nhập
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
