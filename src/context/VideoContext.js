import React, { createContext, useContext, useState } from 'react';

export const VideoContext = createContext();

export const useVideoContext = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideoContext debe ser usado dentro de un VideoProvider');
    }
    return context;
};

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);

    const addVideo = (newVideo) => {
        setVideos([...videos, newVideo]);
    };

    return (
        <VideoContext.Provider value={{ videos, addVideo }}>
            {children}
        </VideoContext.Provider>
    );
};
