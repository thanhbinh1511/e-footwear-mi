import Header from "~/layouts/Header";
import SideBar from "~/layouts/SideBar";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Box, Grid } from '@mui/material';

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <div className={cx("main")}>
      <Grid container>
        <Grid item xs={2}>
          <Box className={cx("side-bar")}>
            <SideBar />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box className={cx("wrap-content")}>
            <Header />
            <Box className={cx("content")}>{children}</Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DefaultLayout;
