import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPaste from "./pages/ViewPaste";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <HashRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
