
export const getEnvVariables = () => {

    // import.meta.env;
    // const envVariable = import.meta.env;

    return {
        // ...envVariable
        // ...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_MODE: import.meta.env.VITE_MODE,
    }
}