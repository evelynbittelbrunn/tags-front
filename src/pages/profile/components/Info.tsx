import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import './../styles.css';

const Info = () => {
    return (
        <div className='profile-container'>
            <Avatar size={115} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div className='profile-content'>
                <h3>Alana Moreno</h3>
                <span><b>220</b> seguidores</span><span><b>120</b> seguindo</span>
                <p>Olá, eu sou a Alana, amante da natureza e afins</p>
                <div className='profile-tags'>
                    <h4>Tags do perfil:</h4>
                    <div>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Natureza</span>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Româmtica</span>
                        <span style={{ borderRadius: "15px", backgroundColor: "#267409", padding: "2px 12px" }}>Divertida</span>
                    </div>
                </div>
                <div className='profile-buttons'>
                    <Button type="primary">
                        <svg width={15} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Seguir
                    </Button>
                    <Button type="primary">
                        <svg width={15} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        Conversar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Info