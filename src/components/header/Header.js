import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Box } from '@mui/system';
import { Badge, IconButton, Typography } from '@mui/material';
import { MailOutlineOutlined } from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGetProfile } from "~/redux/customer/customerSlice";
const cx = classNames.bind(style);
function Header() {
  const { accessToken, accountId } = useSelector((state) => state.authReducer);
  const { customer } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetProfile({ accountId, accessToken }));
  }, [dispatch]);
  return (
    <Box className={cx("wrap-header")}>
      <IconButton sx={{ margin: "0 15px" }} aria-label="show 4 new mails" color="inherit">
        <Badge color="error">
          <MailOutlineOutlined color='' />
        </Badge>
      </IconButton>
      <IconButton sx={{ margin: "0 15px" }} aria-label="show 4 new mails" color="inherit">
        <Badge color="error">
          <NotificationsNoneIcon color='' />
        </Badge>
      </IconButton>
      <Box className={cx("wrap-admin")}>
        <Box className={cx("wrap-name")}>
          <Typography className={cx("name")} >
            <span className={cx("sub-name")}>Hey,</span>  {customer?.firstName} {customer?.lastName}
          </Typography>
          <Typography className={cx("role")} >
            Admin
          </Typography>
        </Box>
        <Box className={cx("wrap-avatar")}>
          <img className={cx("avatar")} src={customer?.avatar}></img>
        </Box>
      </Box>
    </Box>

  );
}
export default Header;