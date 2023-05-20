import MyBarChart from "../chart/MyBarChart";
import { Box, Typography } from "@mui/material";
import style from "./CardRevenue.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetTotalPriceByMonth } from "~/redux/order/orderSlice";

const cx = classNames.bind(style);

function CardRevenue() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);
    const { totalPrice } = useSelector((state) => state.orderReducer);
    const [month, setMonth] = useState([])
    const [totalOrder, setTotalOrder] = useState([])
    useEffect(() => {
        dispatch(fetchGetTotalPriceByMonth(accessToken));
    }, [dispatch, accessToken]);

    useEffect(() => {
        let monthTemp = []
        let totalOrderTemp = []
        for (const item in totalPrice) {
            monthTemp.push(totalPrice[item][0])
            totalOrderTemp.push(totalPrice[item][1])
        }
        setMonth(monthTemp)
        setTotalOrder(totalOrderTemp)
    }, [totalPrice])





    const data = {
        labels: month.length > 0 ? month : [],
        datasets: [{
            label: 'Tổng doanh thu theo tháng',
            data: totalOrder.length > 0 ? totalOrder : [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(82, 255, 184, 0.2)',
                'rgba(80, 61, 63, 0.2)',
                'rgba(102, 106, 134, 0.2)',
                'rgba(189, 255, 253, 0.2)',
                'rgba(234, 189, 168, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(82, 255, 184)',
                'rgb(80, 61, 63)',
                'rgb(102, 106, 134)',
                'rgb(189, 255, 253)',
                'rgb(234, 189, 168)',

            ],
            borderWidth: 2,

        }]
    }

    return (
        <Box className={cx("main")} >
            <Box className={cx("wrap-card")}>
                <MyBarChart data={data} />
            </Box>
        </Box >
    );
}
export default CardRevenue;