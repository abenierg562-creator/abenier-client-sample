import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { TelegramProvider } from "@/context/TelegramContext";
import BottomNav from "@/components/BottomNav";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyOrders from "./pages/MyOrders";
import DeliveryInfo from "./pages/DeliveryInfo";
import StoreSupport from "./pages/StoreSupport";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TelegramProvider>
        <CartProvider>
          <FavoritesProvider>
            <Sonner position="top-center" />
            <BrowserRouter>
              <div className="max-w-lg mx-auto min-h-screen bg-background relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/delivery-info" element={<DeliveryInfo />} />
                  <Route path="/support" element={<StoreSupport />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <BottomNav />
              </div>
            </BrowserRouter>
          </FavoritesProvider>
        </CartProvider>
      </TelegramProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
