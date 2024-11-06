import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import { IPostAuthor } from '../IPostFeed'
import { Link } from 'react-router-dom'

const PostAuthor = ({ user }: IPostAuthor) => {

    const { id, name, profilePicture } = user;

    return (
        <span>
            <Link to={`/perfil/${id}`}>
                {(profilePicture != null && profilePicture != "")
                    ? <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Foto de Perfil" className="author-image"></img>
                    : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                }
            </Link>
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