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
          <img className={cx("avatar")} src="https://picsum.photos/200/300"></img>
        </Box>
      </Box>
    </Box>

  );
}
export default Header;