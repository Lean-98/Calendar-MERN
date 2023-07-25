import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store';
import { initialState, notauthenticatedState } from '../__fixtures/authStates';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks';
import { Provider } from 'react-redux';
import { testUserCredentials } from '../__fixtures/testUser';
// import Swal from 'sweetalert2';
import calendarApi from '../../src/api/calendarApi';

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
         preloadedState: {
         auth: { ...initialState }
       }   
    })
}

describe('Pruebas en useAuthStore', () => { 

    beforeEach(()  => localStorage.clear());

    test('debe de regresar los valores por defecto', () => { 
        
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
     });

     test('startLogin debe de realizar el login correctamente', async() => { 

        const mockStore = getMockStore({ ...notauthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act (async() => {
            await result.current.startLogin( testUserCredentials );
        });
        
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64be9fb3a1074c9de9751c20' }
        });

        expect( localStorage.getItem('token')).toEqual( expect.any(String));
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String));

      });

      test('startLogin debe de fallar la autenticación', async() => { 

            const mockStore = getMockStore({ ...notauthenticatedState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            await act (async() => {
                await result.current.startLogin({ email: 'algo@gmail.com', password: '123456' });
            });    
            
            const { errorMessage, status, user } = result.current;
            expect(localStorage.getItem('token')).toBe(null);
            expect({ errorMessage, status, user }).toEqual({
                errorMessage: 'Credenciales Incorrectas!',
                status: 'not-authenticated',
                user: {}
            });

            await waitFor(
                () => expect( result.current.errorMessage ).toBe(undefined)
            );
       });

       test('startRegister debe de crear un usuario', async() => {  
            const newUser = { email: 'algo@gmail.com', password: '123456', name: 'Test User 2' }
            const mockStore = getMockStore({ ...notauthenticatedState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
                data: {
                    ok: true,
                    uid: '87464',
                    name: 'Test User',
                    token: 'random-token'
                }
            });

            await act (async() => {
                await result.current.startRegister(newUser);
            });   

            const { errorMessage, status, user } = result.current;
            // console.log({ errorMessage, status, user });

            expect({ errorMessage, status, user }).toEqual({
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test User', uid: '87464'}
            });

            spy.mockRestore();

       });

       test('startRegister debe de fallar la creación', async() => { 
 
            const mockStore = getMockStore({ ...notauthenticatedState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            await act (async() => {
                await result.current.startRegister(testUserCredentials);
            });   

            const { errorMessage, status, user } = result.current;
            // console.log({ errorMessage, status, user });

            expect({ errorMessage, status, user }).toEqual({
                errorMessage: 'Ya existe un usuario con ese correo',
                status: 'not-authenticated',
                user: {}
            });
        });

        test('checkAuthToken debe de fallar si no hay token', async() => { 

            const mockStore = getMockStore({ ...initialState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            await act (async() => {
                await result.current.checkAuthToken();
            });   

            const { errorMessage, status, user } = result.current;
            expect({ errorMessage, status, user }).toEqual({
                errorMessage: undefined,
                status: 'not-authenticated',
                user: {}
            });
         });

         test('checkAuthToken debe de autenticar el usuario si hay un token', async() => { 

            const { data } = await calendarApi.post('/auth', testUserCredentials );
            localStorage.setItem('token', data.token );

            const mockStore = getMockStore({ ...initialState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            await act (async() => {
                await result.current.checkAuthToken();
            });   

            const { errorMessage, status, user } = result.current;
            expect({ errorMessage, status, user }).toEqual({
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test User', uid: '64be9fb3a1074c9de9751c20' }
            });

          });
 });