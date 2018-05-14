import { USER_GET_SUCCESS, USER_GET_LOADING, USER_GET_ERRORED } from '../actions/userActions';

const initialState = {
  userId: null,
  data: null,
  isLoading: false,
  errorMsg: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_GET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMsg: '',
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        errorMsg: '',
      };

    case USER_GET_ERRORED:
      return {
        ...state,
        userId: null,
        data: null,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return state;
  }
}
