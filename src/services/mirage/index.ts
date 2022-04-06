// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Factory, Model } from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import faker from 'faker';

type UserModal = {
    name: string;
    email: string;
    create_at: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function makeServer() {
    const server = createServer({
        models: {
            // Partial os itens do objetos podem ter valor ou nao
            user: Model.extend<Partial<UserModal>>({}),
        },

        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1} ${faker.internet.userName()}`;
                },
                email() {
                    return faker.internet.email();
                },
                createAt() {
                    return faker.date.recent(10, new Date());
                },
            }),
        },

        seeds(server) {
            server.createList('user', 200);
        },

        routes() {
            // nome da rota para chamar o miragejs EXEMPLO: localhost:3000/api
            // tomar cuidado pq o next tbem usa o /api para fazer requisicao no servidor dele
            this.namespace = 'api';

            // seta o timing da api, o carregamento da page
            this.timing = 750;
            this.get('/users');
            this.post('/users');

            // isso faz quando ele criar as rotas ele apaga a rota do mirage e o api do next nao fica incompativel
            this.namespace = '';
            // faz passar as rotas q o mirage nao conseguiu carregar por nao existir nele, ou as rotas no next api passa adiante para ele
            this.passthrough();
        },
    });

    return server;
}
