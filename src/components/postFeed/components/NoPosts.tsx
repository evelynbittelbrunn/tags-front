import React from 'react'
import TagIcon from '../../icons/TagIcon'

const NoPosts = () => {
    return (
        <div className='no-posts-container'>
            <TagIcon />
            <p>Não há posts no momento.</p>
            <p>Adicione tags ou conecte-se com pessoas novas para começar a interagir!</p>
        </div>
    )
}

export default NoPosts