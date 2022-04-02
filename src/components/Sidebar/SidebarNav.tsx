import { Stack } from '@chakra-ui/react';
import {
    RiContactsLine,
    RiDashboardLine,
    RiGitMergeLine,
    RiInformationLine,
    RiInputMethodLine,
    RiSettings3Line,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav(): JSX.Element {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink href="/dashboard" icon={RiDashboardLine}>
                    Dashboard
                </NavLink>
                <NavLink href="/users" icon={RiContactsLine}>
                    Users
                </NavLink>
            </NavSection>
            <NavSection title="AUTOMATION">
                <NavLink href="/forms" icon={RiInputMethodLine}>
                    Forms
                </NavLink>
                <NavLink href="automation" icon={RiGitMergeLine}>
                    Automation
                </NavLink>
            </NavSection>
            <NavSection title="setting">
                <NavLink href="/settings" icon={RiSettings3Line}>
                    Settings
                </NavLink>
                <NavLink href="info" icon={RiInformationLine}>
                    Info
                </NavLink>
            </NavSection>
        </Stack>
    );
}
