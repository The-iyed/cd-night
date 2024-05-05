import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable} from "react-native";
import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {Signpost} from '@tamagui/lucide-icons';
import {Video} from "@tamagui/lucide-icons";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Posts",
                    tabBarIcon: ({color}) => <Signpost color={color}/>,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "chat ai",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="star-four-points-outline" size={24}
                                                                     color={color}/>,
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: "Courses",
                    tabBarIcon: ({color}) => <Video color={color}/>,
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "profile",
                    tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color}/>,
                }}
            />
        </Tabs>
    );
}
