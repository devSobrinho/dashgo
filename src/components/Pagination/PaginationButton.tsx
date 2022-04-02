import { Button, ButtonProps } from '@chakra-ui/react';

type PaginationButtonProps = {
    number: number;
} & ButtonProps;

export function PaginationButton({
    number,
    ...rest
}: PaginationButtonProps): JSX.Element {
    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.700"
            _hover={{
                bg: 'gray.500',
            }}
            {...rest}
        >
            {number}
        </Button>
    );
}
