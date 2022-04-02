import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ProfileProps = {
    showProfileData: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Dev Sobrinho</Text>
                    <Text color="gray.300" fontSize="small">
                        dev.sobrinho@gmail.com
                    </Text>
                </Box>
            )}
            <Avatar
                mr="2"
                size="md"
                src="https://github.com/devSobrinho.png"
                name="Dev Sobrinho"
                border="2px"
                color="pink.500"
            />
        </Flex>
    );
}
