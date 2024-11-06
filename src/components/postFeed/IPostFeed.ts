export type PostAttributes = {
    id: string;
    content: string;
    imageData: string;
    createdAt: any;
    user: User;
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