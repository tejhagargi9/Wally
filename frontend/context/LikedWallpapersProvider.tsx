import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallpaper } from '@/hooks/useWallpaper';

type LikedWallpapersContextType = {
  likedWallpapers: Wallpaper[];
  toggleLike: (wallpaper: Wallpaper) => Promise<void>;
};

const LikedWallpapersContext = createContext<LikedWallpapersContextType | undefined>(undefined);

export const LikedWallpapersProvider = ({ children }: { children: ReactNode }) => {
  const [likedWallpapers, setLikedWallpapers] = useState<Wallpaper[]>([]);

  // Load liked wallpapers from AsyncStorage when the app starts
  React.useEffect(() => {
    const loadLikedWallpapers = async () => {
      const storedWallpapers = await AsyncStorage.getItem('likedWallpapers');
      setLikedWallpapers(storedWallpapers ? JSON.parse(storedWallpapers) : []);
    };
    loadLikedWallpapers();
  }, []);

  const toggleLike = async (wallpaper: Wallpaper) => {
    const isAlreadyLiked = likedWallpapers.some((item) => item.id === wallpaper.id);
    let updatedWallpapers;

    if (isAlreadyLiked) {
      // Remove wallpaper from the liked list
      updatedWallpapers = likedWallpapers.filter((item) => item.id !== wallpaper.id);
    } else {
      // Add wallpaper to the liked list
      updatedWallpapers = [...likedWallpapers, wallpaper];
    }

    // Update state and persist changes
    setLikedWallpapers(updatedWallpapers);
    await AsyncStorage.setItem('likedWallpapers', JSON.stringify(updatedWallpapers));
  };

  return (
    <LikedWallpapersContext.Provider value={{ likedWallpapers, toggleLike }}>
      {children}
    </LikedWallpapersContext.Provider>
  );
};

export const useLikedWallpapers = () => {
  const context = useContext(LikedWallpapersContext);
  if (!context) {
    throw new Error('useLikedWallpapers must be used within a LikedWallpapersProvider');
  }
  return context;
};
