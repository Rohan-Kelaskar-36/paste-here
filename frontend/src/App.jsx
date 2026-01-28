import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
