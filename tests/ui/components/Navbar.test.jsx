import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar/>', () => {
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Erik Caballero'
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el nombre del usuario', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
});