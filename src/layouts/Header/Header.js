import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Box } from '@mui/system';
import { Badge, IconButton, Typography } from '@mui/material';
import { MailOutlineOutlined } from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
const cx = classNames.bind(style);
function Header() {
  return (
    <Box className={cx("wrap-header")}>
      <IconButton sx={{ margin: "0 15px" }} aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={1} color="error">
          <MailOutlineOutlined color='' />
        </Badge>
      </IconButton>
      <IconButton sx={{ margin: "0 15px" }} aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={1} color="error">
          <NotificationsNoneIcon color='' />
        </Badge>
      </IconButton>
      <Box className={cx("wrap-admin")}>
        <Box className={cx("wrap-name")}>
          <Typography className={cx("name")} >
            <span className={cx("sub-name")}>Hey,</span>  Huy Quang
          </Typography>
          <Typography className={cx("role")} >
            Admin
          </Typography>
        </Box>
        <Box className={cx("wrap-avatar")}>
          <img className={cx("avatar")} src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/317277106_3377146609195662_2392426401529684860_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WxwjXpXvYL4AX_tL90D&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBpLNptiRasa3a4hJxlVmBlFgVT7KfhEtQ5i4PJFNbxwA&oe=64171372"></img>
        </Box>

      </Box>
    </Box>

  );
}
export default Header;