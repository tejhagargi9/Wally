import { useState, useEffect } from "react";
import axios from "axios";

export interface Wallpaper {
  url: string;
  name: string;
}

const API_KEY = process.env.PEXELS_API_KEY; // Replace with your Pexels API key.

const useWallpaper = (): Wallpaper[] => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/curated", {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            per_page: 20, // Number of wallpapers to fetch
          },
        });

        const formattedWallpapers = response.data.photos.map((photo: any) => {
          const altText = photo.alt || `Wallpaper ${photo.id}`;

          // Extract meaningful name
          const words = altText
            .split(" ") // Split into words
            .filter(
              (word) => word.length > 3 && /^[a-zA-Z]+$/.test(word) // Filter meaningful words
            );
          const meaningfulName = words.length > 0 ? words[0] : `Wallpaper${photo.id}`;

          return {
            url: photo.src.portrait, // Use portrait image for wallpapers
            name: meaningfulName,
          };
        });

        setWallpapers(formattedWallpapers);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    fetchWallpapers();
  }, []);

  return wallpapers;
};

export default useWallpaper;
