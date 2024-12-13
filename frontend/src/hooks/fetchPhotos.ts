import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse, Filters, Photo } from '../models/common';

interface FetchPhotosResponse {
  photos: Photo[];
  total: number;
}


const useFetchPhotos = (filters: Filters) => {
    const [data, setData] = useState<FetchPhotosResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await axios.get<ApiResponse<{ photos: Photo[]; total: number }>>(
            'http://localhost:3000/externalapi/photos',
            {
              params: filters,
            }
          );
  
          // Extract data from API response
          if (response.data && response.data.data) {
            setData(response.data.data);
          } else {
            throw new Error('Unexpected response structure');
          }
        } catch (err) {
          console.error('Error fetching photos:', err);
          setError('Failed to fetch photos');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPhotos();
    }, [filters]);
  
    return { data, loading, error };
};
  
export default useFetchPhotos;