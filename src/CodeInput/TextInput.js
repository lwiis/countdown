import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
    render() {
        var label;
        if(this.props.title) {
            label = <label htmlFor={this.props.name} className="form-label">{this.props.title}</label>
        }

        return (
            <div className="form-group">
                {label}
                <input
                    className="form-input"
                    id={this.props.name}
                    name={this.props.name}
                    type='text'
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder='X'
                    maxLength='1'
                />
            </div>
        )
    }
}

export default TextInput;