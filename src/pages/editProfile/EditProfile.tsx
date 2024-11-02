import { Button, Form, FormProps, Input } from 'antd';
import UploadImage from '../../components/uploadImage/UploadImage';
import { useState } from 'react';
import { PUT_USER_PROFILE } from '../../services/api';

type FieldType = {
    name?: string;
    bio?: string;
};

const EditProfile = () => {

    const [imageUrl, setImageUrl] = useState<string>("");

    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        const profileData = {
            name: values.name,
            bio: values.bio,
            profilePicture: imageUrl
        };

        const userId = localStorage.getItem('user');

        try {
            const response = await PUT_USER_PROFILE(userId as string, profileData);
        } catch (error) {

        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="edit-profile-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
                <Form.Item<FieldType>
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Insira seu nome!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Biografia"
                    name="bio"
                    rules={[{ required: true, message: 'Insira uma biografia!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProfile