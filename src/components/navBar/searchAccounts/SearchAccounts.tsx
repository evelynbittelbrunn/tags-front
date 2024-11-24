import { Form, Input } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../icons/SearchIcon';
const { Search } = Input;

const SearchAccounts = () => {
    const navigate = useNavigate();

    const onFinish = (values: { query: string }) => {
        const { query } = values;
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <Form onFinish={onFinish} layout="inline">
            <Form.Item
                name="query"
            >
                <Search
                    placeholder="Busque por usuários"
                    enterButton={<SearchIcon />}
                    onSearch={(value) => onFinish({ query: value })}
                />
            </Form.Item>
        </Form>
    );
}

export default SearchAccounts