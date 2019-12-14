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
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this);

        this.value1 = React.createRef();
        this.value2 = React.createRef();
        this.value3 = React.createRef();
        this.value4 = React.createRef();
        this.value5 = React.createRef();
    }

    isASCII(str) {
        return str.replace(/[^\x20-\x7E]/g, '')!=='';
    }

    handleKeyPress(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const code = event.key;
        const name = target.name;

        console.log(code);

        if (value==='' && code==='Backspace') {
            this.focusLeft(target);
        } else if (value!=='' && code==='Backspace') {
            this.setState({
                [name]: ''
            });
        } else if (code==='ArrowLeft') {
            this.focusLeft(target);
        } else if (code==='ArrowRight') {
            this.focusRight(target);
        } else if (value!=='' && this.isASCII(code)) {
            this.setState({
                [name]: code
            });
            this.focusRight(target);
        }
    }

    focusRight(target) {
        if (target === this.value1.current) {
            this.value2.current.focus();
        } else if (target === this.value2.current) {
            this.value3.current.focus();
        } else if (target === this.value3.current) {
            this.value4.current.focus();
        } else if (target === this.value4.current) {
            this.value5.current.focus();
        }
    }

    focusLeft(target) {
        if (target === this.value5.current) {
            this.value4.current.focus();
        } else if (target === this.value4.current) {
            this.value3.current.focus();
        } else if (target === this.value3.current) {
            this.value2.current.focus();
        } else if (target === this.value2.current) {
            this.value1.current.focus();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log('A value was submitted: ' + value+ ' on field ' + name);

        // // move focus forward on typing
        // if (value.length === target.maxLength) {
        //     this.focusRight(target);
        // // move focus backward on deleting
        // } else if (value.length === 0) {
        //     this.focusLeft(target);
        // }
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

    componentDidMount() {
        this.value1.current.focus();
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
                            id="1"
                            ref={this.value1}
                            name={'value1'}
                            value={this.state.value1}
                            handleChange={this.handleInputChange}
                            handleKeyPress={this.handleKeyPress}
                        />
                        <TextInput
                            id="2"
                            ref={this.value2}
                            name={'value2'}
                            value={this.state.value2}
                            handleChange={this.handleInputChange}
                            handleKeyPress={this.handleKeyPress}
                        />
                        <TextInput
                            id="3"
                            ref={this.value3}
                            name={'value3'}
                            value={this.state.value3}
                            handleChange={this.handleInputChange}
                            handleKeyPress={this.handleKeyPress}
                        />
                        <TextInput
                            id="4"
                            ref={this.value4}
                            name={'value4'}
                            value={this.state.value4}
                            handleChange={this.handleInputChange}
                            handleKeyPress={this.handleKeyPress}
                        />
                        <TextInput
                            id="5"
                            ref={this.value5}
                            name={'value5'}
                            value={this.state.value5}
                            handleChange={this.handleInputChange}
                            handleKeyPress={this.handleKeyPress}
                        />
                    </FlexView>
                    {/* <FlexView hAlignContent='center'>
                        <input type="button" value="Clear" onClick={this.clearInput} />
                    </FlexView> */}
                </FlexView>

            </form>

        );
    }
}

export default CodeInput;