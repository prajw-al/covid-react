import { INDIA_ISO_SUFFIX } from '../constants';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
let locale = null;
// const getLocale = () => {
//     import('date-fns/locale/').then((localePackage) => {
//         locale = localePackage;
//     });
// };
export const formatDate = (unformattedDate, formatString) => {
    if (
        typeof unformattedDate === 'string' &&
        unformattedDate.match(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g)
    )
        unformattedDate += INDIA_ISO_SUFFIX;
    const date = utcToZonedTime(new Date(unformattedDate), 'Asia/Kolkata');
    return format(date, formatString, {
        locale: locale,
    });
};
export const formatNumber = (value) => {
    const numberFormatter = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
    });
    return isNaN(value) ? '-' : numberFormatter.format(value);
};
export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
