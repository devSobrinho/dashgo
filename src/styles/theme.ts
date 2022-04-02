import { extendTheme, Theme } from '@chakra-ui/react';

const customTheme: Theme = {
    colors: {
        gray: {
            '900': '#181B23',
            '800': '#1F2029',
            '700': '#353646',
            '600': '#4B4D63',
            '500': '#616480',
            '400': '#797D9A',
            '300': '#9699B0',
            '200': '#B3B5C6',
            '100': '#D1D2DC',
            '50': '#EEEEF2',
        },
    },
    fonts: {
        body: "'Roboto', sans-serif",
        heading: "'Roboto', sans-serif",
    },
    styles: {
        global: {
            body: {
                bgColor: 'gray.900',
                color: 'gray.500',
            },
        },
    },
};

export const theme = extendTheme(customTheme);
