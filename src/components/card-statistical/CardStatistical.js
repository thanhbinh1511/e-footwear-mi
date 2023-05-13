import MyPieChart from "../chart/MyPieChart";
import { Box, Typography } from "@mui/material";
import style from "./CardStatistical.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function CardStatistical() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-card")}>
                <Box className={cx("wrap-heading")}>
                    <Box className={cx("wrap-money")}>
                        <Typography className={cx("total-money")}>
                            <span className={cx("sub-money")}> 10,000,000 đ</span>
                            Thu nhập dự kiến
                        </Typography>
                    </Box>
                </Box>
                <Box className={cx("wrap-body")}>
                    <MyPieChart data={{
                        labels: [
                            'Nike',
                            'Adidas',
                            'Converse',
                        ],
                        datasets: [{
                            label: 'Doanh thu',
                            data: [300, 50, 100],
                            backgroundColor: [
                                "#009ff2",
                                "#F72585",
                                "#FFBA08"
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