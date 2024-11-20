import { Avatar, Button, Form, FormProps, Modal, Skeleton, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Comment from '../../comment/Comment';
import TextArea from 'antd/es/input/TextArea';
import CommentIcon from '../../icons/CommentIcon';
import SendIcon from '../../icons/SendIcon';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { GET_COMMENT, POST_COMMENT } from '../../../services/api';
import { CommentAttributes } from '../IPostFeed';

interface ICommentModal {
    postId: string;
    currentUser: string;
    totalComments: number;
    setTotalComments: any;
}

export type FieldType = {
    comment: string;
};

const CommentsModal = ({ postId, currentUser, totalComments, setTotalComments }: ICommentModal) => {

    const [open, setOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentAttributes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSavingComment, setIsSavingComment] = useState<boolean>(false);
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        setIsSavingComment(true);
        form.resetFields();

        const commentToSave = {
            userId: currentUser,
            postId: postId,
            content: values.comment
        };

        try {
            const response = await POST_COMMENT(commentToSave);
            if (response.status === 200) {
                setComments(prev => [response.data, ...prev]);
                setTotalComments((prev: number) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }

        setIsSavingComment(false);
    };

    useEffect(() => {

        setLoading(true);

        const fetchComments = async () => {
            try {
                const { data } = await GET_COMMENT(postId);
                setComments(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar comentários', error);
            }
        };

        if (!open) return;
        fetchComments();
    }, [open]);

    const footer = (
        <Spin indicator={<LoadingOutlined />} spinning={isSavingComment} >
            <div className='new-comment-container'>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <Form
                    form={form}
                    name="new-comment"
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
                            <Button className='dark-hover' htmlType="submit" type="text" disabled={isSavingComment}>
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
            <div>
                <CommentIcon setOpen={setOpen} />
                <span>{totalComments}</span>
            </div>
            <Modal
                title={<p>Comentários</p>}
                loading={loading}
                open={open}
                onCancel={() => {
                    setOpen(false);
                    setComments([]);
                }}
                footer={footer}
                className='comment-modal'
            >
                {comments.map((comment: CommentAttributes) => {
                    return (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            currentUser={currentUser}
                            setComments={setComments}
                            setTotalComments={setTotalComments}
                        />
                    )
                })}
                {loading &&
                    <>
                        <Skeleton loading={loading} active avatar />
                        <Skeleton loading={loading} active avatar />
                        <Skeleton loading={loading} active avatar />
                        <Skeleton loading={loading} active avatar />
                    </>
                }
            </Modal>
        </>
    )
}

export default CommentsModal