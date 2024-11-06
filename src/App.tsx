import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
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

function App() {

    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);

    return (
        <div className='app'>
            <BrowserRouter>
                <UserStorage>
                    <div className='body'>
                        <NavBar />
                        <div className='main-container'>
                            <Routes>
                                <Route path="/" element={<Feed />} />
                                <Route path="/login/*" element={<AuthRoutes />} />
                                <Route path="/perfil/:id?" element={<Profile />} />
                                <Route path='/editar-perfil' element={<EditProfile />} />
                            </Routes>
                        </div>
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
                </UserStorage>
            </BrowserRouter>
        </div>
    );
}

export default App;
