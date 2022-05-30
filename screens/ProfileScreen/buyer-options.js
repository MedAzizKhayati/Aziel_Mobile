import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default [
    {
        title: "Dashboard",
        icon: "sliders",
        component: FontAwesome
    },
    {
        title: "Payment History",
        icon: "credit-card",
        component: FontAwesome
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
        title: "Logout",
        icon: "logout",
        component: AntDesign,
        onPress: ({authDispatch}) => authDispatch({type: "LOGOUT"})
    },
]