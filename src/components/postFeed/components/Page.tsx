import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { POSTS_GET } from '../../../services/api';
import Comment from '../../icons/Comment';
import CommentsModal from './CommentsModal';
import { PostAttributes } from '../IPostFeed';
import PostAuthor from './PostAuthor';
import Like from './Like';
import Delete from './Delete';

interface IPage {
    infinite: boolean;
    page: number;
    setInfinite: (b: boolean) => void;
    isLoadingRequest: boolean;
    setIsLoadingRequest: (b: boolean) => void;
    isProfileFeed: boolean;
    getPosts: any
}

const Page = ({
    infinite,
    page,
    setInfinite,
    isLoadingRequest,
    setIsLoadingRequest,
    isProfileFeed,
    getPosts
}: IPage) => {

    const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = localStorage.getItem('user');

    useEffect(() => {
        if (!infinite || isLoadingRequest) return;
        setLoading(true)
        setIsLoadingRequest(true);
        fetchPhotos();
    }, [page]);

    async function fetchPhotos() {

        const total = 6;

        const response = isProfileFeed ? await getPosts(page, total) : await POSTS_GET(page, total, currentUser as string);

        const { data, status } = response;

        setIsLoadingRequest(false);
        setLoading(false);
        setPosts(data);

        // Verifica se veio menos imagens que o total
        // Subentende-se que acabaram as postagens e não precisa mais fazer requisição
        if (response && status == 200 && data.length < total) setInfinite(false);
    }

    if (loading) return <Spin indicator={<LoadingOutlined spin />} size="small" />;
    if (posts.length > 0) return (
        <>
            {posts.map((post: PostAttributes) => {

                const { user } = post;

                return (
                    <>
                        <div key={post.id} className='card-post-feed'>
                            <div className='post-header'>
                                <PostAuthor user={user} />
                                <Delete />
                            </div>
                            <p>{post.content}</p>
                            {post.imageData && (
                                <img
                                    src={`data:image/jpeg;base64,${post.imageData}`}
                                    alt="Post Image"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                            <div className='post-actions'>
                                <Like
                                    isLiked={post.isLiked}
                                    currentUserId={currentUser as string}
                                    postId={post.id}
                                />
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