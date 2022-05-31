import { BASE_URL } from "../services/api.service";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { registerNotificationToken } from "../services/user.service";

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const getMonthName = (month) => {
    return MONTHS[month];
}

export const formatURI = (uri) => {
    return BASE_URL + (uri?.split('\\').join('/') || '');
}

export const formatDate = (date) => {
    const d = new Date(date);
    const pmOrAm = d.getHours() >= 12 ? 'PM' : 'AM';
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} at ${d.getHours() % 13} ${pmOrAm}`;
}

export const timeFromNow = (date) => {
    date = new Date(date);
    const currentDate = new Date();
    const diff = date.getTime() - currentDate.getTime();
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInSeconds = Math.floor(diff / (1000));
    if (diffInDays > 0) {
        return `${diffInDays} days`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hours`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} minutes`;
    } else {
        return `${diffInSeconds} seconds`;
    }
}

export async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
    });
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    await registerNotificationToken(token);

    return token;
}