import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

import './Chart.css';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Centennial'],
                datasets: [
                    {
                        label: 'Alpha Acid',
                        data: [
                            100
                        ],
                        backgroundColor: [
                            'rgba(0, 0, 0, 0.2)'
                        ]
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="chart-container">
                <div className="chart">
                    <Bar 
                        data={this.state.chartData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Chart;