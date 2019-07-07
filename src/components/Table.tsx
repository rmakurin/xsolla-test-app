import React, { Component } from 'react';
import ReactTable, { SortingRule, Filter, Resize } from 'react-table';
import 'react-table/react-table.css';
import Wrapper from './Wrapper';
import {
  dataRequest,
  pageChanged,
  pageSizeChanged,
  sortedChanged,
  filteredChanged,
  resizedChanged
} from '../redux/actions/tableActions';
import { connect } from 'react-redux';
import { transaction } from '../itansaction';

const dateFormatter = (date: Date) => {
  return `${date.getFullYear()}/\
${`0${date.getMonth() + 1}`.slice(-2)}/\
${`0${date.getDate()}`.slice(-2)} - \
${`0${date.getHours()}`.slice(-2)}:\
${`0${date.getMinutes()}`.slice(-2)}:\
${`0${date.getSeconds()}`.slice(-2)}`;
};

const columns = [
  {
    id: 'projectName',
    Header: 'Проект',
    accessor: 'transaction.project.name',
    filterable: true
  },
  {
    id: 'paymentName',
    Header: 'Платежная система',
    accessor: 'transaction.payment_method.name',
    filterable: true
  },
  {
    id: 'status',
    Header: 'Статус',
    accessor: 'transaction.status',
    filterable: true
  },
  {
    id: 'userName',
    Header: 'Пользователь',
    accessor: 'user.name',
    filterable: true
  },
  {
    id: 'date',
    Header: 'Дата',
    accessor: (d: any) => dateFormatter(new Date(d.transaction.transfer_date)),
    filterable: true
  }
];

interface TableProps {
  dispatch: Function;
  data: transaction[];
  pages: number;
  loading: boolean;
  errors: null;
  page: number;
  pageSize: number;
  sorted: SortingRule[];
  filtered: Filter[];
  resized: Resize[];
}

class Table extends Component<TableProps, {}> {
  render() {
    return (
      <Wrapper>
        <ReactTable
          className='Table'
          columns={columns}
          data={this.props.data}
          pages={this.props.pages}
          loading={this.props.loading}
          manual
          onFetchData={state => {
            this.props.dispatch(
              dataRequest({
                page: state.page,
                pageSize: state.pageSize,
                sorted: state.sorted,
                filtered: state.filtered
              })
            );
          }}
          page={this.props.page}
          pageSize={this.props.pageSize}
          sorted={this.props.sorted}
          filtered={this.props.filtered}
          resized={this.props.resized}
          onPageChange={pageIndex => {
            this.props.dispatch(pageChanged(pageIndex));
          }}
          onPageSizeChange={(pageSize, pageIndex) => {
            this.props.dispatch(pageSizeChanged(pageSize, pageIndex));
          }}
          onSortedChange={newSorted => {
            this.props.dispatch(sortedChanged(newSorted));
          }}
          onFilteredChange={filtered => {
            this.props.dispatch(filteredChanged(filtered));
          }}
          onResizedChange={newResized => {
            this.props.dispatch(resizedChanged(newResized));
          }}
          previousText={'Назад'}
          nextText={'Вперед'}
          loadingText={'Загрузка...'}
          noDataText={'По Вашему запросу ничего не найдено'}
          pageText={'Страница'}
          ofText={'из'}
          rowsText={'строк'}
        />
      </Wrapper>
    );
  }
}

function mapStateToProps(state: any) {
  const {
    data,
    pages,
    loading,
    errors,
    page,
    pageSize,
    sorted,
    filtered,
    resized
  } = state.table;

  return {
    data,
    pages,
    loading,
    errors,
    page,
    pageSize,
    sorted,
    filtered,
    resized
  };
}

export default connect(mapStateToProps)(Table);
