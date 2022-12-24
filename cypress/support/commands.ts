// eslint-disable-next-line ulbi-tv-plugin/path-checker
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

function login(username: string = 'testuser', password: string = '123') {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password,
        },
    })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
        });
};
Cypress.Commands.add('login', login);

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<void>;
        }
    }
}

export {};
