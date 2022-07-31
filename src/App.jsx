import LoginForm from "./components/login/LoginForm";
import { useUserStore } from "./store/useUserStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  const { userInfo } = useUserStore();
  return (
    <>
      {!userInfo ? (
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <div className="container">
          <header id="header">HeaD wrapper</header>
          <main>
            <Routes>
              <Route path="dashboard" element={<NotFoundPage />} />
              <Route path="chat" element={<Chat />} />
              <Route path="autoanswer" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route
                path="/login"
                element={<Navigate replace to="/dashboard" />}
              />
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
