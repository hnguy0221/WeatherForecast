import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(data) {
        const highTemps = data.daily.data.map(weather => weather.temperatureHigh);
        //console.log(highTemps);
        const lowTemps = data.daily.data.map(weather => weather.temperatureLow);
        //console.log(lowTemps);
        const pressures = data.daily.data.map(weather => weather.pressure);
        const humidities = data.daily.data.map(weather => 100 * weather.humidity);
        //console.log(humidities);
        const { latitude, longitude } = data;

        return (
            <tr key={data.latitude}>
                <td>
                    <GoogleMap latitude={latitude} longitude={longitude} />
                </td>
                <td>
                    <Chart data={highTemps} color="orange" units="F" />
                </td>
                <td>
                    <Chart data={lowTemps} color="blue" units="F"/>
                </td>
                <td>
                    <Chart data={pressures} color="green" units="hPa" />
                </td>
                <td>
                    <Chart data={humidities} color="black" units="%" />
                </td>
            </tr>
        );
    }
    render() {
        //console.log(this.props.weather);
        return (
        	<div className="row">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Avg Temperature High (F)</th>
                            <th>Avg Temperature Low (F)</th>
                            <th>Avg Pressure (hPa)</th>
                            <th>Avg Humidity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weather.map(this.renderWeather)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateTopPros(state) {
    return { weather: state.weather }
}

export default connect(mapStateTopPros)(WeatherList);