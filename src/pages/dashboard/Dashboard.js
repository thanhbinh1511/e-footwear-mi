import style from "./Dashboard.module.scss"
import classNames from "classnames/bind"
import { Box, Grid, Typography } from "@mui/material";
import CardStatistical from "~/components/card-statistical/CardStatistical";
import CardOrder from "~/components/card-order/CardOrder";
import CardRevenue from "~/components/card-revenue";

const cx = classNames.bind(style);

function Dashboard() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Dashboard
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Grid container spacing={2}>
                    <Grid item xs={4} className={cx("wrap-card")}>
                        <CardStatistical />
                    </Grid>
                    <Grid item xl={8} className={cx("wrap-card")}>
                        <CardOrder />
                    </Grid>
                </Grid>
                <Box className={cx("wrap-revenue")} >
                    <CardRevenue />
                </Box>
            </Box>



        </Box>
    );
}

export default Dashboard