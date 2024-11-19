export type ProfileData = {
    bio: string;
    name: string;
    profilePicture: string;
    following: boolean;
}

export interface IProfileInfo {
    profileData: ProfileData;
    isCurrentUser: boolean;
    otherUserId: string | undefined;
    totalFollowers: number;
    setTotalFollowers: (totalFollowers: number) => void;
}