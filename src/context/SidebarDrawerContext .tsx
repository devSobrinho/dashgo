import { useRouter } from 'next/router';
import { useDisclosure, UseDisclosureProps } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useEffect } from 'react';

type SidebarDrawerProviderProps = {
    children: ReactNode;
};

type SidebarDrawerContextData = UseDisclosureProps;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
    children,
}: SidebarDrawerProviderProps): JSX.Element {
    const disclosure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclosure.onClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = (): UseDisclosureProps =>
    useContext(SidebarDrawerContext);
