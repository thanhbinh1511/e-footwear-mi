import { Inventory } from "@mui/icons-material";
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import CategoryIcon from '@mui/icons-material/Category';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "~/assets/image/logo.png";
import style from "./SideBar.module.scss";
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

    } else if (location.includes("product")) {
      setActive(4);
    } else if (location.includes("details")) {
      setActive(5);
    } else if (location.includes("colors")) {
      setActive(7);
    } else if (location.includes("sizes")) {
      setActive(8);
    }
    else if (location.includes("galleries")) {
      setActive(9);
    }
    else if (location.includes("type-gallery")) {
      setActive(10);
    }
    else if (location.includes("coupons")) {
      setActive(11);
    }
  }, [location]);
  return (
    <Box className={cx("background")}>
      <Box className={cx("wrap-logo")}>
        <img src={logo} alt="" className={cx("logo")} />
      </Box>
      <Box component={Link}
        to={"/admin/dashboard"} className={cx("wrap-menu", `${active === 0 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 0 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <DashboardIcon color={`${active === 0 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Dashboard</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/customer"} className={cx("wrap-menu", `${active === 1 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 1 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <PersonIcon color={`${active === 1 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Khách Hàng</Box>

        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/order"} className={cx("wrap-menu", `${active === 2 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 2 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <ConfirmationNumberIcon color={`${active === 2 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Đơn hàng</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/category"} className={cx("wrap-menu", `${active === 3 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 3 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <CategoryIcon color={`${active === 3 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Danh mục</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/product"} className={cx("wrap-menu", `${active === 4 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 4 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <Inventory color={`${active === 4 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Sản phẩm</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/details"} className={cx("wrap-menu", `${active === 5 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 5 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <InfoIcon color={`${active === 5 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Chi tiết sản phẩm</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/colors"} className={cx("wrap-menu", `${active === 7 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 7 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <ColorLensIcon color={`${active === 7 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Màu sắc</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/sizes"} className={cx("wrap-menu", `${active === 8 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 8 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <FormatSizeIcon color={`${active === 8 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Kích cỡ</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/galleries"} className={cx("wrap-menu", `${active === 9 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 9 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <BrowseGalleryIcon color={`${active === 9 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Thư viện ảnh</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/type-gallery"} className={cx("wrap-menu", `${active === 10 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 10 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <LibraryBooksIcon color={`${active === 10 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Loại ảnh</Box>
        </Box>
      </Box>
      <Box component={Link}
        to={"/admin/coupons"} className={cx("wrap-menu", `${active === 11 ? "active" : ""}`)}>
        <Box className={cx("line", `${active === 11 ? "show" : ""}`)} />
        <Box className={cx("menu-items")}>
          <Box className={cx("menu-icon")}>
            <LoyaltyIcon color={`${active === 11 ? "primary" : ""}`} fontSize="medium" />
          </Box>
          <Box className={cx("menu-content")}>Mã giảm giá</Box>
        </Box>
      </Box>


      <Box className={cx("wrap-menu")}>
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
