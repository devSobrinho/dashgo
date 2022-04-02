import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { SidebarDrawerProvider } from '../../context/SidebarDrawerContext ';

export default function UserList(): JSX.Element {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <Box color="whiteAlpha.900">
            <SidebarDrawerProvider>
                <Header />
                <Flex
                    as="main"
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px={['3', '6']}
                >
                    <Sidebar />
                    <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading as="h2" size="lg" fontWeight="normal">
                                User List
                            </Heading>
                            <Link href="/users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={
                                        <Icon as={RiAddLine} fontSize="18" />
                                    }
                                >
                                    Create new
                                </Button>
                            </Link>
                        </Flex>

                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th
                                        px={['4', '4', '6']}
                                        color="gray.300"
                                        w="8"
                                    >
                                        <Checkbox colorScheme="pink" />
                                    </Th>
                                    <Th width="50px">Users</Th>
                                    {isWideVersion && (
                                        <>
                                            <Th>Registration date</Th>
                                            <Th w="8" />
                                        </>
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td px={['4', '4', '6']}>
                                        <Checkbox colorScheme="pink" />
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Text fontWeight="bold">
                                                Daniel Sobrinho
                                            </Text>
                                            <Text
                                                fontSize="small"
                                                color="gray.300"
                                            >
                                                dev.sobrinho@gmail.com
                                            </Text>
                                        </Box>
                                    </Td>
                                    {isWideVersion && (
                                        <Td color="white">
                                            <Box as="time">
                                                04 de Abril, 2022
                                            </Box>
                                        </Td>
                                    )}
                                    {isWideVersion && (
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={
                                                    <Icon
                                                        as={RiPencilLine}
                                                        fontSize="16"
                                                    />
                                                }
                                            >
                                                Editar
                                            </Button>
                                        </Td>
                                    )}
                                </Tr>
                            </Tbody>
                        </Table>

                        <Pagination />
                    </Box>
                </Flex>
            </SidebarDrawerProvider>
        </Box>
    );
}
