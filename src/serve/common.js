const hslToRgb = (h, s, l) => {
    var r, g, b;

    if(!s)
        r = g = b = l; // achromatic
    else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const timeDifference = (newDate, oldDate) => {
    let difference = newDate.getTime() - oldDate.getTime()

    let yearsDifference = Math.floor(difference/1000/60/60/24/365)
    if(yearsDifference) return (yearsDifference === 1 ? "1 year" : yearsDifference.toString() + " years")
    difference -= yearsDifference*1000*60*60*24*365

    let weeksDifference = Math.floor(difference/1000/60/60/24/7)
    if(weeksDifference) return (weeksDifference === 1 ? "1 week" : weeksDifference.toString() + " weeks")
    difference -= weeksDifference*1000*60*60*24*7

    let daysDifference = Math.floor(difference/1000/60/60/24)
    if(daysDifference) return (daysDifference === 1 ? "1 day" : daysDifference.toString() + " days")
    difference -= daysDifference*1000*60*60*24

    let hoursDifference = Math.floor(difference/1000/60/60)
    if(hoursDifference) return (hoursDifference === 1 ? "1 hour" : hoursDifference.toString() + " hours")
    difference -= hoursDifference*1000*60*60

    let minutesDifference = Math.floor(difference/1000/60)
    if(minutesDifference) return minutesDifference.toString() + " min"
    difference -= minutesDifference*1000*60

    let secondsDifference = Math.floor(difference/1000)
    if(secondsDifference) return secondsDifference.toString() + " sec"
    else return "just now"
}

export const numberToColorHsl = (i, min = 0, max = 1) => {
    let ratio = i;
    if (min> 0 || max < 1) {
        if (i < min) 
            ratio = 0
        else if (i > max) 
            ratio = 1
        else 
            ratio = (i-min) / (max-min)
    }

    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = ratio * 1.2 / 3.60;

    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; 
}