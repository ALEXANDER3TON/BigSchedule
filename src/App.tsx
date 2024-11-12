import { Route, Routes } from "react-router-dom";
import "./App.css";
import Frame from "./Components/Frame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Frame />} />
    </Routes>
  );
}

export default App;
