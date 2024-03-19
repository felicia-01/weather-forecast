export function formatDateAndTime(timestamp) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateObj = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const dayOfWeek = days[dateObj.getDay()];
    const dayOfMonth = ('0' + dateObj.getDate()).slice(-2);
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const formattedTime = `${hours}:${minutes} ${meridiem}`;

    return {
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes,
        meridiem: meridiem
    };
}

// const timestamp = 1710612000; // Unix timestamp
// const formattedDateTime = formatDateAndTime(timestamp);
// console.log(formattedDateTime);
