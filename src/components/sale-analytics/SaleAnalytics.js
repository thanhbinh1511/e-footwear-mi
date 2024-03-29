import { Box, Typography } from "@mui/material";
import style from "./SaleAnalytics.module.scss";
import classNames from "classnames/bind";
import { dataSaleAnalytics } from "~/assets/data/fake-saleAnalytics-data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCountOrder } from "~/redux/order/orderSlice";
import { fetchCountCustomer } from "~/redux/customer/customerSlice";
const cx = classNames.bind(style);
function SaleAnalytics() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);
    const { countOrder } = useSelector((state) => state.orderReducer);
    const { countCustomer } = useSelector((state) => state.customerReducer);
    useEffect(() => {
        dispatch(fetchCountOrder(accessToken));
        dispatch(fetchCountCustomer(accessToken));
    }, [dispatch, accessToken]);
    return (
        <Box>
            <Box className={cx("main")}>
                <Box className={cx("wrap")}>
                    <Typography className={cx("heading")}>Thống kê doanh số</Typography>
                    <Box className={cx("wrap-content")}>
                        <Box className={cx("wrap-data")}>
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
                                        {countOrder}
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
                                        {countCustomer}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
export default SaleAnalytics