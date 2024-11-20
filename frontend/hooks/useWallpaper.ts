import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface Wallpaper {
  url: string;
  name: string;
}

const API_KEY = process.env.PEXELS_API_KEY; // Replace with your Pexels API key.

const useWallpaper = (query: string): { wallpapers: Wallpaper[]; refetch: () => void } => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]); // Holds the final list of wallpapers to display
  const [curatedWallpapers, setCuratedWallpapers] = useState<Wallpaper[]>([]); // Holds curated wallpapers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallpapers = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
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
        const words = altText.split(" ").filter(
          (word) => word.length > 3 && /^[a-zA-Z]+$/.test(word)
        );
        const meaningfulName = words.length > 0 ? words[0] : `Wallpaper${photo.id}`;

        return {
          url: photo.src.portrait, // Use portrait image for wallpapers
          name: meaningfulName,
        };
      });

      setCuratedWallpapers(formattedWallpapers); // Store curated wallpapers
      if (!query) {
        setWallpapers(formattedWallpapers); // If no search, show curated wallpapers
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch wallpapers");
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const fetchSearchWallpapers = useCallback(async () => {
    if (query) {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            query: query,  // Search term
            per_page: 20,   // Number of wallpapers to fetch
          },
        });

        const formattedWallpapers = response.data.photos.map((photo: any) => {
          const altText = photo.alt || `Wallpaper ${photo.id}`;
          const words = altText.split(" ").filter(
            (word) => word.length > 3 && /^[a-zA-Z]+$/.test(word)
          );
          const meaningfulName = words.length > 0 ? words[0] : `Wallpaper${photo.id}`;

          return {
            url: photo.src.portrait, // Use portrait image for wallpapers
            name: meaningfulName,
          };
        });

        setWallpapers(formattedWallpapers); // Update the wallpapers for search results
      } catch (error: any) {
        setError(error.message || "Failed to fetch wallpapers");
        console.error("Error fetching wallpapers:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [query]);

  // Initial fetch or when the query changes
  useEffect(() => {
    fetchWallpapers();
  }, [fetchWallpapers]);

  // Fetch search wallpapers only if there is a query
  useEffect(() => {
    if (query) {
      fetchSearchWallpapers();
    } else {
      // When query is cleared, show curated wallpapers
      setWallpapers(curatedWallpapers);
    }
  }, [query, fetchSearchWallpapers, curatedWallpapers]);

  return { wallpapers, refetch: fetchWallpapers };
};

export default useWallpaper;
  