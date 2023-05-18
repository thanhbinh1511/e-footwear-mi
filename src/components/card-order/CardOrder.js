import { Box } from '@mui/material';
import style from './CardOrder.module.scss';
import classNames from 'classnames/bind';
import MyLineChart from '../chart/MyLineChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTotalOrderByMonth } from '~/redux/order/orderSlice';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style);
function CardOrder() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);
    const { orderTotal } = useSelector((state) => state.orderReducer);
    const [month, setMonth] = useState([])
    const [totalOrder, setTotalOrder] = useState([])
    useEffect(() => {
        dispatch(fetchGetTotalOrderByMonth(accessToken));
    }, [dispatch, accessToken]);

    useEffect(() => {
        let monthTemp = []
        let totalOrderTemp = []
        for (const item in orderTotal) {
            monthTemp.push(orderTotal[item][0])
            totalOrderTemp.push(orderTotal[item][1])
        }
        setMonth(monthTemp)
        setTotalOrder(totalOrderTemp)
    }, [orderTotal])
    // console.log(month)
    console.log(totalOrder)
    const data = {
        labels: month.length > 0 ? month : [],
        datasets: [
            {
                label: 'Đơn hàng',
                data: totalOrder.length > 0 ? totalOrder : [],
                borderColor: "#3dcd8d",
                backgroundColor: "transparent",
                pointBorderColor: "#3dcd8d",
                pointBorderWidth: 2,
                tension: 0.4,
            },
        ],
    }
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-card")}>
                <MyLineChart data={data} />
            </Box>
        </Box>
    );
}
export default CardOrder;


