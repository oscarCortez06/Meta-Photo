import { Request, Response } from 'express';

import { fetchPhotos, fetchFilteredPhotos } from '../services/photoService';
import { ApiResponse, EnrichedPhotoResponse, FilteredPhotosParams, FilteredPhotosResponse } from '../models/common';


export const getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
  
    try {
      const enrichedPhoto: EnrichedPhotoResponse = await fetchPhotos(id);
      const response: ApiResponse<EnrichedPhotoResponse> = {
        data: enrichedPhoto,
        status: 200,
        message: 'Photo fetched successfully',
      };
      return res.status(200).json(response);
    } catch (error: any) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        status: 500,
        message: `Error fetching enriched photo: ${error.message}`,
      };
      return res.status(500).json(errorResponse);
    }
};

export const getAllFilteredPhotos = async (req: Request, res: Response): Promise<Response> => {
    const params: any = req.query as unknown as FilteredPhotosParams;
  
    try {
        console.log(params)
      const filteredPhotos: FilteredPhotosResponse = await fetchFilteredPhotos(params);
      const response: ApiResponse<FilteredPhotosResponse> = {
        data: filteredPhotos,
        status: 200,
        message: 'Photos fetched successfully',
      };
      return res.status(200).json(response);
    } catch (error: any) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        status: 500,
        message: `Error fetching filtered photos: ${error.message}`,
      };
      return res.status(500).json(errorResponse);
    }
  };