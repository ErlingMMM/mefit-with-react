export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

interface FetchUserDataRequestAction {
  type: typeof FETCH_USER_DATA_REQUEST;
}

interface FetchUserDataSuccessAction {
  type: typeof FETCH_USER_DATA_SUCCESS;
  payload: any; // replace 'any' with the type of userData
}

interface FetchUserDataFailureAction {
  type: typeof FETCH_USER_DATA_FAILURE;
  payload: any; // replace 'any' with the type of error
}

export const fetchUserDataRequest = (): FetchUserDataRequestAction => {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
};

export const fetchUserDataSuccess = (userData: any): FetchUserDataSuccessAction => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: userData,
  };
};

export const fetchUserDataFailure = (error: any): FetchUserDataFailureAction => {
  return {
    type: FETCH_USER_DATA_FAILURE,
    payload: error,
  };
};

export const fetchUserData = () => {
  return async (dispatch: any) => {
    dispatch(fetchUserDataRequest());
    try {
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      dispatch(fetchUserDataSuccess(data.results[0]));
    } catch (error) {
      dispatch(fetchUserDataFailure(error));
    }
  };
};

