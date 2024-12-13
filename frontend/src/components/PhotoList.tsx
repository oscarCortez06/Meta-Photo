import React from 'react';
import { Photo } from '../models/common';

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return <p>No photos available.</p>;
  }

  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <h3>{photo.title}</h3>
          <p><strong>Album:</strong> {photo.album.title}</p>
          <p><strong>User:</strong> {photo.album.user.name} ({photo.album.user.email})</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;