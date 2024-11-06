export type ProfileData = {
    bio: string;
    name: string;
    profilePicture: string;
}

export interface IProfileInfo {
    profileData: ProfileData;
    isCurrentUser: boolean;
}