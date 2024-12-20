import { Form, FormProps, Modal, Select, Spin } from 'antd'
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { GET_TAGS, POST_TAGS } from '../../services/api';
import { useNotification } from '../../contexts/ToastNotificationContext';
import { useFeedContext } from '../../contexts/FeedContext';
import { LoadingOutlined } from '@ant-design/icons';

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

    const { showNotification } = useNotification();
    const { refreshFeed } = useFeedContext();

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tagsList, setTagsList] = useState([]);
    const userId = localStorage.getItem('user');
    const [formTags] = Form.useForm();

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

            formTags.setFieldsValue({
                tags: newList.filter((item: any) => item.selected)
            });

            setTagsList(newList);

            setIsLoading(false);

        } catch (error) {

        }
    }

    function handleCancel() {
        setOpenTagsModal(false);
    };

    const onFinishTags: FormProps<FieldType>['onFinish'] = async (values) => {

        setIsSaving(true);

        try {

            const categoriesToSave = {
                userId: userId,
                categoryIds: values.tags
            };

            const { data } = await POST_TAGS(categoriesToSave);
            showNotification(data, "success");
            setOpenTagsModal(false);
            setIsSaving(false);
            refreshFeed();
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
            onCancel={handleCancel}
            okButtonProps={{ loading: isSaving, htmlType: "submit", form: "tags-form" }}
            width={450}
        >
            <Form
                form={formTags}
                name="tags-form"
                initialValues={{ remember: true }}
                onFinish={onFinishTags}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Spin indicator={<LoadingOutlined spin />} spinning={isLoading} >
                    <Form.Item
                        name="tags"
                        rules={[{ required: true, message: 'Selecione suas tags favoritas ;)', type: 'array' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Selecione as tags que tem interesse"
                            showSearch
                            options={tagsList}
                            loading={isLoading}
                            filterOption={(input, option: any) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Spin>
            </Form>
        </Modal >
    )
}

export default TagsModal