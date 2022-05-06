import { Flex, SimpleGrid } from '@chakra-ui/react';
import { ChartBox } from '../components/ChartBox';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import {
    categories1,
    categories2,
    series1,
    series2,
} from '../mock/seriesAndCategoriesMock';

export function Dashboard(): JSX.Element {
    return (
        <Flex direction="column" h="100vh" color="whiteAlpha.900">
            <Header />
            <Flex as="main" w="100%" my="6" maxWidth={1480} mx="auto" px="6">
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
        </Flex>
    );
}

export default Dashboard;
