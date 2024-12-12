import { Photo, Album, User, Endpoints, EnrichedPhotoResponse, FilteredPhotosParams, FilteredPhotosResponse } from "../models/common";
import { fetchData } from '../utils/fetchData';

export const fetchPhotos = async (id : string): Promise<EnrichedPhotoResponse> => {
    try {
      const photo = await fetchData<Photo>(`${Endpoints.Photos}/${id}`);
    
      const album = await fetchData<Album>(`${Endpoints.Albums}/${photo.albumId}`);
      
      // Fetch the user by the userId from the album object
      const user = await fetchData<User>(`${Endpoints.Users}/${album.userId}`);

        if (!album || !user) {
            throw new Error('Album or user not found for the specified photo');
        }

        return {
            id: photo.id,
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
            album: {
              id: album.id,
              title: album.title,
              user,
            },
          };
    } catch (error: any) {
        console.error(`Error fetching enriched photo: ${error.message}`);
        throw error;
    }
}

export const fetchFilteredPhotos = async (
  query: Record<string, string | undefined>
): Promise<FilteredPhotosResponse> => {
  try {
    const photos = await fetchData<Photo[]>(Endpoints.Photos);
    const albums = await fetchData<Album[]>(Endpoints.Albums);
    const users = await fetchData<User[]>(Endpoints.Users);

    let filteredPhotos = photos;

    // Extract nested query params
    const title = query.title;
    const albumTitle =  query['album.title']
    const userEmail =  query['album.user.email']
    console.log(albumTitle, userEmail)
    // Ensure defaults for limit and offset
    const limit = parseInt(query.limit || '25', 10);
    const offset = parseInt(query.offset || '0', 10);

    // Apply filters
    if (title) {
      const titleLower = title.toLowerCase();
      filteredPhotos = filteredPhotos.filter((photo) =>
        photo.title.toLowerCase().includes(titleLower)
      );
    }

    if (albumTitle) {
      const albumTitleLower = albumTitle.toLowerCase();
      const filteredAlbums = albums.filter((album) =>
        album.title.toLowerCase().includes(albumTitleLower)
      );
      filteredPhotos = filteredPhotos.filter((photo) =>
        filteredAlbums.some((album) => album.id === photo.albumId)
      );
    }

    if (userEmail) {
      const filteredUsers = users.filter((user) => user.email === userEmail);
      const filteredAlbums = albums.filter((album) =>
        filteredUsers.some((user) => user.id === album.userId)
      );
      filteredPhotos = filteredPhotos.filter((photo) =>
        filteredAlbums.some((album) => album.id === photo.albumId)
      );
    }

    // Enrich filtered photos
    const enrichedPhotos = filteredPhotos.map((photo) => {
      const album = albums.find((album) => album.id === photo.albumId);
      const user = users.find((user) => user.id === album?.userId);

      if (!album || !user) {
        throw new Error(`Album or user not found for photo ID: ${photo.id}`);
      }

      return {
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
        album: {
          id: album.id,
          title: album.title,
          user,
        },
      };
    });

    // Apply pagination
    const paginatedPhotos = enrichedPhotos.slice(offset, offset + limit);

    return {
      photos: paginatedPhotos,
      total: enrichedPhotos.length,
    };
  } catch (error: any) {
    console.error(`Error fetching filtered photos: ${error.message}`);
    throw error;
  }
};
