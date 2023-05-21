import { Box, Typography } from "@mui/material";
import style from "./RecentUpdate.module.scss";
import classNames from "classnames/bind";
import { dataRecentUpdate } from "~/assets/data/fake-recentUpdate-data.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetHotOrder } from "~/redux/order/orderSlice";
import { useEffect } from "react";
import { or } from "firebase/firestore";

const cx = classNames.bind(style);
function RecentUpdate() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);
    const { orders } = useSelector((state) => state.orderReducer);
    useEffect(() => {
        dispatch(fetchGetHotOrder(accessToken));
    }, [dispatch, accessToken]);
    const data = orders.map((item) => {
        // Định dạng cost thành 1.000.000 VNĐ
        const formattedCost = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.cost);

        // Định dạng orderTime thành dd/mm/yyyy
        const formattedOrderTime = new Date(item.orderTime).toLocaleDateString('en-GB');

        return {
            name: item.address.fullName,
            cost: formattedCost,
            orderTime: formattedOrderTime,
        }
    })

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap")}>
                <Typography className={cx("heading")}>Cập nhật đơn hàng</Typography>
                <Box className={cx("wrap-content")}>
                    {data.map((item, index) => (
                        <Box key={index} className={cx("content")}>
                            <Box className={cx("wrap-text")}>
                                <Typography className={cx("content")} >
                                    <span className={cx("name")}>{item.name} <span className={cx("action")}>vừa mua một đơn hàng có giá trị <span className={cx("product")}>{item.cost}</span></span></span>
                                    <span className={cx("time")} >
                                        {item.orderTime}
                                    </span>

                                </Typography>
                            </Box>
                        </Box>

                    ))}
                </Box>
            </Box>
        </Box>
    );
}
export default RecentUpdate;