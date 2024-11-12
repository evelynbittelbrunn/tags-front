import { PlusOutlined } from '@ant-design/icons';
import { Form, FormProps, message, Modal, Select, SelectProps, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react'
import { GET_TAGS, NEW_POST } from '../../services/api';
import "./styles.css"
import { FieldType, Image, INewPostModal } from './INewPostModal';

const NewPostModal = ({
    openNewPostModal,
    setOpenNewPostModal
}: INewPostModal) => {

    const [newImage, setNewImage] = useState<Image>({} as Image);
    const [tagsList, setTagsList] = useState([]);
    const userId = localStorage.getItem('user');
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

    const handleOk = async () => {
        try {
            await form.validateFields();
            setOpenNewPostModal(false);
        } catch (error) {
            console.error("Erro na validação dos campos:", error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
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
            imageUrl: newImage.imageBase64,
            categoryIds: values.selectedTags
        };

        try {
            const response = await NEW_POST(newPost);
        } catch (error) {
            console.log(error);
        }

        form.resetFields();
    };

    useEffect(() => {
        if (!openNewPostModal || userId == null) return;
        loadTags();
    }, [openNewPostModal]);

    async function loadTags() {

        try {

            const { data } = await GET_TAGS(userId as string);

            const newList = data.map((tag: any) => {
                return {
                    value: tag.id,
                    label: tag.description
                }
            });

            form.setFieldsValue({
                tags: newList.filter((item: any) => item.selected)
            });

            setTagsList(newList);

        } catch (error) {

        }
    }

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
                <Form.Item
                    style={{ height: "98px" }}
                    name="postContent"
                    rules={[{ required: true, message: 'Escreva uma legenda legal para o post :)' }]}
                >
                    <TextArea placeholder='Compartilhe suas ideias, fotos ou histórias...' rows={4} />
                </Form.Item>

                <Form.Item
                    style={{ height: "50px" }}
                    name="selectedTags"
                    rules={[{ required: true, message: 'Selecione as tags que combinam com esse post', type: 'array' }]}
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Defina as tags da sua postagem"
                        options={tagsList}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewPostModal