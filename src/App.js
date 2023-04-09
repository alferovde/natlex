import "./App.css";
import { Col, Row } from "antd";
import Header from "./components/Header/Header";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import List from "./components/List/List";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<List />} />

          <Route path="list" element={<List />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
