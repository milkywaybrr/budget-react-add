import { filterExpese, filterIncome } from "../utils/filter";
import { useState } from "react";

import { formatMoney, calculateBalance, getItemType } from "../utils";
import { OPEATION_TYPES } from "../types/operations";

import { CATEGORIES } from "../data/categories";
import { useEffect } from "react";

const initialBalanceState = 0;


const initialItems = [
    {
        id: 1,
        category: "products",
        value: 3000,
        type: "expense",
        data: new Date()
    },
    {
        id: 2,
        category: "salary",
        value: 50315,
        type: "income",
        data: new Date()
    },
    {
        id: 3,
        category: "car",
        value: 20000,
        type: "expense",
        data: new Date()
    }
];

const HomePage = () => {
    const [allbalance, setAllBalance] = useState();

    const [items, setItems] = useState(initialItems);

    const [balance, setBalance] = useState(0);
    const [category, setCategory] = useState('none');

    const onChangeCategoryHandle = (e) => setCategory(e.target.value);

    const onChangeBalanceHandle = (event) => {
        setBalance((prevState) => {
            const value = parseInt(event.target.value) || 0;

            if(!isNaN(value)) {
                prevState = value;
            }

            return prevState;
        });
    }

    const onAddItemHandle = () => {
        setItems((prevState) => {
            prevState = [...prevState];

            prevState.push({
                id: Date.now(),
                category: category,
                value: balance,
                type: getItemType(category),
                data: new Date()
            });

            return prevState;
        });

        setBalance(0);
    }

    // Для отображения всех операций
    const onClickAllFilterHandel = (initialBalanceState) => {
        setItems(initialItems);
    }

    // Для отображения всех доходов
    const onClickIncomeFilterHandel = () => {
        setItems(filterIncome(initialItems));
    }

    // Для отображения всех расходов
    const onClickExpenseFilterHandel = () => {
        setItems(filterExpese(initialItems));
    }

    useEffect(() => {
        setAllBalance(calculateBalance(items))
    }, [items])

    return (
        <section>
            <div className="container">
                <div className="balance">
                    <h2>
                        {formatMoney(allbalance)}
                    </h2>
                </div>

                <div className="balance-form">
                    <form onSubmit={e => e.preventDefault()}>
                        <h3>
                            Добавить операцию
                        </h3>

                        <div className="wrapper">
                            <input 
                                type="text" 
                                name="balance" 
                                placeholder="30 000" 
                                value={balance} 
                                onChange={(e) => onChangeBalanceHandle(e)} 
                            />

                            <select onChange={(e) => onChangeCategoryHandle(e)} name="category">
                                <option value="none">Не выбрано</option>

                                {
                                    Object.keys(CATEGORIES).map((category) => {
                                        return (
                                            <option key={category} value={category}>
                                                {CATEGORIES[category]}
                                            </option>
                                        );
                                    })
                                }
                            </select>

                            <button onClick={onAddItemHandle} className="button">Добавить операцию</button>
                        </div>
                    </form>
                </div>

                <div className="operations__wrapper">

                    <h2 className="operation__title">
                        Операции
                    </h2>
                    <div className="filter">
                        <button onClick={onClickAllFilterHandel} className="button sm">Все операции</button>
                        <button onClick={onClickIncomeFilterHandel} className="button sm green">Все доходы</button>
                        <button onClick={onClickExpenseFilterHandel} className="button sm red">Все расходы</button>
                    </div>

                    <div className="operations">
                        {
                            items.map((item) => {
                                return (
                                    <div key={item.id} className="operation">
                                        <div className={`circle ${item.type === OPEATION_TYPES.INCOME ? "income" : "expense"}`}>
                                            {
                                                item.type === OPEATION_TYPES.INCOME ?
                                                <i className="fa-solid fa-money-bill"></i>
                                                :
                                                <i className="fa-solid fa-shop"></i>
                                            }
                                        </div>

                                        <p className="category">Категория: {CATEGORIES[item.category]}</p>
                                        <p className="total">{formatMoney(item.value)}</p>
                                        <button className="button button--remove">Удалить</button>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="pagination">
                        <button className="pagination__button">1</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;