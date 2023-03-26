import style from "./Customer.module.scss";
import classNames from "classnames/bind";
import { Box, Grid, Typography } from "@mui/material";



const cx = classNames.bind(style);
function Customer() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Khách hàng
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                </Box>
                <Box className={cx("wrap-table")}>

                    
                </Box>
            </Box>
        </Box>


    );
}
export default Customer;