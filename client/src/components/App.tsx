import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { AuthProvider } from "../context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
