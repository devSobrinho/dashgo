import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from '../../context/SidebarDrawerContext ';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header(): JSX.Element {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const ContextSidebar = useSidebarDrawer();

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
            justifyContent="space-around"
            // onClick={() => !isWideVersion && ContextSidebar.onOpen()}
        >
            {!isWideVersion && (
                <IconButton
                    aria-label="menu button"
                    icon={<Icon as={RiMenuLine} />}
                    onClick={() => ContextSidebar.onOpen()}
                    fontSize="24"
                    variant="unstyled"
                    display="flex"
                    alignContent="center"
                    justifyContent="center"
                    mr="3"
                />
            )}

            <Logo />

            {isWideVersion && <SearchBox />}

            <Flex alignItems="center" ml="auto">
                <NotificationNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}
