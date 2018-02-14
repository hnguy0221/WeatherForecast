import _ from 'lodash';
import React, { Component } from 'react';
//import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';
import { reduxForm } from 'redux-form';

const FIELDS = {
    latitude: { 
        type: 'input', 
        label: 'Latitude'
    },
    longitude: { 
        type: 'input', 
        label: 'Longitude'
    }
};

class SearchBar extends Component {

    onFormSubmit(values) {
        //we need to go and fetch weather data
        this.props.fetchWeather(values.latitude, values.longitude);
    }

    renderField(fieldConfig, field) {//fieldConfig is configuration object which consists of the label and type and field is the name of the field
        const fieldHelper = this.props.fields[field];
        //console.log(fieldHelper);

        return (
            <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
                <div className="text-help">
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        );
    }

    render() {
        //console.log(this.props); 
        const { handleSubmit } = this.props; //this.props comes from by redux form

        return (
            <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} className="input-group">
                <h3>Searching for current weather for the next 7 days</h3>
                {_.map(FIELDS, this.renderField.bind(this))}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

function validate(values) {
    const errors = {}; //empty object means nothing wrong with the form. If errors has any properties, redux form assumes form is invalid

    //validate the inputs from 'values' object
    _.each(FIELDS, (type, field) => {//type is configuration object and field is 'latitude' or 'longitude'
        if (!values[field]) {
            errors[field] = `Enter a ${field}!`;
        }
    });

    return errors; //if errors is empty, the form is fine to submit. if errors has any properties, redux form assumes form is invalid
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
    form: 'SearchBarForm',
    fields: _.keys(FIELDS), //this will yield ['latitude', 'longitude']
    validate
}, null, mapDispatchToProps)(SearchBar);