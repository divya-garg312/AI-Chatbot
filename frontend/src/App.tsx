import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import { Navigate } from "react-router-dom";
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/chat" element={auth?.isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </main>
  );
}

export default App;