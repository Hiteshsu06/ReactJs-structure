import './App.css';
// utils
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

const Login = lazy(() => import("@pages/LoginPage"));
const Signup = lazy(() => import("@pages/SignupPage"));
const Loading = lazy(() => import("@common/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/Signup" element={<Signup />}/>
        </Routes>
    </Suspense>
  );
}

export default App;
