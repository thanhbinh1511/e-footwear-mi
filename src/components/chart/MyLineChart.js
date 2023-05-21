import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import style from './StyledChart.module.scss';
import classNames from 'classnames/bind';
import {
    Chart,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
}
    from 'chart.js';
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);
const cx = classNames.bind(style);
function MyLineChart({ data }) {
    const options = {
        resposive: true,
        plugin: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#000",
                    font: {
                        size: 14,
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,

                },
                title: {
                    display: true,
                    text: 'Tháng',
                    color: ' #7b7a7a',
                    font: {
                        family: 'Sans-serif',
                        size: 12,

                    }
                }

            },
            y: {
                min: 0,
                max: 40,
                ticks: {
                    stepSize: 3,

                },
            }
        }
    }

    return (
        <Box className={cx('chart')}>
            <Box className={cx('title')}>Thống kê đơn hàng</Box>
            <Line data={data} options={options} />
        </Box >
    );

}
export default MyLineChart;