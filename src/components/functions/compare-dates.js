import * as shamsi from "shamsi-date-converter";
function compare_months (entry_date , year , month){
    const start_date = new Date(
      shamsi.jalaliToGregorian(year, month, 1).join("/")
    ).getTime();
    const final_date = new Date(
      shamsi.jalaliToGregorian(year, month, month <= 6 ? 31 : 30).join("/")
    ).getTime();
    const result = start_date <= entry_date && final_date >= entry_date;
    return result;
}
export default compare_months


