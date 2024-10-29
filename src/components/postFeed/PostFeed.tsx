import { HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import './styles.css';
import Comment from '../icons/Comment';
import Heart from '../icons/Heart';
import { useEffect, useState } from 'react';
import CommentsModal from './components/CommentsModal';
import { POSTS_GET } from '../../services/api';

export default function PostFeed() {

    const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
    const [pages, setPages] = useState(0);
    const [infinite, setInfinite] = useState(true);

    console.log(pages);

    useEffect(() => {
        let wait = false;
        function infiniteScroll() {
            if (infinite) {
                // Total de scroll dado
                const scroll = window.scrollY;
                // Total da altura da página
                const height = document.body.offsetHeight - window.innerHeight;
                if (scroll > height * 0.75 && !wait) {
                    setPages((pages) => pages + 1);
                    console.log("+ 6");
                    wait = true;
                    // Timeout para voltar o wait para falso depois de 500 milissegundos
                    // Isso ajuda para a requisição não ser chamada toda hora, pois a condição depende do wait
                    setTimeout(() => {
                        wait = false;
                    }, 500);
                }
            }
        }

        window.addEventListener('wheel', infiniteScroll);
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('wheel', infiniteScroll);
            window.removeEventListener('scroll', infiniteScroll);
        }
    }, [infinite]);

    useEffect(() => {
        if (!infinite) return;
        fetchPhotos();
    }, [pages]);

    async function fetchPhotos() {
        const total = 6;

        const response = await POSTS_GET(pages, total);

        const { data, status } = response;

        // Verifica se veio menos imagens que o total
        // Subentende-se que acabaram as postagens e não precisa mais fazer requisição
        if (response && status == 200 && data.length < total) setInfinite(false);
    }

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