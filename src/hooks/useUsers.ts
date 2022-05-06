/* eslint-disable no-shadow */
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { User } from '../services/types/shared-types';

type GetUsersResponse = {
    users: User[];
    totalCount: number;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUser = async (userId: string): Promise<User> => {
    const { data } = await api.get(`users/${userId}`);

    return data.user;
};

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
    const { data, headers } = await api.get('users/', {
        params: {
            page,
        },
    });

    const totalCount = Number(headers['x-total-count']);

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

    return { users, totalCount };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUsers(page: number /* , options: UseQueryOptions */) {
    return useQuery(['users', page], () => getUsers(page), {
        staleTime: 1000 * 5, // 5 seconds, durante 5s o react-query não precisa refazer o feacth, assim nao precisando ser recarregado nesse time
        // integrando o nextjs com o react-query pois a option initialData não faz o primeiro fetch caso o SSR mande o initialData
        // ...options, <- funciona com api ativa, no mirage não funciona
    });
}

// MY HOOK
// type OmitOptionsHook = Omit<
//     UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
//     'queryKey'
// >;

// export function useUsers(
//     page: number,
//     fetch?: QueryFunction<GetUsersResponse, (string | number)[]>,
//     options?: Omit<>
// ): UseQueryResult<T> {
//     return useQuery(['users', page], () => getUsers(page), {
//         staleTime: 1000 * 5, // 5s
//     });
// }
