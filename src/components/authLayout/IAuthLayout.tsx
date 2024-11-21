export interface IAuthLayout {
    children: any
    type: Auth;
}

export enum Auth {
    LOGIN,
    NEW_ACCESS
}