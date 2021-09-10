export function dateFormating(date){
    if(date){
        const Year = date.slice(0,4);
        const Month = date.slice(5,7);
        const Date = date.slice(8,10);
        const sliceHour = parseInt(date.slice(11,13));
        const Hour =  
        sliceHour > 12 ? 
            `오후 ${sliceHour-12 > 10 ?  sliceHour-12 : "0"+ sliceHour}`
        : 
            `오전 ${sliceHour > 10 ? sliceHour : "0"+ sliceHour}`;
        const Min = date.slice(14,16);
        return `${Year}년 ${Month}월 ${Date}일 ${Hour}:${Min}`
    }
}