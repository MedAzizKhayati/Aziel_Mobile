import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { HomeScreen, ProfileScreen, SettingsScreen, EditProfileScreen, ServiceDetailsScreen, AddressScreen, OrderDetailsScreen } from "../screens";
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
                component={HomeScreen}
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
            <BottomTab.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    tabBarButton: (props) => null,
                }}
            /> 
            <BottomTab.Screen
                name="ServiceDetails"
                component={ServiceDetailsScreen}
                options={{
                    tabBarButton: (props) => null,
                    headerShown: false,
                }}
            /> 
            <BottomTab.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{
                    tabBarButton: (props) => null,
                    headerShown: false,
                }}
            /> 
             
        </BottomTab.Navigator>
    );
}

const TabBarIcon = props => {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
