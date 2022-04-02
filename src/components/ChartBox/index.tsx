import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useEffect } from 'react';
import { optionsAndCategories } from './optionsApexCharts';

// Chart usa o window do navegador e o next bloqueia isso, logo precisa importar o apexchart dessa forma usando o dynamic do next
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

type CharBoxType = {
    title: string;
    series: ApexOptions['series'];
    categories: string[];
};

export function ChartBox({
    title,
    series,
    categories = [],
}: CharBoxType): JSX.Element {
    // loading categories
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {}, [categories]);
    const optionsChart = optionsAndCategories(categories);

    return (
        <Box bg="gray.800" borderRadius={8} p={['6', '8']} pb="4">
            <Text fontSize="lg" mb="4">
                {title}
            </Text>
            <Chart
                options={optionsChart}
                series={series}
                type="area"
                height="160px"
                width="500px"
            />
        </Box>
    );
}
