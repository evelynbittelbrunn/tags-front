import './styles.css';
import { useEffect, useState } from 'react';
import Page from './components/Page';
import { IPostFeed } from './IPostFeed';
import { Spin } from 'antd';

export default function PostFeed({
    isProfileFeed,
    getPosts
}: IPostFeed) {

    const [pages, setPages] = useState<number[]>([1]);
    const [infinite, setInfinite] = useState(true);
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        let wait = false;
        function infiniteScroll() {
            if (infinite) {
                // Total de scroll dado
                const scroll = window.scrollY;
                // Total da altura da página
                const height = document.body.offsetHeight - window.innerHeight;
                if (scroll > height * 0.75 && !wait && !isLoadingRequest) {
                    setPages((pages) => [...pages, pages.length + 1]);
                    wait = true;
                    // Timeout para voltar o wait para falso depois de 500 milissegundos
                    // Isso ajuda para a requisição não ser chamada toda hora, pois a condição depende do wait
                    setTimeout(() => {
                        wait = false;
                    }, 1000);
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

    return (
        <>
            {pages.map(page => (
                <Page
                    infinite={infinite}
                    page={page}
                    setInfinite={setInfinite}
                    isLoadingRequest={isLoadingRequest}
                    setIsLoadingRequest={setIsLoadingRequest}
                    isProfileFeed={isProfileFeed}
                    getPosts={getPosts}
                    allPosts={allPosts}
                    setAllPosts={setAllPosts}
                />
            ))}
        </>
    )
}