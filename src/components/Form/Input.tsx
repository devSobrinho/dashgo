import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

export type InputProps = {
    name: string;
    label?: string;
    error?: FieldError;
    // messageHelperText?: string;
} & ChakraInputProps;

export const InputForward: ForwardRefRenderFunction<
    HTMLInputElement,
    InputProps
    // eslint-disable-next-line react/function-component-definition
> = (
    { name, label = '', error = null, /* messageHelperText, */ ...rest },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                bgColor="gray.900"
                variant="filled"
                _focus={{
                    borderColor: 'pink.500',
                    bgColor: 'gray.700',
                    _placeholder: {
                        color: 'pink.500',
                    },
                }}
                _hover={{
                    bgColor: 'gray.700',
                    _placeholder: {
                        color: 'pink.500',
                    },
                }}
                size="lg"
                ref={ref}
                {...rest}
            />
            {/* {!error && <FormHelperText>{messageHelperText}</FormHelperText>} */}
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const Input = forwardRef(InputForward);
