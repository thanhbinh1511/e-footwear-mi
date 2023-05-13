import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto'
import { Box } from '@mui/material';
import style from './StyledChart.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(style);
function MyPieChart({data}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black',
                    font: {
                        size: 14
                    }
                }
            },
        },
    }
    return (

        <Box className={cx('chart')}>
            <Doughnut data={data}
                options={options}
            />

        </Box>
    );
}
export default MyPieChart;
