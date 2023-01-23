import { INCOME_CATEGORIES } from "../data/categories";
import { OPEATION_TYPES } from "../types/operations";

// Функция опрeделения типа операции
const getItemType = (category) => {
    if(Object.keys(INCOME_CATEGORIES).includes(category)) {
        return OPEATION_TYPES.INCOME;
    }

    return OPEATION_TYPES.EXPENSE;
}

export default getItemType;