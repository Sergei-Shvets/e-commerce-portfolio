import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../utils/status';
import { BASE_URL } from '../utils/apiURL';

const initialState = {
    searchProducts: [],
    searchProductsStatus: STATUS.IDLE,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchProducts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncSearchProduct.pending, (state) => {
                state.searchProductsStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
                state.searchProductsStatus = STATUS.SUCCEEDED;
                state.searchProducts = action.payload;
            })
            .addCase(fetchAsyncSearchProduct.rejected, (state) => {
                state.searchProductsStatus = STATUS.FAILED;
            });
    },
});

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async (searchTerm) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) => state.search.searchProductsStatus;

export default searchSlice.reducer;
