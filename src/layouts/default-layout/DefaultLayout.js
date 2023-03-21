import Header from "~/layouts/header";
import SideBar from "~/layouts/side-bar";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Box, Grid } from '@mui/material';
import RecentUpdate from "~/components/recent-updates/RecentUpdate";
import SaleAnalytics from "~/components/sale-analytics/SaleAnalytics";

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <Box className={cx("main")}>
      <Grid container spacing={1}>
        <Grid item xs={2} >
          <Box className={cx("side-bar")}>
            <SideBar />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box className={cx("wrap-content")}>
            <Header />
            <Box className={cx("content")}>
              <Grid container sx={{ paddingBottom: "20px" }}>
                <Grid item xl={9} >
                  <Box sx={{ margin: " 0 30px" }} >
                    {children}
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <RecentUpdate />
                  </Box>
                  <Box sx={{ marginTop: "30px" }}>
                    <SaleAnalytics />
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
