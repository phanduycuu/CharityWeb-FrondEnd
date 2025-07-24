import React from "react";

interface ProgressBarProps {
  amount: number; // số tiền (VD: 4831500)
  percent: number; // phần trăm (VD: 2.4)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ amount, percent }) => {
  return (
    <div className="w-full">
      <div className="relative h-2 rounded-full bg-rose-100">
        <div
          className="absolute h-2 rounded-full bg-rose-500"
          style={{ width: `${percent}%` }}
        >
          {/* <div className="w-2 h-2 bg-rose-500 rounded-full absolute -top-0.5 right-0"></div> */}
        </div>
      </div>
      <div className="flex justify-between font-semibold text-xl mt-3">
        <span className="text-rose-600 ">
          {amount.toLocaleString("vi-VN")}đ
        </span>
        <span className="text-gray-700 ">{percent.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
