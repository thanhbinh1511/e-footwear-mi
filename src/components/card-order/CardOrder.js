import { Box } from '@mui/material';
import style from './CardOrder.module.scss';
import classNames from 'classnames/bind';
import MyLineChart from '../chart/MyLineChart';
const cx = classNames.bind(style);
function CardOrder() {
    const data= {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Đơn hàng',
                data: [65, 50, 80, 81, 56, 70, 60, 30, 20, 10, 50, 30],
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


