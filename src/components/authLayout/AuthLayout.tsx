import { Link } from 'react-router-dom'
import './styles.css';
import { Auth, IAuthLayout } from './IAuthLayout';

const AuthLayout = ({ children, type }: IAuthLayout) => {
    return (
        <div className='login-background'>
            <div className="login-container">
                <div className="login-picture">
                    <div className="login-cover">
                        <div className="logo">
                            <span>TAGS</span>
                        </div>
                        <div className="cover-content">
                            {/* <h2>Share moments</h2> */}
                        </div>
                    </div>
                </div>
                <div className="login-content">
                    <div className='login-card'>
                        <h2 style={{ fontSize: "27px" }}>{type == Auth.LOGIN ? 'Fazer login' : 'Criar uma conta'}</h2>
                        {children}
                        {type == Auth.LOGIN
                            ? <p>Não tem uma conta? <br /> <Link to="/login/criar">Cadastre-se</Link></p>
                            : <p>Já tem uma conta? <br /> <Link to="/login">Faça login</Link></p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout