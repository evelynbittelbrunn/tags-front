export type PostAttributes = {
    id: string;
    content: string;
    imageData: string;
    createdAt: any;
    user: User;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
}

export type CommentAttributes = {
    id: string;
    content: string;
    user: User;
}

export type User = {
    id: string;
    name: string;
    profilePicture: any;
}

export interface IPostAuthor {
    user: User;
}

export interface IPostFeed {
    isProfileFeed: boolean;
    getPosts?: any
}

export interface IPostAuthor {
    user: User;
}

export interface ILike {
    currentUserId: string;
    postId: string;
    isLiked: boolean;
    totalLikes: number;
    setTotalLikes: any;
}

export interface IDelete {
    postId: string;
    setPosts: (posts: PostAttributes[]) => void;
}