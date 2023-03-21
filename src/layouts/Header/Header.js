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
          <img className={cx("avatar")} src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/317277106_3377146609195662_2392426401529684860_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Av7Y_ksE3JEAX8uCOBy&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAAEz9aQonhDeRS-xhPPmZk6CH5ifiHTLXnu4YHLjvnAw&oe=641EFC72"></img>
        </Box>

      </Box>
    </Box>

  );
}
export default Header;