import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
