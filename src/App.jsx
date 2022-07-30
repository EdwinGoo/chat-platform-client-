import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";

import { Routes, Route } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <div className="container">
        <header id="header">HeaD wrapper</header>
        <main>
          <Routes>
            <Route path="dashboard" element={<NotFoundPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="autoanswer" element={<NotFoundPage />} />
          </Routes>
        </main>
        <div id="sidebar">
          <Sidebar />
        </div>
        {/* <footer>Footer</footer> */}
      </div>
    </>
  );
}

export default App;
