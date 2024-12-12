export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
};

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
};
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company
}

export interface Album {
id: number;
userId: number;
title: string;
user?: User; 
}

export enum Endpoints {
    Photos = '/photos',
    Albums = '/albums',
    Users = '/users',
}

export interface EnrichedPhotoResponse {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: {
      id: number;
      title: string;
      user: User;
    };
}

export interface FilteredPhotosParams {
    title?: string;
    albumTitle?: string;
    userEmail?: string;
    limit: string;
    offset: string;
}

export interface FilteredPhotosResponse {
    photos: EnrichedPhotoResponse[];
    total: number;
}

export interface ApiError {
    status: number;
    message: string;
    details?: string;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}