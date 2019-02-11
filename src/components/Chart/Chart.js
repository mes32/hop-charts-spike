import axios from 'axios';
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

import './Chart.css';

const numIntervals = 200;

class myChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [''],
                datasets: [
                    {
                        label: 'Alpha Acid',
                        data: [0],
                        backgroundColor: 'rgba(200, 200, 200, 0.6)',
                    }
                ],
            }
        };
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/hops',
        }).then((response) => {
            const hopsArray = response.data;
            this.props.setHops(hopsArray);
            const distribution = this.sumPDF(hopsArray);
            const index = 16;
            const selected = this.getSelectedData(hopsArray, index);
            this.setState({
                chartData: {
                    labels: distribution.labels,
                    datasets: [
                        {
                            label: selected.label,
                            data: selected.data,

                            // Changes this dataset to become a line
                            type: 'line',
                            backgroundColor: 'rgba(200, 200, 200, 0)',
                            borderColor: 'rgba(100, 100, 250, 1)',
                            borderWidth: 5,
                            pointRadius: 0,
                            pointHoverRadius: 0,
                        }, {
                            label: 'Alpha Acid',
                            data: distribution.data,
                            backgroundColor: 'rgba(200, 200, 200, 0.6)',
                        }
                    ],
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    // Compute the sum of the probability density functions (p.d.f.) for all 
    // hops in the input array (over a given hop compound)
    sumPDF = (hopsArray) => {
        const hops = hopsArray.filter(hop => hop.alpha_acid_min && hop.alpha_acid_max);
        let maxCompound = 0;
        for (let hop of hops) {
            if (hop.alpha_acid_max > maxCompound) {
                maxCompound = hop.alpha_acid_max;
            }
        }
        const intervalWidth = maxCompound / numIntervals;

        // For each sample interval compute the sum of all hop p.d.f.
        // and set the corresponding label
        let data = new Array(numIntervals);
        let labels = new Array(numIntervals);
        for (let i = 0; i < numIntervals; i++) {
            const x = i * intervalWidth;
            if (i % 20 === 0) {
                labels[i] = Number.parseFloat(x).toPrecision(2);
            } else {
                labels[i] = '';
            }
            data[i] = 0;
            for (let hop of hops) {
                const hop_mean = (hop.alpha_acid_min + hop.alpha_acid_max) / 2.0;
                const hop_stdev = (hop.alpha_acid_max - hop.alpha_acid_min) / 6.0;
                data[i] += this.normalPDF(x, hop_mean, hop_stdev);
            }
        }

        // Normalize sum of probability density functions (p.d.f.) 
        // to the range 0 to 1
        const maxDensity = Math.max(...data);
        data = data.map((hop) => hop / maxDensity);
        
        return {
            labels,
            data
        };
    }

    getSelectedData = (hopsArray, index) => {
        const selectedHop = hopsArray[index];
        const label = selectedHop.variety_name;
        let data = new Array(numIntervals);
        data = data.map(x => NaN);

        // TODO: It is pretty ugly to include this functionality this way
        // !!!!
        const hops = hopsArray.filter(hop => hop.alpha_acid_min && hop.alpha_acid_max);
        let maxCompound = 0;
        for (let hop of hops) {
            if (hop.alpha_acid_max > maxCompound) {
                maxCompound = hop.alpha_acid_max;
            }
        }
        const intervalWidth = maxCompound / numIntervals;
        // !!!!

        for (let i = 0; i < numIntervals; i++) {
            const x = i * intervalWidth;
            if (x >= selectedHop.alpha_acid_min && x <= selectedHop.alpha_acid_max) {
                data[i] = 0.5;
            }
        }

        return {
            label,
            data
        };
    }

    normalPDF = (x, mean, stdev) => {
        const coefficient = 1.0 / Math.sqrt(2 * Math.PI * Math.pow(stdev, 2));
        const exponent = (-1 * Math.pow(x - mean, 2)) / (2 * Math.pow(stdev, 2));
        return coefficient * Math.exp(exponent);
    }

    render() {
        return (
            <div className="chart-container">
                <div className="chart">
                    <Bar 
                        data={this.state.chartData}
                        width={100}
                        height={60}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    barPercentage: 1,
                                    categoryPercentage: 1,
                                }]
                            },
                            tooltips: {
                                enabled: false,
                            },
                            legend: {
                                display: false,
                            },
                            animation: {
                                duration: 1000,
                                easing: 'easeOutBounce',
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default myChart;