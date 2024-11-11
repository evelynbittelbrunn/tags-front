export type FieldType = {
    postContent?: string;
    tags?: [string];
};

export type Image = {
    photo: any;
    imageBase64: string;
}

export interface INewPostModal {
    openNewPostModal: boolean;
    setOpenNewPostModal: (b: boolean) => void;
}