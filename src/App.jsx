import { useUserStore } from "./store/useUserStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/chat/Chat";
import ManageChatbot from "./components/chatbot/ManageChatbot";
import Users from "./components/users/Users";
import Sidebar from "./components/sidebar/Sidebar";
import NotFoundPage from "./pages/NotFoundPage";
import Forbidden from "./pages/Forbidden";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import LoginForm from "./components/login/LoginForm";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  const { userInfo } = useUserStore();

  return (
    <>
      {!userInfo ? (
        <div className="a_container">
          <header id="header">
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="login" element={<LoginForm />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="b_container">
          <header id="header">
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="chat" element={<Chat />} />
              <Route path="autoanswer" element={<ManageChatbot />} />
              <Route path="users" element={<Users />} />
              <Route path="401" element={<UnauthorizedPage />} />
              <Route path="403" element={<Forbidden />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/chat" />} />
            </Routes>
          </main>
          <div id="sidebar">
            <Sidebar />
          </div>
          {/* <footer>Footer</footer> */}
        </div>
      )}
    </>
  );
}
export default App;
