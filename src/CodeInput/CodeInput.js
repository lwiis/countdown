import React, { Component } from 'react';
import TextInput from './TextInput';
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
        this.clearInput = this.clearInput.bind(this);
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

    componentDidUpdate() {
        if (this.state.value1 !== '' 
         && this.state.value2 !== '' 
         && this.state.value3 !== '' 
         && this.state.value4 !== '' 
         && this.state.value5 !== '') {
            console.log('all values specified');
        }
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    clearInput() {
        this.setState({
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
        });
    }

    render() {
        return (

            <form className="container" onSubmit={this.handleSubmit}>
                <FlexView column>
                    <FlexView hAlignContent='center'>
                        <TextInput 
                            name={'value1'}
                            value={this.state.value1}
                            handleChange={this.handleInputChange}
                        />
                        <TextInput 
                            name={'value2'}
                            value={this.state.value2}
                            handleChange={this.handleInputChange}
                        />
                        <TextInput 
                            name={'value3'}
                            value={this.state.value3}
                            handleChange={this.handleInputChange}
                        />
                        <TextInput 
                            name={'value4'}
                            value={this.state.value4}
                            handleChange={this.handleInputChange}
                        />
                        <TextInput 
                            name={'value5'}
                            value={this.state.value5}
                            handleChange={this.handleInputChange}
                        />
                    </FlexView>
                    <FlexView hAlignContent='center'>
                        <input type="button" value="Clear" onClick={this.clearInput}/>
                    </FlexView>
                </FlexView>

            </form>

        );
    }
}

export default CodeInput;