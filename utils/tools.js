//将原图缩放
export function getSmallImg(url,width=100){
	if(url) return url+"?x-oss-process=image/resize,w_"+width;
	else return "../../static/images/notPic.png"
}

//截取小数
export function decimalFormat(input, decimalPlaces=1) {
    let num;
    if (typeof input === 'string') {
        num = parseFloat(input);
    } else if (typeof input === 'number') {
        num = input;
    } else {
        return "输入不是有效的数字或数字字符串";
    }

    if (isNaN(num)) {
        return "输入无法转换为有效数字";
    }

    return num.toFixed(decimalPlaces);
}