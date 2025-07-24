import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useState } from "react";

type CustomInputProps<TForm extends FieldValues> = {
  name?: Path<TForm>;
  label?: string;
  control?: Control<TForm>;
  rules?: Omit<
    RegisterOptions<TForm, Path<TForm>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  type?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "standard" | "filled";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  error?: boolean;
  helperText?: boolean;
  slotProps?: {
    inputLabel?: Partial<React.ComponentProps<typeof InputLabel>>;
  };
  disabled?: boolean;
  placeholder?: string;
  unit?: string;
  moneyMode?: boolean;
  fractionMode?: boolean;
  trigger?: (name?: Path<TForm>) => Promise<boolean>;
  validateOnChange?: boolean;
  fractionModeSpecial?: boolean;
  onBlur?: () => void;
  onlyDecimal?: boolean;
};

const InputField = <TForm extends FieldValues>({
  name,
  label,
  control,
  rules,
  type = "text",
  fullWidth = true,
  size = "small",
  variant = "outlined",
  value = "",
  onChange,
  errorMessage,
  error,
  helperText,
  slotProps,
  disabled,
  placeholder,
  unit,
  moneyMode = false,
  fractionMode = false,
  trigger,
  validateOnChange,
  fractionModeSpecial,
  onBlur,
  onlyDecimal,
}: CustomInputProps<TForm>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";
  const togglePassword = () => setShowPassword((show) => !show);
  // Thêm dấu chấm phần nghìn
  const formatDecimal = (value: string) => {
    // Loại bỏ mọi ký tự không phải số
    return value.replace(/[^\d.]/g, "");
  };

  const formatNumber = (value: string) => {
    // Lọc chỉ lấy số
    const numeric = value.replace(/\D/g, "");

    // Nếu ít hơn 3 chữ số, trả về như cũ
    if (numeric.length < 3) return numeric;

    // Thêm dấu chấm trước số cuối cùng
    const head = numeric.slice(0, -1);
    const tail = numeric.slice(-1);
    return `${head}.${tail}`;
  };
  const parseNumber = (formatted: string) => {
    return formatted.replace(/\./g, "");
  };
  const isValidFraction = (value: string | undefined): boolean => {
    if (!value || typeof value !== "string") return false;

    const parts = value.split("/");
    if (parts.length !== 2) return false;
    if (parts[0] === "" || parts[1] === "") return false;
    return true;
  };

  const formatFraction = (value: string): string => {
    // Bước 1: Loại bỏ ký tự không hợp lệ, chỉ giữ số và dấu /
    const cleaned = value.replace(/[^0-9/]/g, "");

    // Bước 2: Chỉ cho phép 1 dấu /
    const parts = cleaned.split("/").slice(0, 2); // chỉ lấy a và b

    // Bước 3: Xử lý từng phần và loại bỏ số 0 ở đầu
    const a = parts[0]?.replace(/^0+(?=\d)/, "") || "";
    const b = parts[1]?.replace(/^0+(?=\d)/, "") || "";

    // Bước 4: Trả về đúng định dạng
    if (cleaned.includes("/")) {
      return `${a}/${b}`;
    } else {
      return a; // chỉ đang gõ phần tử a
    }
  };

  // Nếu dùng với React Hook Form
  if (control && name) {
    if (isPassword) {
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={value ? value : ("" as any)}
          render={({ field, fieldState }) => (
            <FormControl
              fullWidth={fullWidth}
              variant={variant}
              size={size}
              error={error ? !!fieldState.error : false}
            >
              <InputLabel htmlFor={name}>{label}</InputLabel>
              <OutlinedInput
                {...field}
                id={name}
                type={showPassword ? "text" : "password"}
                label={label}
                disabled={disabled}
                placeholder={placeholder}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePassword}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {helperText ? fieldState.error?.message || " " : " "}
              </FormHelperText>
            </FormControl>
          )}
        />
      );
    }

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={value ? value : ("" as any)}
        rules={{
          ...rules,
          validate: fractionMode
            ? (value) => {
                const parts = value.toString().split("/");

                if (parts.length !== 2 || parts[0] === "" || parts[1] === "")
                  return "Định dạng phải là a/b";

                const numerator = Number(parts[0]);
                const denominator = Number(parts[1]);

                if (numerator > denominator) {
                  return "Tử số phải nhỏ hơn hoặc bằng mẫu số";
                }

                return true;
              }
            : rules?.validate,
        }}
        render={({ field, fieldState }) => {
          const { value, onChange, ...restField } = field;

          const handleChange = async (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            let raw = e.target.value;
            if (onlyDecimal) {
              // Chỉ giữ lại số và dấu chấm
              raw = raw.replace(/[^0-9.]/g, "");

              // Nếu có nhiều dấu chấm thì giữ lại dấu đầu tiên
              const parts = raw.split(".");
              if (parts.length > 2) {
                raw = parts[0] + "." + parts.slice(1).join("");
              }

              // Xóa số 0 ở đầu (trừ trường hợp "0." để nhập số thập phân)
              if (raw.startsWith("0") && !raw.startsWith("0.")) {
                raw = raw.replace(/^0+/, "");
                if (raw === "") raw = "0"; // nếu bị xóa hết thì giữ lại 0
              }

              onChange(raw);
            } else if (fractionMode || fractionModeSpecial) {
              const formatted = formatFraction(raw);
              onChange(formatted);
            } else if (moneyMode) {
              const formatted = formatDecimal(raw);
              onChange(formatted);
            } else {
              onChange(raw);
            }
            // if (validateOnChange && name && trigger) {
            //   await trigger(name);
            // }
          };
          const handleBlur = () => {
            if (
              (fractionMode || fractionModeSpecial) &&
              !isValidFraction(value)
            ) {
              onChange("0/0");
            }
            trigger?.(name);
          };

          const displayValue = (() => {
            if (fractionMode || fractionModeSpecial) {
              return value || "0/0"; // nếu chưa có gì thì hiển thị 0/0
            } else if (moneyMode) {
              return formatDecimal(value?.toString() || "");
            } else {
              return value;
            }
          })();

          return (
            <TextField
              {...restField}
              value={displayValue}
              onChange={handleChange}
              onBlur={(e) => {
                !displayValue && setFocused(false);
                handleBlur?.();
                onBlur?.();
              }}
              onClick={() => setFocused(true)}
              placeholder={placeholder}
              label={label}
              fullWidth={fullWidth}
              size={size}
              variant={variant}
              type="text"
              error={error ? !!fieldState.error : false}
              helperText={helperText ? fieldState.error?.message || " " : " "}
              slotProps={slotProps}
              disabled={disabled}
              InputProps={{
                endAdornment:
                  (focused && (moneyMode || unit)) || value !== "" ? (
                    <InputAdornment position="end">
                      {moneyMode ? unit : ""}
                    </InputAdornment>
                  ) : undefined,
              }}
            />
          );
        }}
      />
    );
  }

  // Nếu dùng bình thường, không có React Hook Form
  if (isPassword) {
    return (
      <FormControl
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        error={!!errorMessage}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          id={name}
          type={showPassword ? "text" : "password"}
          defaultValue={""}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={togglePassword} edge="end" tabIndex={-1}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <TextField
      id={name}
      label={label}
      defaultValue={""}
      onChange={onChange}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      type={type}
      error={!!errorMessage}
      helperText={helperText ? errorMessage : ""}
      slotProps={slotProps}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default InputField;
