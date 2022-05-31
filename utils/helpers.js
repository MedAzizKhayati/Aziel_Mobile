import { BASE_URL } from "../services/api.service";

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