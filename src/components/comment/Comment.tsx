import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import './styles.css'

const Comment = () => {
    return (
        <div className='comment-container'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div>
                <h4>Alice de Oliveira Gonçalves Amaranto</h4>
                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    )
}

export default Comment