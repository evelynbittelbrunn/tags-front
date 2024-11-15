import { Form, FormProps, Modal } from 'antd'
import React, { useState } from 'react'
import Comment from '../../comment/Comment';
import TextArea from 'antd/es/input/TextArea';
import CommentIcon from '../../icons/CommentIcon';

interface ICommentModal {
    open: boolean;
    setOpen: (b: boolean) => void;
}

export type FieldType = {
    comment: string;
};

const CommentsModal = () => {

    const [form] = Form.useForm();

    const [comments, setComments] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {

    };

    const footer = (
        <Form
            form={form}
            name="new-post"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="comment"
                rules={[{ required: true, message: 'Escreva uma legenda legal para o post :)' }]}
            >
                <TextArea
                    placeholder='Escreva algo bacana sobre a postagem'
                    rows={2}
                    style={{ resize: 'none' }}
                />
            </Form.Item>
        </Form>
    );

    return (
        <>
            <CommentIcon setOpen={setOpen} />
            <Modal
                title={<p>Comentários</p>}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
                footer={footer}
            >
                <Comment />
            </Modal>
        </>
    )
}

export default CommentsModal