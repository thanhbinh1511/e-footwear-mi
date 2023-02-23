import Header from "~/layouts/Header";
import SideBar from "~/layouts/SideBar";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Grid } from '@mui/material';

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <div className={cx("main")}>
      <Grid container>
        <Grid item xs={2}>
            <div className={cx("side-bar")}>
              <SideBar />
            </div>
        </Grid>
        <Grid item xs={10}>
            <div className={cx("wrap-content")}>
              <Header />
              <div className={cx("content")}>{children}</div>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default DefaultLayout;
