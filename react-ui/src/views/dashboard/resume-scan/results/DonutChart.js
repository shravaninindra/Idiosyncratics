import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Typography } from '@material-ui/core';
ChartJS.register(ArcElement, Tooltip, Legend);

const getData = (matchRate) => ({
    datasets: [
        {
            label: '# of Votes',
            data: [matchRate, 100 - matchRate],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 2,
            title: 'Match rate'
        }
    ]
});

export const DoughnutChart = ({ matchRate }) => {
    const plugins = [
        {
            beforeDraw: function (chart) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                ctx.restore();
                var fontSize = (height / 160).toFixed(2);
                ctx.font = fontSize + 'em sans-serif';
                ctx.textBaseline = 'top';
                var text = `${Math.round(matchRate)}%`,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
    ];

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h2">Match Rate</Typography>
            </Grid>
            <Doughnut
                type="doughnut"
                data={getData(matchRate)}
                // options={options}
                plugins={plugins}
            />
        </>
    );
};
