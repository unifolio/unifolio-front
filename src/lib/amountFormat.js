export function amountFormating(amount){
    return amount/10000 >= 10000 ? amount/100000000+"억원":amount/10000+"만원";
}