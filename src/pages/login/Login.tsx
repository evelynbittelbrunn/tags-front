import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import { ignore } from 'antd/es/theme/useToken';

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
    remember?: string;
};

const Login = () => {

    const { userLogin, error, loading } = useContext(UserContext)!;

    async function onFinish(data: { email: string; password: string }) {

        const { email, password } = data;

        if (data.email != "" && data.password != "") {
            userLogin(email, password);
        }

    }

    function onFinishFailed() {

    }

    return (
        <div className='login-background'>
            <div className='login-card'>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='form-login'
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/login/criar">Cadastro</Link>
            </div>
        </div>
    )
}

export default Login