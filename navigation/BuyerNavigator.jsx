import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { ProfileScreen, SettingsScreen } from "../screens";
import ModalScreen from "../screens/ModalScreen";

const BottomTab = createBottomTabNavigator();

export default () => {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={ModalScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Orders"
                component={ModalScreen}
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

const TabBarIcon = props => {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
