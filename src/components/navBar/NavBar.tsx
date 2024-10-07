import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css';

export default function NavBar() {

    const content = (
        <div>
            <Link to="/perfil"><Button type="text">Meu Perfil</Button></Link>
        </div>
    );


    return (
        <div className='navbar-container'>
            <nav>
                <Link to="/"><HomeOutlined /></Link>

                <Popover content={content} trigger="click">
                    <Avatar icon={<UserOutlined />} />
                </Popover>
            </nav>
        </div>
    )
}