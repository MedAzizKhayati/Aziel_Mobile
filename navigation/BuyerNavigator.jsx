import { FontAwesome, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { GlobalContext } from "../context/Provider";
import useColorScheme from "../hooks/useColorScheme";
import { HomeScreen, ProfileScreen, SettingsScreen, ServicesScreen, EditProfileScreen, ServiceDetailsScreen, OrderDetailsScreen, MessagesScreen, InboxScreen, OrdersScreen , SuccessScreen} from "../screens";
import ModalScreen from "../screens/ModalScreen";

const BottomTab = createBottomTabNavigator();

export default () => {
    const colorScheme = useColorScheme();
    const {
        authState: {
            unreadMessagesCount
        },
    } = useContext(GlobalContext);
    
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarLabel: () => null,
            }}
            backBehavior="history"
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
                component={OrdersScreen}
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="InboxScreen"
                component={InboxScreen}
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <Entypo size={30} name="message" color={color} />,
                    tabBarBadge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
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
            {/* <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
                }}
            /> */}
            <BottomTab.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    tabBarButton: () => null,
                }}
            />
            <BottomTab.Screen
                name="ServiceDetails"
                component={ServiceDetailsScreen}
                options={{
                    title: 'Service Details',
                    tabBarButton: () => null,
                }}
            />
            <BottomTab.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{
                    title: 'Order Details',
                    tabBarButton: () => null,
                }}
            />
            <BottomTab.Screen
                name="ServicesScreen"
                component={ServicesScreen}
                options={{
                    title: 'Services',
                    tabBarButton: () => null,
                }}
            />

            <BottomTab.Screen
                name="MessagesScreen"
                component={MessagesScreen}
                options={{
                    title: 'Messages',
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' },
                }}
            />

              <BottomTab.Screen
                name="SuccessScreen"
                component={SuccessScreen}
                options={{
                    title: 'Success',
                    tabBarButton: () => null,
                }}
            />
            
        </BottomTab.Navigator>
    );
}

const TabBarIcon = props => {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
