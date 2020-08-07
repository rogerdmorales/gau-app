import {
  FIND_PLACES,
  LOADING_DETAILS,
  QUERY_CHANGED,
  SET_PLACE,
  UPDATE_CURRENT_LOCATION,
  LIKE_COMMENT,
  REPLY_COMMENT,
  RATE_PLACE,
  RATE_PLACE_SUCCESS,
  FIND_PLACE_RATINGS,
} from '../actionTypes';

const initialState = {
  selectedPlace: null,
  comments: [],
  predictions: [],
  currentLocation: null,
  places: null,
  loadingDetails: false,
  loadingRating: false,
  placeRating: null,
  submittingRating: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACE:
      return {
        ...state,
        selectedPlace: action.payload,
        comments: action.payload ? action.payload.comments : [],
        predictions: [],
        loadingDetails: false,
      };
    case QUERY_CHANGED:
      return {
        ...state,
        predictions: action.payload,
      };
    case UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case FIND_PLACES:
      return {
        ...state,
        places: action.payload,
        predictions: [],
      };
    case LOADING_DETAILS:
      return {
        ...state,
        loadingDetails: true,
      };
    case LIKE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.payload) {
            comment.likes++;
          } else if (comment.responses) {
            comment.responses.forEach((response) => {
              if (response._id === action.payload) {
                response.likes++;
              }
            });
          }
          return comment;
        }),
      };
    case REPLY_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.payload._id) {
            return action.payload;
          }
          return comment;
        }),
      };
    case RATE_PLACE:
      return {
        ...state,
        submittingRating: true,
      };
    case RATE_PLACE_SUCCESS:
      return {
        ...state,
        submittingRating: false,
      };
    case FIND_PLACE_RATINGS:
      console.log('comments: ' + JSON.stringify(action.payload.comments));
      return {
        ...state,
        selectedPlace: {
          ...state.selectedPlace,
          _id: action.payload_id,
          averageScore: action.payload.averageScore,
          reviewers: action.payload.reviewers,
        },
        comments: action.payload.comments,
      };
    default:
      return state;
  }
};

export default reducer;
