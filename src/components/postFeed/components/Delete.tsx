import { Button, Popconfirm, PopconfirmProps } from 'antd'
import Remove from '../../icons/Remove';
import { IDelete } from '../IPostFeed';
import { DELETE_POST } from '../../../services/api';

const Delete = ({ postId }: IDelete) => {

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        const response = await DELETE_POST(postId);
    };

    return (
        <div>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
            >
                <Button type="text" danger><Remove /></Button>
            </Popconfirm>
        </div>
    )
}

export default Delete