import { OPEATION_TYPES } from "../types/operations";

const calculateBalance = (data) => {
    return data.reduce((prev, current) => {
        if(current.type === OPEATION_TYPES.EXPENSE) {
            return prev -= current.value;
        }

        return prev += current.value;
    }, 0)
}

export default calculateBalance;