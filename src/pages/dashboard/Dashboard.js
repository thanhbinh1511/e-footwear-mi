import style from "./Dashboard.module.scss"
import classNames from "classnames/bind"
import { Box, Grid, Typography } from "@mui/material";
import CardStatistical from "~/components/card-statistical/CardStatistical";

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
                    <Grid item xl={4} className={cx("wrap-card")}>
                        <CardStatistical />
                    </Grid>
                    <Grid item xl={4} className={cx("wrap-card")}>
                        <CardStatistical />
                    </Grid>
                    <Grid item xl={4} className={cx("wrap-card")}>
                        <CardStatistical />
                    </Grid>

                </Grid>
            </Box>


        </Box>
    );
}

export default Dashboard