import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { IPostAuthor } from '../IPostFeed'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../profilePicture/ProfilePicture'
import TimeAgo from '../../timeAgo/TimeAgo'

const PostAuthor = ({ user, createdAt }: IPostAuthor) => {

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
                <TimeAgo createdAt={createdAt} />
            </div>
        </span>
    )
}

export default PostAuthor