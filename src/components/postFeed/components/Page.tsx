import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { POSTS_GET } from '../../../services/api';
import CommentsModal from './CommentsModal';
import { PostAttributes } from '../IPostFeed';
import PostAuthor from './PostAuthor';
import Like from './Like';
import Delete from './Delete';
import Post from './Post';
import { useLocation } from 'react-router-dom';
import NoPosts from './NoPosts';

interface IPage {
    infinite: boolean;
    page: number;
    setInfinite: (b: boolean) => void;
    isLoadingRequest: boolean;
    setIsLoadingRequest: (b: boolean) => void;
    isProfileFeed: boolean;
    getPosts: any
    setAllPosts: any
    allPosts: any
}

const Page = ({
    infinite,
    page,
    setInfinite,
    isLoadingRequest,
    setIsLoadingRequest,
    isProfileFeed,
    getPosts,
    setAllPosts,
    allPosts
}: IPage) => {

    const { pathname } = useLocation();

    const [posts, setPosts] = useState<PostAttributes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!infinite || isLoadingRequest || !token) return;
        setLoading(true)
        setIsLoadingRequest(true);
        fetchPhotos();
    }, [page, token]);

    async function fetchPhotos() {

        const total = 6;

        const response = isProfileFeed ? await getPosts(page, total) : await POSTS_GET(page, total, currentUser as string);

        const { data, status } = response;

        setIsLoadingRequest(false);
        setLoading(false);
        setPosts(data);
        setAllPosts(data);

        // Verifica se veio menos imagens que o total
        // Subentende-se que acabaram as postagens e não precisa mais fazer requisição
        if (response && status == 200 && data.length < total) setInfinite(false);
    }

    if (pathname === '/' && allPosts.length === 0 && loading && infinite) return <div className='full-page-spin'><Spin /></div>
    if (pathname === '/' && allPosts.length === 0 && !loading && !infinite) return <div className='full-page-spin'><NoPosts /></div>
    if (loading) return <div className='spin-container'><Spin /></div>;
    if (posts.length > 0) return (
        <>
            {posts.map((post: PostAttributes) => {

                const { user } = post;

                return (
                    <>
                        <Post
                            post={post}
                            user={user}
                            currentUser={currentUser as string}
                            setPosts={setPosts}
                            setAllPosts={setAllPosts}
                        />
                    </>
                )
            })}
        </>
    )
    else return null;
}

export default Page