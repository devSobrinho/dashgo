import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { useState } from 'react';

import { PaginationButton } from './PaginationButton';

type PaginationItemProps = {
    isCurrent?: boolean;
    number: number;
    buttonCurrent: string;
} & ChakraButtonProps;

export function PaginationItem({
    isCurrent = false,
    number,
    buttonCurrent,
    ...rest
}: PaginationItemProps): JSX.Element {
    if (Number(buttonCurrent) === number || (!buttonCurrent && isCurrent)) {
        return (
            <PaginationButton
                colorScheme="pink"
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default',
                }}
                _hover={{
                    bg: 'pink.500',
                }}
                {...rest}
                value={number}
                number={number}
            >
                {number}
            </PaginationButton>
        );
    }

    return (
        <PaginationButton number={number} {...rest} value={number}>
            {number}
        </PaginationButton>
    );
}
