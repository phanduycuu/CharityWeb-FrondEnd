import React from "react";
import { Button, ButtonProps } from "@mui/material";

type CustomButtonProps = {
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  fullWidth?: boolean;
} & ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  backgroundColor,
  textColor,
  children,
  fullWidth,
  ...rest
}) => {
  return (
    <Button
      startIcon={icon}
      fullWidth={fullWidth}
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
