import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import AuthLayout from '../../components/authLayout/AuthLayout'
import { Button, Form, Input } from 'antd'
import { Auth } from '../../components/authLayout/IAuthLayout';

type FieldType = {
    name?: string;
    password?: string;
    email?: string;
};

const CreateAccount = () => {

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
        <AuthLayout type={Auth.NEW_ACCESS} >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='form-login'
            >
                <div style={{ marginBottom: "25px" }}>
                    <Form.Item<FieldType>
                        label="Nome"
                        name="name"
                        rules={[{ required: true, message: 'Preencha seu nome!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Preencha seu e-mail!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'Preencha sua senha!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button className='submit-login' type="primary" htmlType="submit">
                        Registrar-se
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    )
}

export default CreateAccount