import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import { IPostAuthor } from '../IPostFeed'

const PostAuthor = ({ user }: IPostAuthor) => {

    const { id, name, profilePicture } = user;

    return (
        <span>
            {(profilePicture != null && profilePicture != "")
                ? <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Foto de Perfil" className="author-image"></img>
                : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            }
            <div>
                <h4>{user.name}</h4>
                <span>Há 3 horas</span>
            </div>
        </span>
    )
}

export default PostAuthor