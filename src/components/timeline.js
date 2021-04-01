import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { photos } = usePhotos();

  return (
    <div className="container col-span-2">
      {!photos && (
        <Skeleton count={4} width={500} height={500} className="mb-5" />
      )}
      {photos?.length > 0 ? (
        photos.map(photo => <Post key={photo.docId} content={photo} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see more photos</p>
      )}
    </div>
  );
}
