import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../context/SidebarDrawerContext ';
import { SidebarNav } from './SidebarNav';

export function Sidebar(): JSX.Element {
    const sidebarContext = useSidebarDrawer();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    });

    if (isDrawerSidebar) {
        return (
            <Drawer
                isOpen={sidebarContext.isOpen}
                placement="left"
                onClose={() => {
                    sidebarContext.onClose();
                }}
            >
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4" color="whiteAlpha.900">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navigation</DrawerHeader>
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }

    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    );
}
