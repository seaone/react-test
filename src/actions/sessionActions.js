export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_ERRORED = 'AUTH_ERRORED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export function authIsLoading(bool) {
  return ({
    type: AUTH_LOADING,
    payload: {
      isLoading: bool,
    },
  });
}

export function authSuccess(data) {
  localStorage.setItem('user', JSON.stringify(data));

  return ({
    type: AUTH_SUCCESS,
    payload: {
      id: data.id,
    },
  });
}

export function authHasErrored(message) {
  return ({
    type: AUTH_ERRORED,
    payload: {
      errorMsg: message,
    },
    error: true,
  });
}

export function login(body) {
  return (dispatch) => {
    dispatch(authIsLoading(true));

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(authIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then((json) => {
        if (json.status === 'ok') {
          dispatch(authSuccess(json.data));
        } else if (json.status === 'err') {
          dispatch(authHasErrored(json.message));
        }
      })
      .catch((error) => {
        dispatch(authIsLoading(false));
        dispatch(authHasErrored(error.message));
      });
  };
}

export function logout() {
  localStorage.removeItem('user');

  return ({
    type: AUTH_LOGOUT,
    payload: {
      id: null,
    },
  });
}
