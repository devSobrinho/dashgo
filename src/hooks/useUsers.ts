import { useQuery } from 'react-query';
import { api } from '../services/api';
import { User } from '../services/types/shared-types';

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get('users');

    const users: User[] = data.users.map((user: User) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            // usando nosso dateFormat com a lib nativa Intl
            // createAt: dateFormat(new Date(user.createAt)),
            // formatando o date com o toLocaleDateString da lib nativa Date
            createAt: new Date(user.createAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        };
    });

    return users;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUsers() {
    return useQuery('users', getUsers, {
        staleTime: 1000 * 5, // 5 seconds, durante 5s o react-query não precisa refazer o feacth, assim nao precisando ser recarregado nesse time
    });
}
