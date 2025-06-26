import { types } from '../../../src/auth/types/types';
import { authReducer } from '../../../src/auth/context';


describe('Pruebas en authReducer', () => {
    const initialState = {
        logged: false,
    }

    const user = {
        id: 'ABC',
        name: 'Erik Caballero',
    }

    test('debe de retornar el estado por defecto', () => {
        const newState = authReducer(initialState, {})
        expect(newState).toEqual(initialState);
    });

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: user
        }

        const newState = authReducer(initialState, action);

        expect(newState.user.name).toBe(user.name);
    });

    test('debe de (logout) borrar el name del usuario y logged en false', () => {
        const loggedState = {
            logged: true,
            user,
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(loggedState, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBeUndefined();
    });
});