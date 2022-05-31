import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getTestNotification } from "../../services/user.service";

export default [
    {
        title: "Dashboard",
        icon: "sliders",
        component: FontAwesome
    },
    {
        title: "My Services",
        icon: "credit-card",
        component: FontAwesome,
        onPress: ({navigation}) => navigation.navigate("MyServicesScreen")
    },
    {
        title: "Statistics",
        icon: "areachart",
        component: AntDesign
    },
    {
        title: "Become An Affiliate",
        icon: "hands-helping",
        component: FontAwesome5
    },
    {
        title: "Rewards",
        icon: "gift",
        component: FontAwesome
    },
    {
        title: "Test Notification",
        icon: 'notifications-active',
        component: MaterialIcons,
        onPress: getTestNotification
    },
    {
        title: "Logout",
        icon: "logout",
        component: AntDesign,
        onPress: ({authDispatch}) => authDispatch({type: "LOGOUT"})
    },
];