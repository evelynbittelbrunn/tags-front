import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { IPostAuthor } from '../IPostFeed'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../profilePicture/ProfilePicture'

const PostAuthor = ({ user }: IPostAuthor) => {

    const { id, name, profilePicture } = user;

    return (
        <span>
            <ProfilePicture
                profilePicture={profilePicture}
                hasLink={true}
                size={32}
                authorId={id}
            />
            <div>
                <Link to={`/perfil/${id}`}>
                    <h4>{name}</h4>
                </Link>
                <span>Há 3 horas</span>
            </div>
        </span>
    )
}

export default PostAuthor