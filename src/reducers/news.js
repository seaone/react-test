import { NEWS_GET_SUCCESS, NEWS_GET_LOADING, NEWS_GET_ERRORED } from '../actions/newsActions';

const initialState = {
  data: null,
  isLoading: false,
  errorMsg: '',
};

export default function news(state = initialState, action) {
  switch (action.type) {
    case NEWS_GET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMsg: '',
      };

    case NEWS_GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        errorMsg: '',
      };

    case NEWS_GET_ERRORED:
      return {
        ...state,
        data: null,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return state;
  }
}
