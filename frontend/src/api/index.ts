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
