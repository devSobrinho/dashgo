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

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

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
    const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
        resolver: yupResolver(schema),
    });

    const handleCreateUser: SubmitHandler<
        CreateUserFormData
    > = async values => {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise(resolve => setTimeout(resolve, 2000));
        // eslint-disable-next-line no-console
        console.log('values', values);
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
