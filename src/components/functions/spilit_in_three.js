function split_in_three(number) {
    let reversed_num = String(number).split("").reverse().join("");
    let splited_number = "";
    for (let i = 0; i < reversed_num.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            splited_number += ",";
        }
        splited_number += reversed_num[i];
    }
    return splited_number.split("").reverse().join("");
}
export default split_in_three;