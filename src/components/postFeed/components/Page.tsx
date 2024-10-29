import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react'
import { POSTS_GET } from '../../../services/api';
import Heart from '../../icons/Heart';
import Comment from '../../icons/Comment';
import CommentsModal from './CommentsModal';

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
            {posts.map(post => {
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
            })}
        </>
    )
    else return null;
}

export default Page