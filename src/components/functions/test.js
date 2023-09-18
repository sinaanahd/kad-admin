const gold = 2375000;
const weight = 4.27;
const ojrat = 25;
const tax = 9;
const profit = 7;

const total = weight*((((gold + (gold * ojrat/100))+((gold + (gold * ojrat/100))* profit/100))-gold)*(tax/100))+weight*(((gold + (gold * ojrat/100))+((gold + (gold * ojrat/100))* profit/100)))

function tell_total (){
    return total;
}
export default tell_total;