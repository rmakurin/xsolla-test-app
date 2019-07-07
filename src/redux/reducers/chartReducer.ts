import { GET_CHART_DATA } from '../actions/chartActions';

const initialState = { value: 0 };

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_CHART_DATA:
      return { value: state.value + 1 };
    default:
      return state;
  }
}
