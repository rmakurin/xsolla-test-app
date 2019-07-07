import {
  DATA_REQUEST_STARTED,
  DATA_REQUEST_FINISHED,
  DATA_REQUEST_ERROR,
  TABLE_PAGE_CHANGED,
  TABLE_PAGE_SIZE_CHANGED,
  TABLE_SORTED_CHANGED,
  TABLE_FILTERED_CHANGED,
  TABLE_RESIZED_CHANGED
} from '../actions/tableActions';

const initialState = {
  data: [],
  pages: -1,
  loading: false,
  errors: null,
  page: undefined,
  pageSize: 20,
  sorted: [],
  filtered: [],
  resized: []
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case DATA_REQUEST_STARTED:
      return Object.assign({}, state, { loading: true, errors: null });
    case DATA_REQUEST_FINISHED:
      return Object.assign({}, state, {
        loading: false,
        errors: null,
        data: action.res.data,
        pages: action.res.pages
      });
    case DATA_REQUEST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        errors: action.errors
      });
    case TABLE_PAGE_CHANGED:
      return Object.assign({}, state, { page: action.pageIndex });
    case TABLE_PAGE_SIZE_CHANGED:
      return Object.assign({}, state, {
        page: action.pageIndex,
        pageSize: action.pageSize
      });
    case TABLE_SORTED_CHANGED:
      return Object.assign({}, state, { sorted: action.newSorted });
    case TABLE_FILTERED_CHANGED:
      return Object.assign({}, state, { filtered: action.filtered });
    case TABLE_RESIZED_CHANGED:
      return Object.assign({}, state, { resized: action.newResized });
    default:
      return state;
  }
}
