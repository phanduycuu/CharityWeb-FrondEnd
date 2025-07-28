"use client";
import {
  Campaign,
  FilterCampaignUserRequest,
} from "@/libs/shared/charity/model/campaign.model";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { filterCampain, getCampaign } from "../../services/campaignServices";
import { CampaignItem } from "../../components/campaign/CampaignItem";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const CampaignList: NextPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const searchKey = searchParams.get("searchkey");

  const [value, setValue] = useState(0);
  const [campaign, setCampaign] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<FilterCampaignUserRequest>({
    categoryId: categoryId,
    searchKey: searchKey,
    page: 1,
    limit: 10,
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchgetcampaign = async (filter: FilterCampaignUserRequest) => {
    try {
      // const response = await getCampaign();
      const response = await filterCampain(filter);
      console.log(response.data.items);
      setCampaign(response.data.items);
    } catch (err) {
      console.error("Lỗi :", err);
    }
  };

  useEffect(() => {
    if (categoryId) {
      setFilter((prev) => ({
        ...prev,
        categoryId,
      }));
    } else
      setFilter((prev) => ({
        ...prev,
        categoryId: null,
      }));
    if (searchKey) {
      setFilter((prev) => ({
        ...prev,
        searchKey,
      }));
    } else
      setFilter((prev) => ({
        ...prev,
        searchKey: null,
      }));
  }, [categoryId, searchKey]);

  useEffect(() => {
    fetchgetcampaign(filter);
  }, [filter]);

  return (
    <div className="w-full h-full flex flex-col items-center font-roboto ">
      <div
        className=" w-full h-[200px] bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/img/tu_thien.jpg')" }}
      ></div>
      <Container maxWidth={false} disableGutters>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Dự án đang gây quỹ" {...a11yProps(0)} />
              <Tab label="Dự án đã kết thúc" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="w-full flex flex-col items-center">
              <h1 className="text-2xl m-5">Dự án đang gây quỹ</h1>
              <h1 className=" text-gray-400 m-5">
                Hãy lựa chọn dự án trong lĩnh vực mà bạn quan tâm nhất
              </h1>
              <div className="w-2/3">
                <Grid
                  container
                  sx={{ padding: "0 10px", marginTop: "10px" }}
                  rowSpacing={4}
                  columnSpacing={4}
                >
                  {campaign
                    .filter((campaign) => campaign.status === "InProgress")
                    .map((campaign) => (
                      <CampaignItem key={campaign.id} campaign={campaign} />
                    ))}
                </Grid>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full flex flex-col items-center">
              <h1 className="text-2xl m-5">Các dự án đã kết thúc gây quỹ</h1>
              <h1 className=" text-gray-400 m-5">
                Hãy lựa chọn dự án trong lĩnh vực mà bạn quan tâm nhất
              </h1>
              <div className="w-2/3">
                <Grid
                  container
                  sx={{ padding: "0 10px", marginTop: "10px" }}
                  rowSpacing={4}
                  columnSpacing={4}
                >
                  {campaign
                    .filter(
                      (campaign) =>
                        campaign.status === "Finished" ||
                        dayjs(campaign.deadline).isBefore(dayjs())
                    )
                    .map((campaign) => (
                      <CampaignItem key={campaign.id} campaign={campaign} />
                    ))}
                </Grid>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};
