import style from "./Dashboard.module.scss"
import classNames from "classnames/bind"
import { Box, Grid, Typography } from "@mui/material";
import CardStatistical from "~/components/card-statistical/CardStatistical";
import CardOrder from "~/components/card-order/CardOrder";
import CardRevenue from "~/components/card-revenue";
import RecentUpdate from "~/components/recent-updates/RecentUpdate";
import SaleAnalytics from "~/components/sale-analytics/SaleAnalytics";
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
                    <Grid item xs={9}>
                        <Box className={cx("wrap-revenue")} >
                            <CardRevenue />
                        </Box>
                    </Grid>
                    <Grid item xs={3} sx={{ marginTop: "20px" }}>
                        <Box sx={{ marginBottom: "20px" }}>
                            <RecentUpdate />
                        </Box>
                        <Box >
                            <SaleAnalytics />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "20px", paddingRight: "20px ", paddingBottom: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} className={cx("wrap-card")}>
                            <CardStatistical />
                        </Grid>
                        <Grid item xl={8} className={cx("wrap-card")} >
                            <CardOrder />
                        </Grid>
                    </Grid>
                </Grid>


            </Box>
        </Box>
    );
}

export default Dashboard