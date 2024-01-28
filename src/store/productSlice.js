import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../utils/status';
import { BASE_URL } from '../utils/apiURL';

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productSingle: [],
    productSingleStatus: STATUS.IDLE,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
                state.productsStatus = STATUS.SUCCEEDED;
                state.products = action.payload;
            })
            .addCase(fetchAsyncProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAILED;
            })

            .addCase(fetchAsyncProductSingle.pending, (state) => {
                state.productSingleStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
                state.productSingleStatus = STATUS.SUCCEEDED;
                state.productSingle = action.payload;
            })
            .addCase(fetchAsyncProductSingle.rejected, (state) => {
                state.productSingleStatus = STATUS.FAILED;
            });
    },
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
});

// for getting the single product data
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getProductSingleStatus = (state) => state.product.productSingleStatus;

export default productSlice.reducer;
