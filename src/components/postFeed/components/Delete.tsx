import { Button, Popconfirm, PopconfirmProps } from 'antd'
import { IDelete, PostAttributes } from '../IPostFeed';
import { DELETE_POST } from '../../../services/api';
import { useNotification } from '../../../contexts/ToastNotificationContext';
import RemoveIcon from '../../icons/RemoveIcon';

const Delete = ({ postId, setPosts }: IDelete) => {

    const { showNotification } = useNotification();

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        const response = await DELETE_POST(postId);
        if (response.status === 200) {
            // @ts-ignore
            setPosts((prev): PostAttributes[] => prev.filter((post) => post.id !== postId));
            showNotification(response.data, "success");
        }
    };

    return (
        <div>
            <Popconfirm
                title="Excluir postagem 😔"
                description="Tem certeza de que deseja excluir?"
                onConfirm={confirm}
                okText="Sim"
                cancelText="Não"
            >
                <Button className='dark-hover' type="text" danger><RemoveIcon /></Button>
            </Popconfirm>
        </div>
    )
}

export default Delete