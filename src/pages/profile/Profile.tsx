import { useEffect } from 'react';
import Info from './components/Info';
import './styles.css';
import { GET_USER_PROFILE } from '../../services/api';

const Profile = () => {

    useEffect(() => {

        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        const userId = localStorage.getItem('user');

        const response = await GET_USER_PROFILE(userId as string);

        console.log(response);
    }

    return (
        <div>
            <Info />
        </div>
    )
}

export default Profile