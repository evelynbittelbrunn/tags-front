import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface FeedContextProps {
    feedKey: number;
    profileFeedKey: number;
    refreshFeed: () => void;
    refreshProfileFeed: () => void;
}

export const FeedContext = createContext<FeedContextProps | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const location = useLocation();

    const [feedKey, setFeedKey] = useState(0);
    const [profileFeedKey, setProfileFeedKey] = useState(1);

    const refreshFeed = () => setFeedKey((prev) => prev + 1);
    const refreshProfileFeed = () => setProfileFeedKey((prev) => prev + 1);

    useEffect(() => {
        const newFeedKey = Math.random();
        const newProfileKey = Math.random();

        setFeedKey(newFeedKey);
        setProfileFeedKey(newProfileKey);
    }, [location]);

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
