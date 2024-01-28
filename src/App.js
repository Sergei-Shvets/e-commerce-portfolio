import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { Provider } from 'react-redux';
import store from './store/store';
import { Cart, CategoryProduct, Home, ProductSingle, Search } from './pages';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <Sidebar />

                    <Routes>
                        {/* Home page route */}
                        <Route path="/" element={<Home />} />
                        {/* Single product route */}
                        <Route path="/product/:id" element={<ProductSingle />} />
                        {/* Category wise product listing route */}
                        <Route path="/category/:category" element={<CategoryProduct />} />
                        {/* Cart */}
                        <Route path="/cart" element={<Cart />} />
                        {/* Searched products */}
                        <Route path="/search/:searchTerm" element={<Search />} />
                    </Routes>

                    <Footer />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
