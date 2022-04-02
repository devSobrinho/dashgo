import { Button, Text, Flex, Stack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Form/Input';

type SingInFormData = {
    email: string;
    password: string;
};

type IFormInput = {
    email: string;
    password: string;
};

const schema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(18),
    })
    .required();

export default function Home(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const handleSingIn: SubmitHandler<SingInFormData> = async values => {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('values', values);
    };

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
            flexDirection="column"
            color="whiteAlpha.900"
        >
            <Flex
                as="form"
                method="POST"
                width="100%"
                maxWidth={360}
                backgroundColor="gray.800"
                padding="8"
                borderRadius={8}
                flexDirection="column"
                position="relative"
                onSubmit={handleSubmit(handleSingIn)}
            >
                <Text as="span" position="absolute" top={-6} left={2}>
                    login
                </Text>
                <Stack spacing={4} color="white">
                    <Input
                        // isError={}
                        name="email"
                        label="E-mail"
                        placeholder="yourEmail@gmail.com"
                        error={errors.email}
                        // messageHelperText="Enter your email"
                        {...register('email')}
                    />
                    <Input
                        name="password"
                        label="password"
                        placeholder="Insert your password"
                        error={errors.password}
                        // messageHelperText="Enter your password"
                        {...register('password')}
                    />
                </Stack>
                <Button
                    type="submit"
                    colorScheme="pink"
                    marginTop={8}
                    size="lg"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
}
