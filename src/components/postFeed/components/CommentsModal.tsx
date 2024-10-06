import { Modal } from 'antd'
import React, { useState } from 'react'
import Comment from '../../comment/Comment';

interface ICommentModal {
    open: boolean;
    setOpen: (b: boolean) => void;
}

const CommentsModal = ({
    open,
    setOpen
}: ICommentModal) => {

    const [loading, setLoading] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <Modal
            title={<p>Comentários</p>}
            loading={loading}
            open={open}
            onCancel={() => setOpen(false)}
        >
            <Comment />
            <Comment />
            <Comment />
        </Modal>
    )
}

export default CommentsModal