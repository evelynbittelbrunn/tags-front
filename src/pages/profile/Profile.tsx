import { useEffect, useState } from 'react';
import { GET_USER_PROFILE, POSTS_BY_USER_GET, POSTS_GET } from '../../services/api';
import { ProfileData } from '../../components/profileInfo/IProfileInfo';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import { useParams } from 'react-router-dom';
import PostFeed from '../../components/postFeed/PostFeed';

const Profile = () => {

    const [profileData, setProfileData] = useState<ProfileData>({} as ProfileData);

    const { id } = useParams();

    const currentUser = localStorage.getItem('user');

    useEffect(() => {
        fetchUserProfile();
    }, [id]);

    async function fetchUserProfile() {

        const userId = id == undefined ? currentUser : id;

        const { data } = await GET_USER_PROFILE(userId as string);

        setProfileData(data);
    }

    async function getPosts(page: number, total: number) {

        const userId = id == undefined ? currentUser : id;

        const response = await POSTS_BY_USER_GET(page, total, userId as string);

        return response;
    }

    return (
        <div>
            <ProfileInfo
                profileData={profileData}
                isCurrentUser={(id == undefined || id === currentUser) ? true : false}
            />
            <PostFeed isProfileFeed={true} getPosts={getPosts} />
        </div>
    )
}

export default Profile