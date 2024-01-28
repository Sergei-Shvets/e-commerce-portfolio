import React, { useEffect } from 'react';
import './SearchPage.scss';
import { useParams } from 'react-router-dom';
import {
    clearSearch,
    fetchAsyncSearchProduct,
    getSearchProducts,
    getSearchProductsStatus,
} from '../../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';

const SearchPage = () => {
    const dispatch = useDispatch();
    const { searchTerm } = useParams();
    const searchProducts = useSelector(getSearchProducts);
    const searchProductsStatus = useSelector(getSearchProductsStatus);

    useEffect(() => {
        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm));
    }, [dispatch, searchTerm]);

    if (searchProducts.length === 0) {
        return (
            <div className="container" style={{ minHeight: '76vh' }}>
                <div className="fw-5 text-danger py-5 text-center">
                    <h1>No results were found for your request</h1>
                </div>
            </div>
        );
    }

    return (
        <main>
            <div className="search-content bg-whitesmoke">
                <div className="container">
                    <div className="py-5">
                        <div className="title-md">
                            <h3>Search results:</h3>
                        </div>
                        <br />
                        {searchProductsStatus === STATUS.LOADING ? (
                            <Loader />
                        ) : (
                            <ProductList products={searchProducts} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SearchPage;
