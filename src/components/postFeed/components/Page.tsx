import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react'
import { POSTS_GET } from '../../../services/api';
import Heart from '../../icons/Heart';
import Comment from '../../icons/Comment';
import CommentsModal from './CommentsModal';
import { PostAttributes } from '../IPostFeed';

interface IPage {
    infinite: boolean;
    page: number;
    setInfinite: (b: boolean) => void;
}

const Page = ({
    infinite,
    page,
    setInfinite
}: IPage) => {

    const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!infinite) return;
        fetchPhotos();
    }, [page]);

    async function fetchPhotos() {
        const total = 6;

        const response = await POSTS_GET(page, total);

        const { data, status } = response;

        setPosts(data);

        // Verifica se veio menos imagens que o total
        // Subentende-se que acabaram as postagens e não precisa mais fazer requisição
        if (response && status == 200 && data.length < total) setInfinite(false);
    }

    if (posts.length > 0) return (
        <>
            {posts.map((post: PostAttributes) => {

                const { user } = post;

                return (
                    <>
                        <div className='card-post-feed'>
                            <span>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <div>
                                    <h4>{user.name}</h4>
                                    <span>Há 3 horas</span>
                                </div>
                            </span>
                            <p>{post.content}</p>
                            {post.imageData && (
                                <img
                                    src={`data:image/jpeg;base64,${post.imageData}`}
                                    alt="Post Image"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                            <div className='post-actions'>
                                <Heart />
                                <Comment setOpen={setOpenCommentsModal} />
                            </div>
                        </div>
                        <CommentsModal open={openCommentsModal} setOpen={setOpenCommentsModal} />
                    </>
                )
            })}
        </>
    )
    else return null;
}

export default Page