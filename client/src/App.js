import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import { PrivateRoute } from "./components/Routes/Private";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { AdminRoute } from "./components/Routes/AdminRoutes";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import Search from "./pages/Search";
import Productdetails from "./pages/Productdetails";
import Categories from "./pages/Categories";
import Categoryproduct from "./pages/Categoryproduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/category/:slug" element={<Categoryproduct/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="product/:slug" element={<Productdetails/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders/>}/>
          <Route path="user/profile" element={<Profile/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path ="admin/products" element={<Products />}/>
          <Route path ="admin/product/:slug" element={<UpdateProducts/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
