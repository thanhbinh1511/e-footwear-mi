import MyPieChart from "../chart/MyPieChart";
import { Box, Typography } from "@mui/material";
import style from "./CardStatistical.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCountOrderStatus } from "~/redux/order-status/orderStatusSlice";
import { fetchCountOrder } from "~/redux/order/orderSlice";

const cx = classNames.bind(style);
function CardStatistical() {
    const dispatch = useDispatch();
    const { countOrder } = useSelector((state) => state.orderReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const { countOrderStatus } = useSelector((state) => state.orderStatusReducer);
    const [description, setDescription] = useState([])
    const [total, setTotalOrder] = useState([])
    useEffect(() => {
        dispatch(fetchCountOrder(accessToken));
        dispatch(fetchCountOrderStatus(accessToken));
    }, [dispatch, accessToken]);
    useEffect(() => {
        let descriptionTemp = []
        let totalOrderTemp = []
        for (const item in countOrderStatus) {
            descriptionTemp.push(countOrderStatus[item][0])
            totalOrderTemp.push(countOrderStatus[item][1])
        }
        setDescription(descriptionTemp)
        setTotalOrder(totalOrderTemp)
    }, [countOrderStatus])
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-card")}>
                <Box className={cx("wrap-heading")}>
                    <Box className={cx("wrap-money")}>
                        <Typography className={cx("total-money")}>
                            Tổng số đơn hàng
                            <span className={cx("sub-money")}>{countOrder}</span>
                        </Typography>
                    </Box>
                </Box>
                <Box className={cx("wrap-body")}>
                    <MyPieChart data={{
                        labels: description.length > 0 ? description : [],
                        datasets: [{
                            label: 'Trạng thái đơn hàng',
                            data: total.length > 0 ? total : [],
                            backgroundColor: [
                                "#FF0000",
                                "#FFA500",
                                "#FFFF00",
                                "#26aa99",
                                "#0000FF ",
                            ],
                            hoverOffset: 4
                        }]
                    }}
                    />
                </Box>
            </Box>
        </Box>

    );

}
export default CardStatistical;