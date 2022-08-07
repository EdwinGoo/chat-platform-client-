import { useUserStore } from "./store/useUserStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import LoginForm from "./components/login/LoginForm";
import "./App.css";

function App() {
  const { userInfo } = useUserStore();

  return (
    <>
      {!userInfo ? (
        <div className="a_container">
          <header id="header">HeaD wrapper</header>
          <main>
            <Routes>
              <Route path="login" element={<LoginForm />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="b_container">
          <header id="header">HeaD wrapper</header>
          <main>
            <Routes>
              <Route path="dashboard" element={<NotFoundPage />} />
              <Route path="chat" element={<Chat />} />
              <Route path="autoanswer" element={<NotFoundPage />} />
              <Route path="401" element={<UnauthorizedPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" />} />
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
