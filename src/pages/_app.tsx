import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext ';
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarDrawerProvider>
                <ChakraProvider theme={theme} resetCSS>
                    <Component {...pageProps} />
                </ChakraProvider>
            </SidebarDrawerProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp;
