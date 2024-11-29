export type ProfileData = {
    bio: string;
    name: string;
    profilePicture: string;
    isFollowing: boolean;
    followersCount: number;
    followingCount: number;
}

export interface IProfileInfo {
    profileData: ProfileData;
    isCurrentUser: boolean;
    otherUserId: string | undefined;
    totalFollowers: number;
    setTotalFollowers: (totalFollowers: number) => void;
    isLoadingUserData: boolean;
}