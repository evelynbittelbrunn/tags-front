import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext';
import AuthLayout from '../../components/authLayout/AuthLayout'
import { Button, Form, Input } from 'antd'
import { Auth } from '../../components/authLayout/IAuthLayout';
import { REGISTER_POST } from '../../services/api';
import { PoweroffOutlined, UserAddOutlined } from '@ant-design/icons';

type FieldType = {
    name?: string;
    password?: string;
    email?: string;
};

const CreateAccount = () => {

    const { userLogin, error, loading } = useContext(UserContext)!;

    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    async function onFinish({ name, email, password }: { name: string; email: string; password: string }) {
        if (Object.values({ name, email, password }).some(field => !field)) {
            console.error("Todos os campos devem ser preenchidos.");
            return;
        }
        try {
            setIsRegistering(true);
            const response = await REGISTER_POST({ name, email, password, role: "USER" });

            if (response.status === 200) {
                await userLogin(email, password);
                if (!loading) setIsRegistering(false);
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
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
                    <Button
                        className='submit-login'
                        type="primary"
                        htmlType="submit"
                        icon={<UserAddOutlined />}
                        loading={isRegistering}
                    >
                        Registrar-se
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    )
}

export default CreateAccount