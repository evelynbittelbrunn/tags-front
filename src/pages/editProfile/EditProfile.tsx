import { Button, Form, FormProps, Input, Spin } from 'antd';
import UploadImage from '../../components/uploadImage/UploadImage';
import { useEffect, useState } from 'react';
import { GET_USER_PROFILE, PUT_USER_PROFILE } from '../../services/api';
import { Link } from 'react-router-dom';
import ReturnIcon from '../../components/icons/ReturnIcon';
import { useNotification } from '../../contexts/ToastNotificationContext';
import { ProfileData } from '../../components/profileInfo/IProfileInfo';

type FieldType = {
    name?: string;
    bio?: string;
};

const EditProfile = () => {

    const { showNotification } = useNotification();

    const [imageUrl, setImageUrl] = useState<string>("");
    const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [editProfileData, setEditProfileData] = useState<ProfileData>({} as ProfileData);

    const [form] = Form.useForm();

    const currentUser = localStorage.getItem('user');

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        const profileData = {
            name: values.name,
            bio: values.bio,
            profilePicture: imageUrl
        };

        const userId = localStorage.getItem('user');

        try {
            setIsSaving(true);
            const response = await PUT_USER_PROFILE(userId as string, profileData);
            showNotification("Perfil salvo com sucesso!", "success");
            setIsSaving(false);
        } catch (error) {

        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    async function fetchUserProfile() {

        setIsFetchingData(true);
        const { data } = await GET_USER_PROFILE(currentUser as string, currentUser as string);

        form.setFieldsValue({
            name: data.name,
            bio: data.bio
        });

        setImageUrl(data.profilePicture && `data:image/jpeg;base64,${data.profilePicture}`);
        setEditProfileData(data);
        setIsFetchingData(false);
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (isFetchingData) return <div className='full-page-spin'><Spin /></div>;
    return (
        <div style={{ paddingTop: '10px' }}>
            <Link to="/perfil"><ReturnIcon /></Link>
            <Form
                name="edit-profile-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                style={{ textAlign: 'center' }}
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
                        <Link to="/perfil"><Button>Cancelar</Button></Link>
                        <Button type="primary" htmlType="submit" loading={isSaving}>
                            Salvar alterações
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProfile