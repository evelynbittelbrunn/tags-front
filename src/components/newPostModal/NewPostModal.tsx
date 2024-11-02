import { PlusOutlined } from '@ant-design/icons';
import { Form, FormProps, message, Modal, Select, SelectProps, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react'
import { NEW_POST } from '../../services/api';
import "./styles.css"

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

type Image = {
    photo: any;
    imageBase64: string;
}

interface INewPostModal {
    openNewPostModal: boolean;
    setOpenNewPostModal: (b: boolean) => void;
}

const NewPostModal = ({
    openNewPostModal,
    setOpenNewPostModal
}: INewPostModal) => {

    const [newImage, setNewImage] = useState<Image>({} as Image);
    const [form] = Form.useForm();

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const showModal = () => {
        setOpenNewPostModal(true);
    };

    const handleOk = () => {
        setOpenNewPostModal(false);
    };

    const handleCancel = () => {
        setOpenNewPostModal(false);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {

        const userId = localStorage.getItem('user');

        const newPost = {
            userId: userId,
            content: values.postContent,
            imageUrl: newImage.imageBase64
        };

        try {
            const response = await NEW_POST(newPost);
            // setData(response.data);
            // setLogin(true);
        } catch (error) {

        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Modal
            title="Nova Postagem"
            open={openNewPostModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ htmlType: "submit", form: "new-post" }}
        >
            <Form
                form={form}
                name="new-post"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ height: "102px" }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name="upload"
                >
                    <Upload
                        beforeUpload={(file) => {
                            const isImage =
                                file.type === 'image/jpeg' ||
                                file.type === 'image/png' ||
                                file.type === 'image/jpg';

                            if (!isImage) {
                                message.error('Você só pode fazer upload de arquivos JPG/PNG.');
                                return Upload.LIST_IGNORE;
                            }

                            const maxFileSize = 5 * 1024 * 1024;
                            if (file.size > maxFileSize) {
                                message.error('O tamanho da imagem não pode exceder 5 MB.');
                                return Upload.LIST_IGNORE;
                            }

                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                setNewImage({
                                    photo: file,
                                    imageBase64: reader.result as string,
                                });
                            };
                            reader.onerror = () => {
                                message.error('Erro ao ler o arquivo.');
                            };

                            return false;
                        }}
                        listType="picture-card"
                        accept="image/png"
                        maxCount={1}
                        fileList={newImage.photo ? [newImage.photo] : []}
                        onRemove={() =>
                            setNewImage({ photo: null, imageBase64: '' })
                        }
                    >
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item style={{ height: "98px" }} name="postContent" >
                    <TextArea placeholder='Compartilhe suas ideias, fotos ou histórias...' rows={4} />
                </Form.Item>

                <Form.Item style={{ height: "50px" }} name="selectedTags">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Defina as tags da sua postagem"
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewPostModal