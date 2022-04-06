// import { Button as ChakraButton } from '@chakra-ui/react';

import { PaginationButton } from './PaginationButton';

type PaginationItemProps = {
    isCurrent?: boolean;
    number: number;
    onPageChange: (page: number) => void;
};

export function PaginationItem({
    isCurrent = false,
    number,
    onPageChange,
}: PaginationItemProps): JSX.Element {
    // if (isCurrent) {
    //     return (
    //         <ChakraButton
    //             size="sm"
    //             fontSize="xs"
    //             width="4"
    //             colorScheme="pink"
    //             disabled
    //             _disabled={{
    //                 bg: 'pink.500',
    //                 cursor: 'default',
    //             }}
    //             _hover={{
    //                 bg: 'pink.500',
    //             }}
    //         >
    //             {number}
    //         </ChakraButton>
    //     );
    // }

    // return (
    //     <ChakraButton
    //         size="sm"
    //         fontSize="xs"
    //         width="4"
    //         bg="gray.700"
    //         _hover={{
    //             bg: 'gray.500',
    //         }}
    //         onClick={() => onPageChange(number)}
    //     >
    //         {number}
    //     </ChakraButton>
    // );

    if (isCurrent) {
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
                value={number}
                number={number}
            />
        );
    }

    return (
        <PaginationButton
            number={number}
            value={number}
            onClick={() => onPageChange(number)}
        />
    );
}
