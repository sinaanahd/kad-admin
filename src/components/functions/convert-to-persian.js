function convert_to_persian(num) {
    let number = num;
    let persian_digits = [];
    if (number !== 0) {
        while (number / 10 !== 0) {
            const digit = number % 10;
            number = Math.floor(number / 10);
            switch (digit) {
                case 0:
                    persian_digits.push("۰");
                    break;
                case 1:
                    persian_digits.push("۱");
                    break;
                case 2:
                    persian_digits.push("۲");
                    break;
                case 3:
                    persian_digits.push("۳");
                    break;
                case 4:
                    persian_digits.push("۴");
                    break;
                case 5:
                    persian_digits.push("۵");
                    break;
                case 6:
                    persian_digits.push("۶");
                    break;
                case 7:
                    persian_digits.push("۷");
                    break;
                case 8:
                    persian_digits.push("۸");
                    break;
                case 9:
                    persian_digits.push("۹");
                    break;
            }
        }
    }
    else {
        persian_digits.push("۰");
    }
    let final_string = "";
    persian_digits.reverse().forEach(d => {
        final_string += d;
    })
    return final_string;
}
export default convert_to_persian;