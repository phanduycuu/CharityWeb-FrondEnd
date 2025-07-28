// components/ForgotPasswordModal.tsx
import CustomButton from "@/libs/core/components/button/button";
import InputField from "@/libs/core/components/input/Input";
import { Payment as PaymentMoney } from "@/libs/shared/charity/model/payment.model";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentPost } from "../../services/paymentServices";

interface Props {
  open: boolean;
  onClose: () => void;
  campaignId: string;
}

export default function Payment({ open, onClose, campaignId }: Props) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  const onSubmit = async (data: PaymentMoney) => {
    data.campaignId = campaignId;
    data.amount = Number(data.amount);
    if (user) data.donorId = user.id;
    console.log(data);
    const response = await PaymentPost(data);
    if (response?.data.paymentUrl) {
      window.location.href = response?.data.paymentUrl;
    }
  };
  const { handleSubmit, control, setValue } = useForm<PaymentMoney>();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <div className="flex items-center justify-center">Thông tin ủng hộ</div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 items-center justify-center m-4 space-y-8">
            <InputField<PaymentMoney>
              control={control}
              name="donorName"
              label="Họ tên *"
              helperText={true}
              error={true}
              rules={{ required: "Vui lòng nhập họ tên" }}
            />
            <InputField<PaymentMoney>
              control={control}
              name="donorEmail"
              label="Email"
              helperText={true}
              error={true}
              rules={{
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email không hợp lệ",
                },
              }}
            />

            <div className="flex items-center w-full">
              <h1 className="w-2/3 pr-9">Số tiền ủng hộ</h1>
              <InputField<PaymentMoney>
                control={control}
                name="amount"
                moneyMode={true}
                helperText={true}
                error={true}
                rules={{
                  required: "Vui lòng nhập tiền ủng hộ",
                  validate: (value) => {
                    const num = Number(value);
                    if (num < 10000) return "Số tiền tối thiểu là 10.000 VND";
                    return true;
                  },
                }}
                unit="VND"
              />
            </div>
            <CustomButton
              fullWidth={true}
              backgroundColor="#2962FF"
              textColor="#ffffff"
              type="submit"
            >
              Ủng hộ ngay
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
