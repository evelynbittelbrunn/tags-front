import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover } from 'antd'
import './styles.css'
import { CommentAttributes } from '../postFeed/IPostFeed'
import RemoveIcon from '../icons/RemoveIcon';
import TreeDotsIcon from '../icons/TreeDotsIcon';
import ProfilePicture from '../profilePicture/ProfilePicture';

interface IComment {
    comment: CommentAttributes;
}

const Comment = ({ comment }: IComment) => {

    const { id, content, user } = comment;

    const popOverContent = (
        <Button type="text" danger>Excluir</Button>
    )

    function confirm() {

    }

    return (
        <div className='comment-container'>
            <ProfilePicture
                profilePicture={user.profilePicture}
                hasLink={true}
                size={32}
                authorId={user.id}
            />
            <div>
                <div className='comment-author-name'>
                    <h4>{user.name}</h4>
                    <div>
                        <Popover content={popOverContent} trigger="click" placement="bottomRight">
                            <Button type="text"><TreeDotsIcon /></Button>
                        </Popover>
                    </div>
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Comment