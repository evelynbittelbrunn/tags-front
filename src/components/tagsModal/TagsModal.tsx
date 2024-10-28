import { Form, FormProps, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { GET_TAGS, POST_TAGS } from '../../services/api';

type FieldType = {
    tags?: string[];
};

interface ITagsModal {
    openTagsModal: boolean;
    setOpenTagsModal: (b: boolean) => void;
}

const TagsModal = ({
    openTagsModal,
    setOpenTagsModal
}: ITagsModal) => {

    const [tagsList, setTagsList] = useState([]);

    const userId = localStorage.getItem('user');
    const [form] = Form.useForm();

    useEffect(() => {
        if (!openTagsModal || userId == null) return;
        loadTags();
    }, [openTagsModal]);

    async function loadTags() {

        try {

            const { data } = await GET_TAGS(userId as string);

            const newList = data.map((tag: any) => {
                return {
                    value: tag.id,
                    label: tag.description,
                    selected: tag.savedByUser
                }
            });

            form.setFieldsValue({
                tags: newList.filter((item: any) => item.selected)
            });

            setTagsList(newList);

        } catch (error) {

        }
    }

    function handleOk() {
        setOpenTagsModal(false);
    };

    function handleCancel() {
        setOpenTagsModal(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        console.log(values);

        try {

            const categoriesToSave = {
                userId: userId,
                categoryIds: values.tags
            };

            const { data } = await POST_TAGS(categoriesToSave);
            // setTagsList(newList);

        } catch (error) {

        }

        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Selecione suas tags"
            open={openTagsModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ htmlType: "submit", form: "new-post" }}
            width={450}
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
                    name="tags"
                    rules={[{ required: true, message: 'Selecione suas tags favoritas ;)', type: 'array' }]}
                >
                    <Select mode="multiple" placeholder="Please select favourite colors">
                        {tagsList.map((tag: any) => {
                            return (
                                <Option key={tag.value} value={tag.value}>{tag.label}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default TagsModal