import {useFonts} from 'expo-font'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {Stack, SplashScreen} from 'expo-router'

import {useColorScheme} from 'react-native'

import {TamaguiProvider} from 'tamagui'
import {tamaguiConfig} from '@/tamagui.config'
import {useEffect} from 'react';


export {
    // Catch any errors thrown by the Layout component
    ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync()
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};


export default function App() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }
    return <RootLayout/>
}

function RootLayout() {
    const colorScheme = useColorScheme()
    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                </Stack>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
