import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Feed from './pages/feed/Feed';
import NavBar from './components/navBar/NavBar';

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <NavBar />
                <div className='main-container'>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
