"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
    const chartData = {
        series: [
            {
                name: "Visitas",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: "Comentarios",
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "area",
            },
            colors: ["#07869B", "#1A607A"], // 🎨 Tus colores personalizados
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                type: "datetime",
                categories: [
                    "2025-04-01T00:00:00.000Z",
                    "2025-04-02T00:00:00.000Z",
                    "2025-04-03T00:00:00.000Z",
                    "2025-04-04T00:00:00.000Z",
                    "2025-04-05T00:00:00.000Z",
                    "2025-04-06T00:00:00.000Z",
                    "2025-04-07T00:00:00.000Z",
                ],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        },
    };

    return (
        <div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
            />
        </div>
    );
};

export default Chart;
