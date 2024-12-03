import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GET_ACCOUNTS } from '../../services/api';
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import './styles.css';
import { Spin } from 'antd';

interface SearchResult {
    id: string;
    bio: string;
    name: string;
    profilePicture: string;
}

const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [userList, setUserList] = useState<SearchResult[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const query = searchParams.get('query');

    const fetchResults = async (pageToFetch: number, resetList = false) => {

        if (!query || loading || (!resetList && !hasMore)) return;

        setLoading(true);
        try {
            const { data } = await GET_ACCOUNTS(pageToFetch, 6, query as string);

            setUserList((prevResults) =>
                resetList ? data : [...prevResults, ...data]
            );

            if (data.length < 6) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            setUserList([]);
            setPage(1);
            setHasMore(true);
            fetchResults(1, true);
        }
    }, [query]);

    useEffect(() => {
        if (page > 1) {
            fetchResults(page);
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
                !loading &&
                hasMore
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    return (
        <div id="search-page">
            <h3>🔎 Resultados para: "{query || '...'}</h3>
            {userList.map((user) => (
                <div key={user.id} className="user-account-container">
                    <ProfilePicture
                        profilePicture={user.profilePicture}
                        hasLink={true}
                        size={50}
                        authorId={user.id}
                    />
                    <div>
                        <Link to={`/perfil/${user.id}`}>
                            <h4>{user.name}</h4>
                        </Link>
                        {user.bio}
                    </div>
                </div>
            ))}
            {loading && <div className="spin-container"><Spin /></div>}
            {!hasMore && <div className="spin-container"><p>Não há mais resultados.</p></div>}
        </div>
    );
};

export default SearchResults;
