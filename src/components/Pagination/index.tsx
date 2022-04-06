import { Box, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

export type PaginationProps = {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
};

const siblingsCount = 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange,
}: PaginationProps): JSX.Element {
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

    const previousPages =
        currentPage > 1
            ? generatePagesArray(
                  currentPage - 1 - siblingsCount,
                  currentPage - 1
              )
            : [];

    const nextPages =
        currentPage < lastPage
            ? generatePagesArray(
                  currentPage,
                  Math.min(currentPage + siblingsCount, lastPage)
              )
            : [];

    return (
        <Stack
            direction={['column', 'row']}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>{currentPage}</strong> -{' '}
                <strong>{registersPerPage}</strong> de{' '}
                <strong>{totalCountOfRegisters}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > 1 + siblingsCount && (
                    <>
                        <PaginationItem
                            onPageChange={onPageChange}
                            number={1}
                        />
                        {currentPage > 2 + siblingsCount && (
                            <Text color="gray.300" textAlign="center" width="8">
                                ...
                            </Text>
                        )}
                    </>
                )}

                {previousPages.length > 0 &&
                    previousPages.map(page => {
                        return (
                            <PaginationItem
                                onPageChange={onPageChange}
                                number={page}
                            />
                        );
                    })}

                <PaginationItem
                    onPageChange={onPageChange}
                    number={currentPage}
                    isCurrent
                />

                {nextPages.length > 0 &&
                    nextPages.map(page => {
                        return (
                            <PaginationItem
                                onPageChange={onPageChange}
                                number={page}
                            />
                        );
                    })}

                {currentPage + siblingsCount < lastPage && (
                    <>
                        {currentPage + siblingsCount + 1 < lastPage && (
                            <Text color="gray.300" textAlign="center" width="8">
                                ...
                            </Text>
                        )}
                        <PaginationItem
                            onPageChange={onPageChange}
                            number={lastPage}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    );
}
