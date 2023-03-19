import style from "./Dashboard.module.scss"
import classNames from "classnames/bind"
import { Box, Typography } from "@mui/material";
import CardStatistical from "~/components/card-statistical/CardStatistical";

const cx = classNames.bind(style);

function Dashboard() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Dashboard
                </Typography>
                <Box className={cx("wrap-statistical")}>
                    <CardStatistical />
                </Box>
            </Box>

        </Box>
    );
}

export default Dashboard