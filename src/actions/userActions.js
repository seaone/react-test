export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_LOADING = 'USER_GET_LOADING';
export const USER_GET_ERRORED = 'USER_GET_ERRORED';

export function getUserLoading(bool) {
  return ({
    type: USER_GET_LOADING,
    payload: {
      isLoading: bool,
    },
  });
}

export function getUserSuccess(data) {
  return ({
    type: USER_GET_SUCCESS,
    payload: {
      data,
    },
  });
}

export function getUserErrored(message) {
  return ({
    type: USER_GET_ERRORED,
    payload: {
      errorMsg: message,
    },
    error: true,
  });
}

export function getUser(id) {
  return (dispatch) => {
    dispatch(getUserLoading(true));

    fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/${id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(getUserLoading(false));

        return response;
      })
      .then(response => response.json())
      .then((json) => {
        if (json.status === 'ok') {
          dispatch(getUserSuccess(json.data));
        } else if (json.status === 'err') {
          dispatch(getUserErrored(json.message));
        }
      })
      .catch((error) => {
        dispatch(getUserLoading(false));
        dispatch(getUserErrored(error.message));
      });
  };
}
