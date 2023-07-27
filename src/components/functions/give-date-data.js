import find_month from "./find-month";
function give_date_data(month) {
    const data = {
        arr: [],
        name: false,
        years: [],
        months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    }
    if (month === 0) {
        for (let i = 1; i <= 30; i++) {
            data.arr.push(i);
        }
    }
    else {
        if (month < 7) {
            for (let i = 1; i <= 31; i++) {
                data.arr.push(i);
            }
        }
        else {
            for (let i = 1; i <= 30; i++) {
                data.arr.push(i);
            }
        }
        data.name = find_month(month);
    }
    for (let j = 1360; j < 1390; j++) {
        data.years.push(j);
    }
    return data;
}
export default give_date_data;