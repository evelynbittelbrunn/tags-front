import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Feed from './pages/feed/Feed';
import NavBar from './components/navBar/NavBar';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import CreateAccount from './pages/createAccount/CreateAccount';
import AuthRoutes from './routes/AuthRoutes';
import UserStorage from './contexts/UserContext';

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <UserStorage>
                    <NavBar />
                    <div className='main-container'>
                        <Routes>
                            <Route path="/" element={<Feed />} />
                            <Route path="/login/*" element={<AuthRoutes />} />
                            <Route path="/perfil" element={<Profile />} />
                        </Routes>
                    </div>
                </UserStorage>
            </BrowserRouter>
        </div>
    );
}

export default App;
