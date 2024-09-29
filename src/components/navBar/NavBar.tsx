import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css';

export default function NavBar() {

    const content = (
        <div>Teste</div>
    );


    return (
        <div className='navbar-container'>
            <nav>
                <Link to="/"><HomeOutlined /></Link>

                <Popover content={content} title="Title" trigger="click">
                    <Avatar icon={<UserOutlined />} />
                </Popover>
            </nav>
        </div>
    )
}