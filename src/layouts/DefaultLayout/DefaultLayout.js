import Header from "~/layouts/Header";
import SideBar from "~/layouts/SideBar";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Box, Grid } from '@mui/material';
import RecentUpdate from "~/components/recent-update/recentUpdate";

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <Box className={cx("main")}>
      <Grid container>
        <Grid item xl={2} md={2} >
          <Box className={cx("side-bar")}>
            <SideBar />
          </Box>
        </Grid>
        <Grid item xl={10} md={10}>
          <Box className={cx("wrap-content")}>
            <Header />
            <Box className={cx("content")}>
              <Grid container>
                <Grid item xl={9} md={8}>
                  <Box>
                    {children}
                  </Box>
                </Grid>
                <Grid item xl={3} md={4}>
                  <Box>
                    <RecentUpdate />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DefaultLayout;
