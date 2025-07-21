import React from "react";
import { Button, ButtonProps } from "@mui/material";

type CustomButtonProps = {
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
} & ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  backgroundColor,
  textColor,
  children,
  ...rest
}) => {
  return (
    <Button
      startIcon={icon}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        textTransform: "none",
        ":hover": {
          backgroundColor: backgroundColor || rest.color, // giữ màu khi hover nếu có
        },
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
