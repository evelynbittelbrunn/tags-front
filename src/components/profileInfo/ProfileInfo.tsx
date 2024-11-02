import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { Link } from 'react-router-dom';
import './styles.css';
import Add from '../icons/Add';
import Send from '../icons/Send';
import Edit from '../icons/Edit';
import { IProfileInfo } from './IProfileInfo';

const ProfileInfo = ({ profileData }: IProfileInfo) => {

    const { name, bio, profilePicture } = profileData;

    return (
        <div className='profile-container'>
            {profilePicture != ""
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
                <div className='profile-buttons'>
                    <Button type="primary"><Add />Seguir</Button>
                    <Button type="primary" disabled><Send />Conversar</Button>
                </div>
            </div>
            <span className='button-settings'>
                <Link to="/editar-perfil"><Edit /></Link>
            </span>
        </div>
    )
}

export default ProfileInfo