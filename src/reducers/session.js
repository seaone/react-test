import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERRORED,
  AUTH_LOGOUT,
} from '../actions/sessionActions';

const initialState = {
  user: {
    id: localStorage.user ? JSON.parse(localStorage.user).id : null,
  },
  isLoading: false,
  errorMsg: '',
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMsg: '',
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.id,
        },
        errorMsg: '',
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        user: {
          id: null,
        },
        errorMsg: '',
      };

    case AUTH_ERRORED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return state;
  }
}
