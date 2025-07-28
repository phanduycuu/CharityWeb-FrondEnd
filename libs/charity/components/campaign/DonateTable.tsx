import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Donation } from "@/libs/shared/charity/model/donation.model";
import { getDoantionbByCampaignById } from "../../services/donationServices";
import dayjs from "dayjs";
import { Pagination } from "@mui/material";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
];

export default function BasicTable({ campaignId }: { campaignId: string }) {
  const [donation, setDonation] = React.useState<Donation[]>([]);

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const pageSize = 7;

  React.useEffect(() => {
    const fetchDonationByCampaignId = async () => {
      try {
        if (campaignId) {
          const response = await getDoantionbByCampaignById(
            campaignId,
            page,
            pageSize
          );
          console.log("Dữ liệu:", response.data);
          setDonation(response.data.items);
          setTotalPages(response.data.page.totalPages);
        }
      } catch (err) {
        console.error("Lỗi :", err);
      }
    };

    fetchDonationByCampaignId();
  }, [campaignId, page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const formatDay = (day: string) => {
    const formatted = dayjs(day).format("DD/MM/YYYY HH:mm:ss");
    return formatted;
  };

  const formatMoney = (value: string) => {
    const numeric = value.replace(/\D/g, ""); // Loại bỏ mọi ký tự không phải số
    if (!numeric) return "";
    return new Intl.NumberFormat("vi-VN").format(Number(numeric));
  };
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-full h-[500px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="w-1/3">
                  Người ủng hộ
                </TableCell>
                <TableCell align="left" className="w-1/3">
                  Số tiền
                </TableCell>
                <TableCell align="left" className="w-1/3">
                  Thời gian
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donation.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" className="w-1/3">
                    {row.donorName}
                  </TableCell>
                  <TableCell align="left" className="w-1/3">
                    {formatMoney(row.amount.toString()) + " đ"}
                  </TableCell>
                  <TableCell align="left" className="w-1/3">
                    {formatDay(row.donatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
}
