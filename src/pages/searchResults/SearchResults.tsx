import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GET_ACCOUNTS } from '../../services/api';
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import './styles.css';

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

    const fetchResults = async (pageToFetch: number) => {
        if (!query || loading || !hasMore) return;

        setLoading(true);
        try {
            const { data } = await GET_ACCOUNTS(pageToFetch, 10, query);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setUserList((prevResults) => [...prevResults, ...data]);
            }
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchResults(page);
        }
    }, [query, page]);

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
            <h3>🔎 Resultados para: "{query}"</h3>
            {userList.map((user) => (
                <div key={user.id} className='user-account-container' >
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
            {loading && <p>Carregando mais resultados...</p>}
            {!hasMore && <p>Não há mais resultados.</p>}
        </div>
    );
};

export default SearchResults;
