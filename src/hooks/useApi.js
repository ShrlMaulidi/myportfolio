import { useState, useEffect } from 'react';

// Environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Simple in-memory cache to prevent redundant API calls
const apiCache = new Map();

export function useApi(endpoint, initialData = []) {
  const [data, setData] = useState(() => apiCache.get(endpoint) || initialData);
  const [loading, setLoading] = useState(!apiCache.has(endpoint));
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have the data in cache, don't fetch again!
    if (apiCache.has(endpoint)) {
        setData(apiCache.get(endpoint));
        setLoading(false);
        return;
    }

    fetch(`${API_URL}/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((result) => {
        // Parse JSON fields if necessary (like tech arrays)
        const fixImageUrl = (url) => {
            if (!url) return url;
            if (url.startsWith('http') || url.startsWith('/')) return url;
            if (!url.includes('.')) return url; // Emojis or string keys like "Gmail"
            // Use same logic for storage path
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://127.0.0.1:8000';
            return `${baseUrl}/storage/${url}`;
        };

        const processItem = (item) => {
            if (!item) return item;
            if (item.tech && typeof item.tech === 'string') {
                try { item.tech = JSON.parse(item.tech); } catch(e){}
            }
            if (item.images && typeof item.images === 'string') {
                try { item.images = JSON.parse(item.images); } catch(e){}
            }
            if (item.responsibilities && typeof item.responsibilities === 'string') {
                try { item.responsibilities = JSON.parse(item.responsibilities); } catch(e){}
            }
            if (item.responsibilitiesEn && typeof item.responsibilitiesEn === 'string') {
                try { item.responsibilitiesEn = JSON.parse(item.responsibilitiesEn); } catch(e){}
            }

            if (item.image) item.image = fixImageUrl(item.image);
            if (item.icon) item.icon = fixImageUrl(item.icon);
            if (item.logo) item.logo = fixImageUrl(item.logo);
            if (item.src) item.src = fixImageUrl(item.src);
            if (item.img) item.img = fixImageUrl(item.img);
            if (item.images && Array.isArray(item.images)) {
                item.images = item.images.map(fixImageUrl);
            }
            return item;
        };

        const parsedData = Array.isArray(result) ? result.map(processItem) : processItem(result);
        
        // Save to cache
        apiCache.set(endpoint, parsedData);
        
        setData(parsedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError(err);
        setLoading(false);
      });
  }, [endpoint]);

  const updateData = (newData) => {
    let resolvedData = typeof newData === 'function' ? newData(data) : newData;
    setData(resolvedData);
    apiCache.set(endpoint, resolvedData);
  };

  return { data, loading, error, updateData };
}
