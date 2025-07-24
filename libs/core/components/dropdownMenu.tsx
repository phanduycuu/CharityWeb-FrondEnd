import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Category } from "@/libs/shared/charity/model/category.model";
import { getCategory } from "@/libs/charity/services/categoryServices";

const DropdownMenu = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const fetchgetCategory = async () => {
    try {
      const response = await getCategory();
      setCategory(response.data.items);
      // setCategory(response.data);
    } catch (err) {
      console.error("Lỗi :", err);
    }
  };

  useEffect(() => {
    fetchgetCategory();
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    alert(value);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ color: "black" }}
      >
        Danh mục
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {category.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose(item.id);
            }}
            // sx={{
            //   color: item === "Áo Sơmi" ? "orange" : "black",
            //   fontWeight: item === "Áo Sơmi" ? "bold" : "normal",
            // }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;
