import React, { useState, useCallback } from 'react';

const useLikedWallpaper = () => {
  const [likedWallpapers, setLikedWallpapers] = React.useState([]);

  const toggleLike = (wallpaper) => {
    setLikedWallpapers((prev) => {
      if (prev.find((item) => item.url === wallpaper.url)) {
        // Remove from liked
        return prev.filter((item) => item.url !== wallpaper.url);
      } else {
        // Add to liked
        return [...prev, wallpaper];
      }
    });
  };

  const isLiked = (wallpaper) => {
    return likedWallpapers.some((item) => item.url === wallpaper.url);
  };

  return { likedWallpapers, toggleLike, isLiked };
};

export default useLikedWallpaper;
