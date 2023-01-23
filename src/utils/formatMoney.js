import formatNumber from "./formatNumber";

// Ф-я форматирования для денег
const formatMoney =(value, format = "руб.") => {
    return `${formatNumber(value)} ${format}`;
}

export default formatMoney;