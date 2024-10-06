import { Modal } from 'antd'
import React, { useState } from 'react'

interface ICommentModal {
    open: boolean;
    setOpen: (b: boolean) => void;
}

const CommentsModal = ({
    open,
    setOpen
}: ICommentModal) => {

    const [loading, setLoading] = useState<boolean>(true);

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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default CommentsModal