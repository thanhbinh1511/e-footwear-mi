import React from 'react';
import { Box } from '@mui/material';
import style from './StyledChart.module.scss';
import classNames from 'classnames/bind';
import { Bar } from 'react-chartjs-2';

const cx = classNames.bind(style);
function MyBarChart({ data }) {
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,

            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                    color: ' #7b7a7a',
                    font: {
                        family: 'Sans-serif',
                        size: 12,
                    }
                }
            }
        }
    }
    return (
        <Box className={cx('chart')} >
            <Box className={cx('title')}>Tổng doanh thu</Box>
            <Bar data={data} options={options} />
        </Box>
    );
}
export default MyBarChart;