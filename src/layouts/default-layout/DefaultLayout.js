import Header from "../../components/header";
import SideBar from "~/layouts/side-bar";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Box, Grid } from '@mui/material';
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
              <Box >
                {children}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box >
  );
}

export default DefaultLayout;
