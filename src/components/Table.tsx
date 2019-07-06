import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Wrapper from './Wrapper';

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

interface TableState {
  data: any;
  pages: number;
  loading: boolean;
}

class Table extends Component<{}, TableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      pages: -1,
      loading: false
    };
  }
  render() {
    return (
      <Wrapper>
        <ReactTable
          className='Table'
          columns={columns}
          data={this.state.data}
          pages={this.state.pages}
          loading={this.state.loading}
          manual
          onFetchData={state => {
            this.setState({ loading: true });
            fetch('/data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                page: state.page,
                pageSize: state.pageSize,
                sorted: state.sorted,
                filtered: state.filtered
              })
            })
              .then(res => {
                return res.json();
              })
              .then(res => {
                this.setState({
                  data: res.data,
                  pages: res.pages,
                  loading: false
                });
              });
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

export default Table;
