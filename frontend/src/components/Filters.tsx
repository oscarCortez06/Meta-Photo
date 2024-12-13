import React, { useState } from 'react';
import { Filters } from '../models/common';

interface FiltersProps {
  onApply: (filters: Filters) => void;
}

const FiltersComponent: React.FC<FiltersProps> = ({ onApply }) => {
  const [title, setTitle] = useState<string>('');
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const handleApply = () => {
    onApply({
      title,
      albumTitle,
      userEmail,
    });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Photo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album title"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="User email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={handleApply}>Apply Filters</button>
    </div>
  );
};

export default FiltersComponent;