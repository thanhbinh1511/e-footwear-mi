import style from "./Order.module.scss";
import classNames from "classnames/bind";
import { Box, Grid, Typography } from "@mui/material";

const cx = classNames.bind(style);
function Order() {
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Đơn hàng
                </Typography>
            </Box>
            <Box className={cx("container")} >

            </Box>
        </Box>
    );
}
export default Order;