import React from 'react';
import ReactTable, { SortingRule, Filter, Resize } from 'react-table';
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

interface IStateProps {
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

const Table: React.FC<IStateProps & typeof mapDispatchToProps> = (props) => {
  const {
    data,
    pages,
    loading,
    page,
    pageSize,
    sorted,
    filtered,
    resized,
    onPageChanged,
    onPageSizeChanged,
    onSortedChanged,
    onFilteredChanged,
    onResizedChanged,
    onFetchData
  } = props;

  return (
    <Wrapper>
      <ReactTable
        className='Table'
        columns={columns}
        data={data}
        pages={pages}
        loading={loading}
        manual
        onFetchData={onFetchData}
        page={page}
        pageSize={pageSize}
        sorted={sorted}
        filtered={filtered}
        resized={resized}
        onPageChange={onPageChanged}
        onPageSizeChange={onPageSizeChanged}
        onSortedChange={onSortedChanged}
        onFilteredChange={onFilteredChanged}
        onResizedChange={onResizedChanged}
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
};

function mapStateToProps(state: any): IStateProps {
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

const mapDispatchToProps = {
  onPageChanged: pageChanged,
  onPageSizeChanged: pageSizeChanged,
  onSortedChanged: sortedChanged,
  onFilteredChanged: filteredChanged,
  onResizedChanged: resizedChanged,
  onFetchData: (state: any) =>
    dataRequest({
      page: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
};

export default connect<IStateProps>(mapStateToProps, mapDispatchToProps)(Table);
