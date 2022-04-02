import { theme } from '@chakra-ui/react';

export const optionsApexCharts: ApexCharts.ApexOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    // tooltip estiliza os dados do grafico
    tooltip: {
        enabled: true,
    },
    // xaxis: {
    //     type: 'datetime',
    //     axisBorder: {
    //         color: theme.colors.gray[600],
    //     },
    //     axisTicks: {
    //         color: theme.colors.gray[600],
    //     },
    //     categories: [
    //         '2021-03-18T00:00:00.000Z',
    //         '2021-03-19T00:00:00.000Z',
    //         '2021-03-20T00:00:00.000Z',
    //         '2021-03-21T00:00:00.000Z',
    //         '2021-03-22T00:00:00.000Z',
    //         '2021-03-23T00:00:00.000Z',
    //         '2021-03-24T00:00:00.000Z',
    //     ],
    // },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
};

export const optionsAndCategories = (
    categories: string[]
): ApexCharts.ApexOptions => {
    return {
        ...optionsApexCharts,
        xaxis: {
            type: 'datetime',
            axisBorder: {
                color: theme.colors.gray[600],
            },
            axisTicks: {
                color: theme.colors.gray[600],
            },
            categories,
        },
    };
};
