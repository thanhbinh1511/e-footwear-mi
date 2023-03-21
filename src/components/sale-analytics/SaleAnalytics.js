import { Box, Typography } from "@mui/material";
import style from "./SaleAnalytics.module.scss";
import classNames from "classnames/bind";
import { dataSaleAnalytics } from "~/assets/data/fake-saleAnalytics-data";
const cx = classNames.bind(style);
function SaleAnalytics() {
    return (
        <Box>
            <Box className={cx("main")}>
                <Box className={cx("wrap")}>
                    <Typography className={cx("heading")}>Sale Analytics</Typography>
                    <Box className={cx("wrap-content")}>
                        {dataSaleAnalytics.map((item,index) => (
                            <Box key={index} className={cx("wrap-data")}>
                                <Box className={cx("wrap-info")}>
                                    <Box className={cx("content")}>
                                        <Box className={cx("wrap-icon")}>
                                            <img className={cx("icon")} src={"https://cdn-icons-png.flaticon.com/512/2662/2662503.png"}></img>
                                        </Box>
                                        <Box className={cx("wrap-text")}>
                                            <Typography className={cx("content")} >
                                                <span className={cx("name")}>Số đơn hàng</span>
                                            </Typography>
                                        </Box>
                                        <Box className={cx("count")}>
                                            {item.orderCount}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={cx("wrap-info")}>
                                    <Box className={cx("content")}>
                                        <Box className={cx("wrap-icon")}>
                                            <img className={cx("icon")} src={"https://cdn-icons-png.flaticon.com/512/747/747376.png"}></img>
                                        </Box>
                                        <Box className={cx("wrap-text")}>
                                            <Typography className={cx("content")} >
                                                <span className={cx("name")}>Số khách hàng</span>
                                            </Typography>
                                        </Box>
                                        <Box className={cx("count")}>
                                            {item.customerCount}
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>

                        ))}
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
export default SaleAnalytics