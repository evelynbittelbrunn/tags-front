import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import './styles.css'
import { CommentAttributes } from '../postFeed/IPostFeed'

interface IComment {
    comment: CommentAttributes;
}

const Comment = ({ comment }: IComment) => {

    const { id, content, user } = comment;

    return (
        <div className='comment-container'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div>
                <h4>{user.name}</h4>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Comment