import { transaction } from '../../itansaction';
import { SortingRule, Filter, Resize } from 'react-table';

export const DATA_REQUEST_STARTED = 'DATA_REQUEST_STARTED';
export const DATA_REQUEST_FINISHED = 'DATA_REQUEST_FINISHED';
export const DATA_REQUEST_ERROR = 'DATA_REQUEST_ERROR';
export const TABLE_PAGE_CHANGED = 'TABLE_PAGE_CHANGED';
export const TABLE_PAGE_SIZE_CHANGED = 'TABLE_PAGE_SIZE_CHANGED';
export const TABLE_SORTED_CHANGED = 'TABLE_SORTED_CHANGED';
export const TABLE_FILTERED_CHANGED = 'TABLE_FILTERED_CHANGED';
export const TABLE_RESIZED_CHANGED = 'TABLE_RESIZED_CHANGED';

export interface TableRequestParams {
  page: number;
  pageSize: number;
  sorted: SortingRule[];
  filtered: Filter[];
}

interface TableRequestResult {
  data: transaction[];
  pages: number;
}

function dataRequestStarted() {
  return { type: DATA_REQUEST_STARTED };
}

function dataRequestFinished(res: TableRequestResult) {
  return { type: DATA_REQUEST_FINISHED, res };
}

function dataRequestError(errors: any) {
  return { type: DATA_REQUEST_ERROR, errors };
}

export function dataRequest(tableParams: TableRequestParams) {
  return (dispatch: Function) => {
    dispatch(dataRequestStarted());
    const requst = fetch('/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableParams)
    }).then(res => {
      return res.json();
    });

    return requst
      .then(res => {
        dispatch(dataRequestFinished(res));
      })
      .catch(err => {
        dispatch(dataRequestError(err));
      });
  };
}

export function pageChanged(pageIndex: number) {
  return { type: TABLE_PAGE_CHANGED, pageIndex };
}

export function pageSizeChanged(pageSize: number, pageIndex: number) {
  return { type: TABLE_PAGE_SIZE_CHANGED, pageSize, pageIndex };
}

export function sortedChanged(newSorted: SortingRule[]) {
  return { type: TABLE_SORTED_CHANGED, newSorted };
}

export function filteredChanged(filtered: Filter[]) {
  return { type: TABLE_FILTERED_CHANGED, filtered };
}

export function resizedChanged(newResized: Resize[]) {
  return { type: TABLE_RESIZED_CHANGED, newResized };
}
