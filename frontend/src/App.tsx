import React, { useState } from 'react';
import Filters from './components/Filters';
import PhotoList from './components/PhotoList';
import Pagination from './components/Pagination';
import { Filters as FilterType } from './models/common';
import useFetchPhotos from './hooks/fetchPhotos';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>({ limit: 25, offset: 0 });
  const { data, loading, error } = useFetchPhotos(filters);

  const handleApplyFilters = (newFilters: FilterType) => {
    setFilters({ ...filters, ...newFilters, offset: 0 }); // Reset offset when filters change
  };

  const handlePageChange = (newOffset: number) => {
    setFilters((prevFilters: any) => ({ ...prevFilters, offset: newOffset }));
  };

  return (
    <div className="app">
    <h1>Photo Gallery</h1>
    <Filters onApply={handleApplyFilters} />
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    {data && (
      <>
        <PhotoList photos={data.photos} />
        <Pagination
          total={data.total}
          limit={filters.limit || 25}
          offset={filters.offset || 0}
          onPageChange={handlePageChange}
        />
      </>
    )}
  </div>
  );
};

export default App;