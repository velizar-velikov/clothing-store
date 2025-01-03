import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Footer from './components/footer/Footer.jsx';
import CreateProduct from './components/create-product/CreateProduct.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Home from './components/home/Home.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import ProductReviews from './components/product-reviews/ProductReviews.jsx';
import Cart from './components/cart/Cart.jsx';
import EditProduct from './components/edit-product/EditProduct.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';

import PrivateGuard from './components/route-guards/PrivateGuard.jsx';
import GuestGuard from './components/route-guards/GuestGuard.jsx';
import NotFound from './components/not-found/NotFound.jsx';

import paths from './config/paths.js';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AuthContextProvider>
                <CartContextProvider>
                    <Header />
                    <ToastContainer />
                    <main>
                        <Routes>
                            <Route path={paths.home.path} element={<Home />} />
                            {paths.catalog.paths.map((path) => (
                                <Route key={path} path={path} element={<Catalog />} />
                            ))}

                            <Route path={paths.details.path} element={<ProductDetails />} />
                            <Route path={paths.reviews.path} element={<ProductReviews />} />

                            {/* pages only for unauthenticated users */}
                            <Route element={<GuestGuard />}>
                                <Route path={paths.login.path} element={<Login />} />
                                <Route path={paths.register.path} element={<Register />} />
                            </Route>

                            {/* private pages */}
                            <Route element={<PrivateGuard />}>
                                <Route path={paths.createProduct.path} element={<CreateProduct />} />
                                <Route path={paths.editProduct.path} element={<EditProduct />} />
                                <Route path={paths.cart.path} element={<Cart />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </CartContextProvider>
            </AuthContextProvider>
            <Footer />
        </div>
    );
}

export default App;
