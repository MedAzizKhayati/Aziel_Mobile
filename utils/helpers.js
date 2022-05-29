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