import { useEffect, useState } from 'react';
import { GET_USER_PROFILE } from '../../services/api';
import { ProfileData } from '../../components/profileInfo/IProfileInfo';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';

const Profile = () => {

    const [profileData, setProfileData] = useState<ProfileData>({} as ProfileData);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        const userId = localStorage.getItem('user');

        const { data } = await GET_USER_PROFILE(userId as string);

        setProfileData(data);
    }

    return (
        <div>
            <ProfileInfo profileData={profileData} />
        </div>
    )
}

export default Profile