import { Flex, Icon, Input } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';

// 3 tipos de criar um form ou inputs

// Controlled component -> Declarativo - controla o value do input pelo useState            +
// Uncontrolled components -> Imperativo - utilizo a propriedade do html para fazer algo    _

// Formik API ou React Hook Form API ou Unform (bom para performace)
export function SearchBox(): JSX.Element {
    const [search, setSearch] = useState('');
    // const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
        >
            <Input
                // type="search"
                // ref={searchInputRef}
                color="gray.50"
                variant="unstyled"
                placeholder="Buscar na plataforma"
                px="4"
                mr="4"
                _placeholder={{
                    color: 'gray.400',
                }}
                onChange={e => {
                    setSearch(e.currentTarget.value);
                }}
                value={search}
            />

            {/* controlled component */}
            {!search && <Icon as={RiSearchLine} fontSize="20" />}
            {search && (
                <Icon
                    as={RiCloseLine}
                    onClick={() => {
                        setSearch('');
                    }}
                    fontSize="20"
                />
            )}
        </Flex>
    );
}
