import { Box, Typography } from "@mui/material";
import style from "./CardStatistical.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);


function CardStatistical() {
    return (
        <Box className={cx("main")}>
        <Box className={cx("wrap-card")}>
            <Box className={cx("wrap-heading")}>
                <Box className={cx("wrap-money")}>
                    <Typography className={cx("total-money")}>
                        <span className={cx("sub-money")}> 10,000,000 đ</span>
                        Thu nhập dự kiến
                    </Typography>
                </Box>

            </Box>
            <Box className={cx("wrap-body")}>

            </Box>
        </Box>
        </Box>
       
    );

}
export default CardStatistical;