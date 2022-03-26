export function amountFormating(amount){
    return amount/10000 >= 10000 ? amount/100000000+"억원":amount/10000+"만원";
}

export function amountFormatingMultiply(amount){
    const inputAmount = amount*1000000
    return inputAmount/10000 >= 10000 ? inputAmount/100000000+"억원":inputAmount/10000+"만원";
}