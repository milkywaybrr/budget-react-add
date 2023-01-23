import { OPEATION_TYPES } from "../types/operations";

// Фильтр доходов
export const filterIncome = (data) => {
    return data.filter((item) => {
        return item.type === OPEATION_TYPES.INCOME;
    });
}

// Фильтр расходов
export const filterExpese = (data) => {
    return data.filter((item) => {
        return item.type === OPEATION_TYPES.EXPENSE;
    });
}
