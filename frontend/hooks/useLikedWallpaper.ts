import { useState, useCallback } from 'react';
import { Wallpaper } from '@/hooks/useWallpaper';

const useLikedWallpaper = () => {
  const [likedWallpapers, setLikedWallpapers] = useState<Wallpaper[]>([]);

  const toggleLike = useCallback((wallpaper: Wallpaper) => {
    setLikedWallpapers((prevLiked) => {
      const isLiked = prevLiked.some((wp) => wp.url === wallpaper.url);
      if (isLiked) {
        return prevLiked.filter((wp) => wp.url !== wallpaper.url); // Remove from liked
      } else {
        return [...prevLiked, wallpaper]; // Add to liked
      }
    });
  }, []);

  const isLiked = useCallback(
    (wallpaper: Wallpaper) => likedWallpapers.some((wp) => wp.url === wallpaper.url),
    [likedWallpapers]
  );

  return { likedWallpapers, toggleLike, isLiked };
};

export default useLikedWallpaper;
