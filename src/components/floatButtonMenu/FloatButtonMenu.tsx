import { FormOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';
import React from 'react'
import './styles.css';

const FloatButtonMenu = () => {

    const BOX_SIZE = 100;

    const wrapperStyle: React.CSSProperties = {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
    };

    const boxStyle: React.CSSProperties = {
        width: BOX_SIZE,
        height: BOX_SIZE,
        position: 'relative',
    };

    const style: React.CSSProperties = {
        position: 'absolute',
        insetInlineEnd: "top",
        bottom: "top",
    };

    return (
        <>
            <span className='floating-button-group-container'>
                <Flex justify="space-evenly" align="flex-end" style={wrapperStyle}>
                    <div style={boxStyle}>
                        <FloatButton.Group
                            key={"top"}
                            trigger="click"
                            style={style}
                            icon={<PlusOutlined />}
                        >
                            <FloatButton icon={<FormOutlined />} tooltip={"Publicar"} />
                            <FloatButton icon={<TagOutlined />} tooltip={"Definir tags"} />
                        </FloatButton.Group>
                    </div>
                </Flex>
            </span>
        </>
    )
}

export default FloatButtonMenu