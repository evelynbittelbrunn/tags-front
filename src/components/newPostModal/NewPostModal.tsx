import { PlusOutlined } from '@ant-design/icons';
import { Form, FormProps, Modal, Select, SelectProps, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const NewPostModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm();

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
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
                        action="/upload.do"
                        listType="picture-card"
                        maxCount={1}
                        accept="image/png"
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