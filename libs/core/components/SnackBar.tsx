// components/CustomSnackbar.tsx
import { Snackbar, Alert } from "@mui/material";

import Image from "next/image";
interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  autoHideDuration?: number;
}

export default function CustomSnackbar({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 4000,
}: Props) {
  const stylesBySeverity = {
    success: {
      bgcolor: "#e9fcd4",
      color: "#08660d",
      border: "1px solid #4caf50",
    },
    error: {
      bgcolor: "#FFE7D9",
      color: "#7a0c2e",
      border: "1px solid #f44336",
    },
    info: {
      bgcolor: "#e3f2fd",
      color: "#1565c0",
      border: "1px solid #2196f3",
    },
    warning: {
      bgcolor: "#fff8e1",
      color: "#ff9800",
      border: "1px solid #ffb300",
    },
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        icon={
          <Image
            src={
              severity === "success" ? "/img/Shape.svg" : "/img/ic_error.svg"
            }
            alt="icon"
            width={20}
            height={20}
            style={{ height: "auto", width: "auto" }}
          />
        }
        sx={{
          width: "100%",
          fontWeight: "bold",
          ...stylesBySeverity[severity],
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
