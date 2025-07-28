"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import SearchIcon from "@mui/icons-material/Search";
import InputField from "../input/Input";
import DropdownMenu from "../dropdownMenu";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Category } from "@/libs/shared/charity/model/category.model";
import { getCategory } from "@/libs/charity/services/categoryServices";
const SideBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("searchkey");
  const [search, setSearch] = useState<string | null>(searchKey);
  const [user, setUser] = useState<any>(null);
  const [campaignId, setCampaignId] = useState<string>("");

  const handleFilter = (search: string, campaignId: string) => {
    router.push(`/system/campaign?id=${campaignId}&searchKey=${search}`); // hoặc `/campaign/index?id=...`
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  const fetchgetCategory = async () => {
    try {
      const response = await getCategory();
      console.log(response.data.items);
      // setCategory(response.data);
    } catch (err) {
      console.error("Lỗi :", err);
    }
  };

  useEffect(() => {
    fetchgetCategory();
  }, []);
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
      <div className="w-2/3 flex items-center justify-end space-x-16">
        <Button sx={{ color: "black" }}>trang chủ</Button>
        <Button
          sx={{ color: "black" }}
          onClick={() => router.push("/system/campaign")}
        >
          dự án
        </Button>

        <DropdownMenu
          search={search || ""}
          handleFilter={handleFilter}
          setCampaignId={setCampaignId}
        />

        <div className=" flex flex-row items-end pr-10">
          <InputField
            fullWidth={false}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleFilter(search || "", campaignId);
              }
            }}
          />
          <SearchIcon
            fontSize="large"
            onClick={() => handleFilter(search || "", campaignId)}
          />
        </div>
        {user ? (
          user.fullName
        ) : (
          <div className=" flex items-start border-2 border-solid ">
            <Button
              onClick={() => router.push("/auth/register")}
              sx={{ color: "black" }}
            >
              đăng kí
            </Button>
            <Button
              onClick={() => router.push("/auth/login")}
              sx={{ color: "black" }}
            >
              đăng nhập
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
