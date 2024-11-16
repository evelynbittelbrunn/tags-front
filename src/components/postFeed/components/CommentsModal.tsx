import { Avatar, Button, Form, FormProps, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import Comment from '../../comment/Comment';
import TextArea from 'antd/es/input/TextArea';
import CommentIcon from '../../icons/CommentIcon';
import SendIcon from '../../icons/SendIcon';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { POST_COMMENT } from '../../../services/api';

interface ICommentModal {
    postId: string;
    currentUser: string;
}

export type FieldType = {
    comment: string;
};

const CommentsModal = ({ postId, currentUser }: ICommentModal) => {

    const [form] = Form.useForm();

    const [open, setOpen] = useState<boolean>(false);
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSavingComment, setIsSavingComment] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        setIsSavingComment(true);
        form.resetFields();
        console.log(values)

        const commentToSave = {
            userId: currentUser,
            postId: postId,
            content: values.comment
        };

        try {
            const response = await POST_COMMENT(commentToSave);

            if (response.status === 200) {

            }
        } catch (error) {
            console.log(error);
        }


        setIsSavingComment(false);
    };

    const footer = (
        <Spin indicator={<LoadingOutlined />} spinning={isSavingComment} >
            <div className='new-comment-container'>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <Form
                    form={form}
                    name="new-post"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div style={{ position: "relative" }}>
                        <Form.Item
                            name="comment"
                            style={{ margin: 0 }}
                            rules={[{ required: true, message: 'Escreva uma legenda legal para o post :)' }]}
                        >
                            <TextArea
                                placeholder='Escreva algo bacana sobre a postagem'
                                rows={2}
                                style={{ resize: 'none', paddingRight: "50px" }}
                            />
                        </Form.Item>
                        <Form.Item className='submit-comment'>
                            <Button htmlType="submit" type="text" disabled={isSavingComment}>
                                <SendIcon />
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Spin>
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