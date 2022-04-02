import { Box, Stack } from '@chakra-ui/react';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import { PaginationItem } from './PaginationItem';

// export type PaginationProps = {
//   title?: string;
// };

export function Pagination(): JSX.Element {
    const [buttonCurrent, setButtonCurrent] = useState('');
    const [results, setResults] = useState({
        resultMin: 0,
        resultMax: 10,
        resultTotal: 100,
    });

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
                <strong>{results.resultMin}</strong> -{' '}
                <strong>{results.resultMax}</strong> de{' '}
                <strong>{results.resultTotal}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                <PaginationItem
                    buttonCurrent={buttonCurrent}
                    onClick={handleClick}
                    number={1}
                    isCurrent
                />
                <PaginationItem
                    buttonCurrent={buttonCurrent}
                    onClick={handleClick}
                    number={2}
                />
                <PaginationItem
                    buttonCurrent={buttonCurrent}
                    onClick={handleClick}
                    number={3}
                />
                <PaginationItem
                    buttonCurrent={buttonCurrent}
                    onClick={handleClick}
                    number={4}
                />
            </Stack>
        </Stack>
    );
}
