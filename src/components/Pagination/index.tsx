import { Box, Stack, Text } from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
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
    const [buttonCurrent, setButtonCurrent] = useState('');
    const [results, setResults] = useState({
        resultMin: 0,
        resultMax: 10,
        resultTotal: 100,
    });

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

    const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
        setButtonCurrent(e.currentTarget.value);
        if (buttonCurrent) {
            const valuePage = Number(e.currentTarget.value);
            const valueSearchPage = 10;
            setResults({
                ...results,
                resultMin: valuePage * valueSearchPage - valueSearchPage,
                resultMax: valuePage * valueSearchPage,
            });
        }
    };

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
                {/* {currentPage >= previousPages[0] &&
                    previousPages[0] - siblingsCount > 0 && (
                        <PaginationItem
                            buttonCurrent={buttonCurrent}
                            onClick={handleClick}
                            number={previousPages[0] - siblingsCount}
                        />
                    )} */}

                {currentPage > 1 + siblingsCount && (
                    <>
                        <PaginationItem
                            buttonCurrent={buttonCurrent}
                            onClick={handleClick}
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
                                buttonCurrent={buttonCurrent}
                                onClick={handleClick}
                                number={page}
                            />
                        );
                    })}

                <PaginationItem
                    buttonCurrent={buttonCurrent}
                    onClick={handleClick}
                    number={currentPage}
                    isCurrent
                />

                {nextPages.length > 0 &&
                    nextPages.map(page => {
                        return (
                            <PaginationItem
                                buttonCurrent={buttonCurrent}
                                onClick={handleClick}
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
                            buttonCurrent={buttonCurrent}
                            onClick={handleClick}
                            number={lastPage}
                        />
                    </>
                )}

                {/*
                {currentPage < nextPages[lastPage] &&
                    nextPages[lastPage] + siblingsCount < lastPage && (
                        <PaginationItem
                            buttonCurrent={buttonCurrent}
                            onClick={handleClick}
                            number={nextPages[lastPage]}
                        />
                    )} */}
            </Stack>
        </Stack>
    );
}
