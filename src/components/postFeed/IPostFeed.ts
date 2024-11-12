export type PostAttributes = {
    id: string;
    content: string;
    imageData: string;
    createdAt: any;
    user: User;
    isLiked: boolean;
}

type User = {
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
}

export interface IDelete {
    postId: string;
    setPosts: (posts: PostAttributes[]) => void;
}