export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: {
      id: number;
      title: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
}

export interface Filters {
    title?: string;
    albumTitle?: string;
    userEmail?: string;
    limit?: number;
    offset?: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}