import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom';
import './styles.css';
import { IProfileInfo } from './IProfileInfo';
import { POST_FOLLOW } from '../../services/api';
import { useEffect, useState } from 'react';
import AddIcon from '../icons/AddIcon';
import EditIcon from '../icons/EditIcon';
import SendIcon from '../icons/SendIcon';
import ProfilePicture from '../profilePicture/ProfilePicture';

const ProfileInfo = ({
    profileData,
    isCurrentUser,
    otherUserId,
    totalFollowers,
    setTotalFollowers,
    isLoadingUserData
}: IProfileInfo) => {

    const { name, bio, profilePicture, isFollowing, followingCount } = profileData;

    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
    const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false);

    const handleFollowUser = async () => {
        setIsLoadingButton(true);
        try {

            const currentUser = localStorage.getItem("user");

            const response = await POST_FOLLOW(currentUser as string, otherUserId as string);

            if (response.status == 200) {

                const { data } = response;

                const total = data.isFollowing ? totalFollowers + 1 : totalFollowers - 1;

                setTotalFollowers(total);
                setIsFollowingUser(data.isFollowing);
            } else {
                const error = await response.statusText;
                console.error("Erro:", error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
        setIsLoadingButton(false)
    };

    useEffect(() => {
        if (isFollowing === undefined) return;
        setIsFollowingUser(isFollowing);
    }, [isFollowing]);

    return (
        <Skeleton loading={isLoadingUserData} >
            <div className={`profile-container ${isCurrentUser && 'profile-grid-current-user'}`}>
                <ProfilePicture
                    profilePicture={profilePicture}
                    hasLink={false}
                    size={115}
                />
                <div className='profile-content'>
                    <h3>{name}</h3>
                    <span><b>{totalFollowers}</b> {totalFollowers > 1 ? 'seguidores' : 'seguidor'}</span><span><b>{followingCount}</b> seguindo</span>
                    <p>{bio}</p>
                    {/* <div className='profile-tags'>
                    <h4>Tags do perfil:</h4>
                    <div>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Natureza</span>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Româmtica</span>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Divertida</span>
                    </div>
                </div> */}
                    {!isCurrentUser &&
                        <div className='profile-buttons'>
                            <Button
                                type="primary"
                                onClick={handleFollowUser}
                                loading={isLoadingButton}
                                className={isFollowingUser ? "following-button" : ""}
                            >
                                <AddIcon />{isFollowingUser ? "Seguindo" : "Seguir"}
                            </Button>
                            <Button type="primary" disabled className='disabled-button'><SendIcon />Conversar</Button>
                        </div>
                    }
                </div>
                {isCurrentUser &&
                    <span className='button-settings'>
                        <Link to="/editar-perfil"><EditIcon /></Link>
                    </span>
                }
            </div>
        </Skeleton>
    )
}

export default ProfileInfo