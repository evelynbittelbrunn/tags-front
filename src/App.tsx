import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Feed from './pages/feed/Feed';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Feed />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
