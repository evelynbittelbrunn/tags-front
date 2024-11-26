import React, { useState } from 'react'
import { PostAttributes, User } from '../IPostFeed'
import PostAuthor from './PostAuthor';
import Delete from './Delete';
import Like from './Like';
import CommentsModal from './CommentsModal';

interface ICardPost {
    post: PostAttributes;
    user: User;
    currentUser: string;
    setPosts: (posts: PostAttributes[]) => void;
}

const Post = ({ post, user, currentUser, setPosts }: ICardPost) => {

    const { id, content, imageData, isLiked, likeCount, commentCount, createdAt } = post;

    const [totalLikes, setTotalLikes] = useState<number>(likeCount);
    const [totalComments, setTotalComments] = useState<number>(commentCount);

    return (
        <div key={id} className='card-post-feed'>
            <div className='post-header'>
                <PostAuthor user={user} createdAt={createdAt} />
                {(user.id === currentUser) &&
                    <Delete postId={id} setPosts={setPosts} />
                }
            </div>
            <p>{content}</p>
            {imageData && (
                <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt="Post Image"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            <div className='post-actions'>
                <Like
                    isLiked={isLiked}
                    currentUserId={currentUser as string}
                    postId={id}
                    totalLikes={totalLikes}
                    setTotalLikes={setTotalLikes}
                />
                <CommentsModal
                    postId={id}
                    currentUser={currentUser as string}
                    totalComments={totalComments}
                    setTotalComments={setTotalComments}
                />
            </div>
        </div>
    )
}

export default Post