import React, { Component } from 'react';
import Wrapper from './Wrapper';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { connect } from 'react-redux';
// import { getChartData } from '../redux/actions/chartActions';

const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf'
];

const chartData = [
  {
    name: 'Credit/Debit Cards',
    value: 71
  },
  {
    name: 'QIWI',
    value: 1
  },
  {
    name: 'MobileGo',
    value: 1
  },
  {
    name: 'PayPal',
    value: 15
  },
  {
    name: 'Your Balance',
    value: 8
  },
  {
    name: 'Webmoney',
    value: 2
  },
  {
    name: 'Google Pay',
    value: 2
  },
  {
    name: 'RAZER zGOLD',
    value: 1
  }
];

interface RatingProps {
  dispatch: Function;
  value: number;
}

class Rating extends Component<RatingProps, {}> {
  render() {
    return (
      <Wrapper>
        <div className='Rating'>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 100
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' interval={0} angle={45} dy={40} />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value'>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </Wrapper>
    );
  }
}

function mapStateToProps(state: any) {
  const { value } = state.chart;

  return { value };
}

export default connect(mapStateToProps)(Rating);
