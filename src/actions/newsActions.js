export const NEWS_GET_SUCCESS = 'NEWS_GET_SUCCESS';
export const NEWS_GET_LOADING = 'NEWS_GET_LOADING';
export const NEWS_GET_ERRORED = 'NEWS_GET_ERRORED';

export function getNewsLoading(bool) {
  return ({
    type: NEWS_GET_LOADING,
    payload: {
      isLoading: bool,
    },
  });
}

export function getNewsSuccess(data) {
  return ({
    type: NEWS_GET_SUCCESS,
    payload: {
      data,
    },
  });
}

export function getNewsErrored(message) {
  return ({
    type: NEWS_GET_ERRORED,
    payload: {
      errorMsg: message,
    },
    error: true,
  });
}

export function getNews() {
  return (dispatch) => {
    dispatch(getNewsLoading(true));

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/news', {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(getNewsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then((json) => {
        if (json.status === 'ok') {
          dispatch(getNewsSuccess(json.data));
        } else if (json.status === 'err') {
          dispatch(getNewsErrored(json.message));
        }
      })
      .catch((error) => {
        dispatch(getNewsLoading(false));
        dispatch(getNewsErrored(error.message));
      });
  };
}
