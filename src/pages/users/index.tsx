/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiPencilLine, RiRefreshLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { getUser, getUsers, useUsers } from '../../hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { User } from '../../services/types/shared-types';
// import { dateFormat } from '../../utils/dateFormat';

export default function UserList({ users }): JSX.Element {
    // controls para animação do frame-motion
    const controls = useAnimation();

    const [page, setPage] = useState(1);

    // lib react-query faz o cache entre a paginação do next
    const { data, isLoading, isFetching, error, refetch } = useUsers(
        page
        // s a props do server side como initialData
        //   , {
        //     initialData: users,
        // }
    );

    console.log('o data', data);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    // Prefetch com react-query usando o QueryClient dele
    const handlePrefetchUser = async (userId: string): Promise<void> => {
        await queryClient.prefetchQuery(
            ['user', userId],
            () => getUser(userId),
            {
                staleTime: 1000 * 60 * 10, // 10min sem prefetch
            }
        );
    };

    return (
        <Box color="whiteAlpha.900">
            <Header />
            <Flex
                as="main"
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px={['3', '6']}
            >
                {/* <Text fontSize="50rem">{namePoke}</Text> */}
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading as="h2" size="lg" fontWeight="normal">
                            User List
                            {!isLoading && isFetching && (
                                <Spinner size="sm" color="gray.500" ml="4" />
                            )}
                        </Heading>
                        <Box>
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

                            <Button
                                ml="1rem"
                                size="sm"
                                fontSize="sm"
                                colorScheme="gray.900"
                                border="1px solid"
                                borderColor="pink.500"
                                leftIcon={
                                    <motion.span
                                        animate={controls}
                                        // onTap={() => cycleX()}
                                    >
                                        <Icon
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr="0.25rem"
                                            as={RiRefreshLine}
                                            fontSize="18"
                                        />
                                    </motion.span>
                                }
                                onClick={() => !isLoading && refetch()}
                            >
                                Refresh All
                            </Button>
                        </Box>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Failed to get data</Text>
                        </Flex>
                    ) : (
                        <>
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
                                    {data.users.map((user: User) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <ChakraLink
                                                            color="purple.400"
                                                            onMouseEnter={() =>
                                                                handlePrefetchUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            <Text fontWeight="bold">
                                                                {user.name}
                                                            </Text>
                                                        </ChakraLink>
                                                        <Text
                                                            fontSize="small"
                                                            color="gray.300"
                                                        >
                                                            {user.email}
                                                        </Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && (
                                                    <Td color="white">
                                                        <Box as="time">
                                                            {user.createAt}
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
                                                                    as={
                                                                        RiPencilLine
                                                                    }
                                                                    fontSize="16"
                                                                />
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Td>
                                                )}
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

// Server Side setando um user para iniciar o primeiro req no server! Não funciona com miragejs, so com api ativa
// export const getServerSideProps: GetServerSideProps = async ctx => {
//     const { users, totalCount } = await getUsers(1);

//     return {
//         props: { users, totalCount },
//     };
// };
