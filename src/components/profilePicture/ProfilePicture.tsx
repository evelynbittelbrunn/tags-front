import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';

interface IProfilePicture {
    profilePicture: string | null;
    hasLink: boolean;
    size: number;
    authorId?: string;
}

const ProfilePicture = ({ profilePicture, hasLink, size, authorId }: IProfilePicture) => {

    const picture = ((profilePicture != null && profilePicture != "")
        ? <img
            style={{ width: `${size}px`, height: `${size}px` }}
            src={`data:image/jpeg;base64,${profilePicture}`}
            alt="Foto de Perfil"
            className="profile-picture"></img>
        : <Avatar size={size} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />)

    return (
        <>
            {hasLink ? <Link to={`/perfil/${authorId}`}>{picture}</Link> : picture}
        </>
    )
}

export default ProfilePicture