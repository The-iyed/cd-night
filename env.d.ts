declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPO_PUBLIC_API_KEY?: string | undefined;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}