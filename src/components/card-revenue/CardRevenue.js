import MyBarChart from "../chart/MyBarChart";
import { Box, Typography } from "@mui/material";
import style from "./CardRevenue.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function CardRevenue() {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
            label: 'Doanh thu theo tháng',
            data: [65, 59, 80, 81, 56, 55, 40, 20, 10, 5, 2, 1],
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