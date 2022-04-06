import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { useRouter } from 'next/router';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const schema = yup
    .object({
        name: yup.string().required('Name required').min(4).max(55),
        email: yup.string().required('Insert E-mail').email(),
        password: yup.string().required().min(6).max(18),
        password_confirmation: yup
            .string()
            .required()
            .oneOf([null, yup.ref('password')]),
    })
    .required();

export default function CreateUser(): JSX.Element {
    const router = useRouter();

    // um hook igual o useQuery do react-query
    // o useMutation diferente do useQuery, você consegue monitorar estado do proprio hook como isLoading, isSuccess e etc
    const createUser = useMutation(
        async (user: CreateUserFormData) => {
            const response = await api.post('users', {
                user: {
                    ...user,
                    create_at: new Date(),
                },
            });

            return response.data.user;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
            },
        }
    );

    /* useMutateTodo -> Mudar o valor de dentro do cache

        const useMutateTodo = () => {
            const queryClient = useQueryClient();

            return useMutation(editTodo, {
                // Notice the second argument is the variables object that the `mutate` function receives
                onSuccess: (data, variables) => {
                                            ***key da query
                    queryClient.setQueryData(['todo', { id: variables.id }], data);
                },
            });
        };
    */

    const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
        resolver: yupResolver(schema),
    });

    const handleCreateUser: SubmitHandler<
        CreateUserFormData
    > = async values => {
        await createUser.mutateAsync(values);
        router.push('/users');
    };

    return (
        <Box color="whiteAlpha.900">
            <Header />
            <Flex as="main" w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box
                    as="form"
                    method="POST"
                    onSubmit={handleSubmit(handleCreateUser)}
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={['4', '8']}
                >
                    <Heading size="lg" fontWeight="normal">
                        Create user
                    </Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                type="text"
                                name="name"
                                label="Name"
                                placeholder="insert name"
                                error={formState.errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="Email"
                                label="E-mail"
                                type="email"
                                placeholder="userEmail@email.com"
                                error={formState.errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="insert password"
                                error={formState.errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                label="Re-password"
                                type="password"
                                placeholder="confirm password"
                                error={formState.errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">
                                    Cancel
                                </Button>
                            </Link>
                            {/* <Link href="/users/create/save" passHref> */}
                            <Button
                                type="submit"
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Save
                            </Button>
                            {/* </Link> */}
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
