import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Feed from './pages/feed/Feed';
import NavBar from './components/navBar/NavBar';
import Profile from './pages/profile/Profile';
import AuthRoutes from './routes/AuthRoutes';
import UserStorage from './contexts/UserContext';
import EditProfile from './pages/editProfile/EditProfile';
import FloatButtonMenu from './components/floatButtonMenu/FloatButtonMenu';
import NewPostModal from './components/newPostModal/NewPostModal';
import { useState } from 'react';
import TagsModal from './components/tagsModal/TagsModal';
import ProtectedRoute from './routes/ProtectedRoute';
import { NotificationProvider } from './contexts/ToastNotificationContext';
import { FeedProvider } from './contexts/FeedContext';
import SearchResults from './pages/searchResults/SearchResults';

function App() {

    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);

    const location = useLocation();
    const isLoginRoute = location.pathname.startsWith('/login');

    return (
        <UserStorage>
            <div className='app'>
                {isLoginRoute ? (
                    <Routes>
                        <Route path="/login/*" element={<AuthRoutes />} />
                    </Routes>
                ) : (
                    <NotificationProvider>
                        <FeedProvider>
                            <div className='main-container'>
                                <NavBar />
                                {/* <div className='main-container'> */}
                                <Routes>
                                    <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                                    <Route path="/perfil/:id?" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                    <Route path='/editar-perfil' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                                    <Route path='/search' element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
                                </Routes>
                                {/* </div> */}
                                <FloatButtonMenu
                                    setOpenNewPostModal={setOpenNewPostModal}
                                    setOpenTagsModal={setOpenTagsModal}
                                />
                                <TagsModal
                                    openTagsModal={openTagsModal}
                                    setOpenTagsModal={setOpenTagsModal}
                                />
                                <NewPostModal
                                    openNewPostModal={openNewPostModal}
                                    setOpenNewPostModal={setOpenNewPostModal}
                                />
                            </div>
                        </FeedProvider>
                    </NotificationProvider>
                )}
            </div >
        </UserStorage>
    );
}

export default App;
