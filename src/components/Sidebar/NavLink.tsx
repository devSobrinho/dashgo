import {
    Icon,
    Link as ChakraLink,
    Text,
    LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';

export type NavLinkProps = {
    children: string;
    icon: ElementType;
    href: string;
} & ChakraLinkProps;

export function NavLink({
    children,
    icon,
    href,
    ...rest
}: NavLinkProps): JSX.Element {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink
                display="flex"
                alignItems="center"
                _active={{ color: 'pink.400' }}
                {...rest}
            >
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                    {children}
                </Text>
            </ChakraLink>
        </ActiveLink>
    );
}
