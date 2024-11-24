import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SearchAccounts from './searchAccounts/SearchAccounts';

export default function NavBar() {

    const { userLogout } = useContext(UserContext);

    const content = (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Link to="/perfil"><Button className='dark-hover' type="text">Meu Perfil</Button></Link>
            <Button className='dark-hover' onClick={userLogout} type="text">Sair</Button>
        </div>
    );


    return (
        <div className='navbar-container'>
            <nav>
                <Link to="/" style={{ padding: '0 8px' }}><HomeOutlined /></Link>
                <SearchAccounts />
                <Popover content={content}>
                    <Avatar icon={<UserOutlined />} />
                </Popover>
            </nav>
        </div>
    )
}