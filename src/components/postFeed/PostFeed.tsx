import { HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import './styles.css';
import Comment from '../icons/Comment';
import Heart from '../icons/Heart';
import { useState } from 'react';
import CommentsModal from './components/CommentsModal';

export default function PostFeed() {

    const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);

    return (
        <>
            <div className='card-post-feed'>
                <span>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <div>
                        <h4>Alice de Oliveira Gonçalves Amaranto</h4>
                        <span>Há 3 horas</span>
                    </div>
                </span>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className='post-actions'>
                    <Heart />
                    <Comment setOpen={setOpenCommentsModal} />
                </div>
            </div>
            <CommentsModal open={openCommentsModal} setOpen={setOpenCommentsModal} />
        </>
    )
}