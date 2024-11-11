import { Button, Popconfirm, PopconfirmProps } from 'antd'
import Remove from '../../icons/Remove';

const Delete = () => {

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
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