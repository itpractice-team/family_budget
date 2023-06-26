import { configureStore } from '@reduxjs/toolkit';
import { dateReducer } from './slices/dateSlice';
import { popupReducer } from './slices/togglePopupSlice';
import { infoReducer } from './slices/infoSlice';
import { authReducer } from './slices/authSlice';
import { accountReducer } from './slices/accountSlice';
import { passwordReducer } from './slices/passwordSlice';
import { userFinanceAndCategoriesReducer } from './slices/userFinanceAndCategoriesSlice';
import { itemOptionsReducer } from './slices/itemOptions';
import { transactionListReducer } from './slices/transactionListSlice';
import { moneyboxReducer } from './slices/moneybox';

const store = configureStore({
  reducer: {
    dates: dateReducer,
    popup: popupReducer,
    info: infoReducer,
    account: accountReducer,
    auth: authReducer,
    password: passwordReducer,
    userFinanceAndCategories: userFinanceAndCategoriesReducer,
    itemOptions: itemOptionsReducer,
    transactionList: transactionListReducer,
    moneybox: moneyboxReducer,
  },
});

export default store;
