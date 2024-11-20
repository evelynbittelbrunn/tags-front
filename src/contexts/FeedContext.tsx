import React, { createContext, useContext, useState } from 'react';

interface FeedContextProps {
    feedKey: number;
    profileFeedKey: number;
    refreshFeed: () => void;
    refreshProfileFeed: () => void;
}

const FeedContext = createContext<FeedContextProps | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [feedKey, setFeedKey] = useState(0);
    const [profileFeedKey, setProfileFeedKey] = useState(0);

    const refreshFeed = () => setFeedKey((prev) => prev + 1);
    const refreshProfileFeed = () => setProfileFeedKey((prev) => prev + 1);

    return (
        <FeedContext.Provider value={{ feedKey, profileFeedKey, refreshFeed, refreshProfileFeed }}>
            {children}
        </FeedContext.Provider>
    );
};

export const useFeedContext = () => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error('useFeedContext must be used within a FeedProvider');
    }
    return context;
};
