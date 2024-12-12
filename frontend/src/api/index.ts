import axios from "axios";
import { useReducer, useEffect } from "react";

enum ActionType {
    FETCH_START = "FETCH_START",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
}

interface State<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

interface Action<T> {
    type: ActionType;
    payload?: T;
    error?: string;
}

export enum ApiConstants {
    PHOTO_API_URL = "http://localhost:3000/externalapi/photos",
}
  

// Initial state for reducers
const initialState = {
    data: [] as any[],
    loading: false,
    error: null,
  };

const apiReducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case ActionType.FETCH_START:
            return { ...state, loading: true, error: null };
        case ActionType.FETCH_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                data: action.payload !== undefined ? action.payload : state.data 
            };
        case ActionType.FETCH_ERROR:
            return { 
                ...state, 
                loading: false, 
                error: action.error || "Unknown error" 
            };
        default:
            return state;
    }
};

export const useFetchPhotos = (filter: string) => {
    const [state, dispatch] = useReducer(apiReducer, initialState);
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: ActionType.FETCH_START });
        try {
          const url = `${ApiConstants.PHOTO_API_URL}?filter=${filter}`;
          const response = await axios.get(url);
          dispatch({ type: ActionType.FETCH_SUCCESS, payload: response.data });
        } catch (err) {
          dispatch({ type: ActionType.FETCH_ERROR, error: "Error fetching photos" });
          console.error("Error fetching photos:", err);
        }
      };
  
      if (filter) {
        fetchData();
      }
    }, [filter]);
  
    return state;
  };

