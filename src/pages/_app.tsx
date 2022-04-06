import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext ';
import { makeServer } from '../services/mirage';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

const queryClient = new QueryClient();

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
