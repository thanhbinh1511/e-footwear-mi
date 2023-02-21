import style from "./SideBar.module.scss";
import classNames from "classnames/bind";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import DashboardIcon from "@mui/icons-material/Dashboard";
const cx = classNames.bind(style);

function SideBar() {
  return (
    <div className={cx("background")}>
      <div className={cx("title")}>
        <div className="title-content">ADMIN</div>
        <MenuIcon fontSize="medium" sx={{ marginLeft: "10px" }} />
      </div>
      <div className={cx("wrap-avatar")}>
        <div className={cx("avatar")}>
          <div className={cx("avatar-img")} />
        </div>
        <div className={cx("name")}>Nguyen Van A</div>
      </div>
      <div className={cx("wrap-menu")}>
        <div className={cx("menu-heading")}></div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <DashboardIcon color="primary" fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Dashboard</div>
        </div>
      </div>
      <div className={cx("wrap-menu")}>
        <div className={cx("menu-heading")}>Heading</div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <MenuIcon fontSize="medium" />
          </div>
          <a className={cx("menu-content")}>Example 1</a>
        </div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <AdbIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 2</div>
        </div>
      </div>
      <div className={cx("wrap-menu")}>
        <div className={cx("menu-heading")}>Heading</div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <MenuIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 1</div>
        </div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <AdbIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 2</div>
        </div>
      </div>
      <div className={cx("wrap-menu")}>
        <div className={cx("menu-heading")}>Heading</div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <MenuIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 1</div>
        </div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <AdbIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 2</div>
        </div>
      </div>
      <div className={cx("wrap-menu")}>
        <div className={cx("menu-heading")}>Dashboard</div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <MenuIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 1</div>
        </div>
        <div className={cx("menu-items")}>
          <div className={cx("menu-icon")}>
            <AdbIcon fontSize="medium" />
          </div>
          <div className={cx("menu-content")}>Example 2</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
