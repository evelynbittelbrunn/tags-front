import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { Link } from 'react-router-dom';
import './styles.css';
import Add from '../icons/Add';
import Send from '../icons/Send';
import Edit from '../icons/Edit';
import { IProfileInfo } from './IProfileInfo';
import { POST_FOLLOW } from '../../services/api';
import { useEffect, useState } from 'react';

const ProfileInfo = ({ profileData, isCurrentUser, otherUserId }: IProfileInfo) => {

    const { name, bio, profilePicture, following } = profileData;

    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const handleFollowUser = async () => {
        setIsLoadingButton(true);
        try {

            const currentUser = localStorage.getItem("user");

            const response = await POST_FOLLOW(currentUser as string, otherUserId as string);

            if (response.status == 200) {
                setIsFollowing(prev => !prev);
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
        if (following === undefined) return;
        setIsFollowing(following);
    }, [following]);

    return (
        <div className={`profile-container ${isCurrentUser && 'profile-grid-current-user'}`}>
            {(profilePicture != "" && profilePicture !== null)
                ? <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Foto de Perfil" className="profile-image"></img>
                : <Avatar size={115} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            }
            <div className='profile-content'>
                <h3>{name}</h3>
                <span><b>220</b> seguidores</span><span><b>120</b> seguindo</span>
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
                            className={isFollowing ? "following-button" : ""}
                        >
                            <Add />{isFollowing ? "Seguindo" : "Seguir"}
                        </Button>
                        <Button type="primary" disabled className='disabled-button'><Send />Conversar</Button>
                    </div>
                }
            </div>
            {isCurrentUser &&
                <span className='button-settings'>
                    <Link to="/editar-perfil"><Edit /></Link>
                </span>
            }
        </div>
    )
}

export default ProfileInfo