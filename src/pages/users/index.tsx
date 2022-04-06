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
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { User } from '../../services/types/shared-types';
// import { dateFormat } from '../../utils/dateFormat';

export default function UserList(): JSX.Element {
    // lib react-query faz o cache entre a paginação do next
    const { data, isLoading, error } = useQuery(
        'users',
        async () => {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();

            const users = data.users.map((user: User) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // usando nosso dateFormat com a lib nativa Intl
                    // createAt: dateFormat(new Date(user.createAt)),
                    // formatando o date com o toLocaleDateString da lib nativa Date
                    createAt: new Date(user.createAt).toLocaleDateString(
                        'pt-BR',
                        {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        }
                    ),
                };
            });

            return users;
        },
        {
            staleTime: 1000 * 5, // 5 seconds, durante 5s o react-query não precisa refazer o feacth, assim nao precisando ser recarregado nesse time
        }
    );

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

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
                        </Heading>
                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="18" />}
                            >
                                Create new
                            </Button>
                        </Link>
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
                                    {data.map((user: User) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Text fontWeight="bold">
                                                            {user.name}
                                                        </Text>
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
                            <Pagination />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}
