import { Route, Link } from "react-router-dom";
import style from "./SideBar.module.scss";
import classNames from "classnames/bind";
import logo from "~/assets/image/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const cx = classNames.bind(style);

function SideBar() {
  const location = useLocation().pathname;
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (location.includes("dashboard")) {
      setActive(0);
    } else if (location.includes("customer")) {
      setActive(1);
    } else if (location.includes("order")) {
      setActive(2);
    } else if (location.includes("category")) {
      setActive(3);
    }
  }, [location]);
  return (
    <Box className={cx("background")}>
      <Box className={cx("wrap-logo")}>
        <img src={logo} alt="" className={cx("logo")} />
      </Box>
      <Box component={Link}
        to={"/admin/dashboard"} className={cx("wrap-menu", `${active === 0 ? "active" : ""}`)}>
        <Box  className={cx("line",`${active === 0 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <DashboardIcon color={`${active === 0 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Dashboard</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/customer"} className={cx("wrap-menu", `${active === 1 ? "active" : ""}`)}>
        <Box className={cx("line",`${active === 1 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <PersonIcon color={`${active === 1 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Khách Hàng</Box>

        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/order"} className={cx("wrap-menu", `${active === 2 ? "active" : ""}`)}>
        <Box className={cx("line",`${active === 2 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <ConfirmationNumberIcon color={`${active === 2 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Đơn hàng</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/category"} className={cx("wrap-menu", `${active === 3 ? "active" : ""}`)}>
        <Box className={cx("line",`${active === 3 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <CategoryIcon color={`${active === 3 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Danh Mục</Box>
        </Box>
      </Box>
      <Box className={cx("wrap-logout")}>
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <LogoutIcon fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Đăng xuất</Box>
        </Box>
      </Box>
    </Box >
  );
}

export default SideBar;
