import React, { Component } from 'react';
import Input from './Input';
import FlexView from 'react-flexview';

class CodeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log('A value was submitted: ' + event.target.value + ' on field ' + event.target.name);
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (

            <form className="container" onSubmit={this.handleSubmit}>
                <FlexView>
                    <Input type={'text'}
                        name={'value1'}
                        value={this.state.value1}
                        placeholder={'XX'}
                        handleChange={this.handleInputChange}
                    />
                    <Input type={'text'}
                        name={'value2'}
                        value={this.state.value2}
                        placeholder={'XX'}
                        handleChange={this.handleInputChange}
                    />
                    <Input type={'text'}
                        name={'value3'}
                        value={this.state.value3}
                        placeholder={'XX'}
                        handleChange={this.handleInputChange}
                    />
                    <Input type={'text'}
                        name={'value4'}
                        value={this.state.value4}
                        placeholder={'XX'}
                        handleChange={this.handleInputChange}
                    />
                    <Input type={'text'}
                        name={'value5'}
                        value={this.state.value5}
                        placeholder={'XX'}
                        handleChange={this.handleInputChange}
                    />
                </FlexView>
                <input type="submit" value="Submit" />

            </form>

        );
    }
}

export default CodeInput;