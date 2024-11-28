import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover } from 'antd'
import './styles.css'
import { CommentAttributes } from '../postFeed/IPostFeed'
import TreeDotsIcon from '../icons/TreeDotsIcon';
import ProfilePicture from '../profilePicture/ProfilePicture';
import { useState } from 'react';
import { DELETE_COMMENT } from '../../services/api';
import { Link } from 'react-router-dom';

interface IComment {
    comment: CommentAttributes;
    currentUser: string;
    setComments: React.Dispatch<React.SetStateAction<CommentAttributes[]>>;
    setTotalComments: any;
}

const Comment = ({ comment, currentUser, setComments, setTotalComments }: IComment) => {

    const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);

    const { id, content, user } = comment;

    const popOverContent = (
        <Button className='dark-hover' type="text" onClick={() => deleteComment(id)} danger disabled={isDeletingComment}>Excluir</Button>
    )

    async function deleteComment(commentId: string) {
        try {
            setIsDeletingComment(true);
            const response = await DELETE_COMMENT(commentId);
            if (response.status === 200) {
                setComments((prev: CommentAttributes[]) =>
                    prev.filter((comment: CommentAttributes) => comment.id !== commentId)
                );
                setIsDeletingComment(false);
                setTotalComments((prev: number) => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
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
                    <Link to={`/perfil/${user.id}`}>
                        <h4>{user.name}</h4>
                    </Link>
                    {user.id === currentUser &&
                        <div>
                            <Popover content={popOverContent} trigger="click" placement="bottomRight">
                                <Button type="text" className='dark-hover' aria-label="tree dots icon"><TreeDotsIcon /></Button>
                            </Popover>
                        </div>
                    }
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Comment