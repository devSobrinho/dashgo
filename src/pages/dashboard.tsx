import { Flex, SimpleGrid } from '@chakra-ui/react';
import { ChartBox } from '../components/ChartBox';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext ';
import {
    categories1,
    categories2,
    series1,
    series2,
} from '../mock/seriesAndCategoriesMock';

// const options: ApexCharts.ApexOptions = {
//     chart: {
//         toolbar: {
//             show: false,
//         },
//         zoom: {
//             enabled: false,
//         },
//         foreColor: theme.colors.gray[500],
//     },
//     grid: {
//         show: false,
//     },
//     dataLabels: {
//         enabled: false,
//     },
//     stroke: {
//         curve: 'smooth',
//     },
//     // tooltip estiliza os dados do grafico
//     tooltip: {
//         enabled: true,
//     },
//     xaxis: {
//         type: 'datetime',
//         axisBorder: {
//             color: theme.colors.gray[600],
//         },
//         axisTicks: {
//             color: theme.colors.gray[600],
//         },
//         categories: [
//             '2021-03-18T00:00:00.000Z',
//             '2021-03-19T00:00:00.000Z',
//             '2021-03-20T00:00:00.000Z',
//             '2021-03-21T00:00:00.000Z',
//             '2021-03-22T00:00:00.000Z',
//             '2021-03-23T00:00:00.000Z',
//             '2021-03-24T00:00:00.000Z',
//         ],
//     },
//     fill: {
//         opacity: 0.3,
//         type: 'gradient',
//         gradient: {
//             shade: 'dark',
//             opacityFrom: 0.7,
//             opacityTo: 0.3,
//         },
//     },
// };

// const series1 = [{ name: 'series1', data: [31, 120, 10, 28, 61, 19, 109] }];
// const series2 = [{ name: 'series2', data: [5, 20, 10, 30, 15, 18, 6] }];

export function Dashboard(): JSX.Element {
    return (
        <Flex direction="column" h="100vh" color="whiteAlpha.900">
            <SidebarDrawerProvider>
                <Header />
                <Flex
                    as="main"
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px="6"
                >
                    <Sidebar />
                    <SimpleGrid
                        flex="1"
                        gap="4"
                        minChildWidth="320px"
                        height="300px"
                    >
                        <ChartBox
                            title="Inscritos da semana"
                            series={series1}
                            categories={categories1}
                        />
                        <ChartBox
                            title="Taxa de abertura"
                            series={series2}
                            categories={categories2}
                        />
                    </SimpleGrid>
                </Flex>
            </SidebarDrawerProvider>
        </Flex>
    );
}

export default Dashboard;
