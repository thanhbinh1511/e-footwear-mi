import style from "./SideBar.module.scss";
import classNames from "classnames/bind";
import logo from "~/assets/image/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CategoryIcon from '@mui/icons-material/Category';
const cx = classNames.bind(style);

function SideBar() {
  return (
    <Box className={cx("background")}>
      <Box className={cx("wrap-logo")}>
        <img src={logo} alt="" className={cx("logo")} />
      </Box>
      <Box className={cx("wrap-menu", "active")}>
        <Box className={cx("line")} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <DashboardIcon color="primary" fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Dashboard</Box>
        </Box>
      </Box>
      <Box className={cx("wrap-menu")}>
        <Box className={cx("line")} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <PersonIcon fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Khách Hàng</Box>
        </Box>
      </Box>
      <Box className={cx("wrap-menu")}>
        <Box className={cx("line")} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <ConfirmationNumberIcon fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Đơn hàng</Box>
        </Box>
      </Box>
      <Box className={cx("wrap-menu")}>
        <Box className={cx("line")} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <AutoGraphIcon color="primary" fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Thống Kê</Box>
        </Box>
      </Box>
      <Box className={cx("wrap-menu")}>
        <Box className={cx("line")} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <CategoryIcon color="primary" fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Danh Mục</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;
