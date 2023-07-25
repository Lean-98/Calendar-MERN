
export const initialState = {  
    status: 'checking', 
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {  
    status: 'authenticated', 
    user: {
        uid: 'ABC',
        name: 'Leandro'
    },
    errorMessage: undefined,
}

export const notauthenticatedState = {  
    status: 'not-authenticated', 
    user: {},
    errorMessage: undefined,
}