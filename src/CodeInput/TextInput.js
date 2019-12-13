import React from 'react';
import './TextInput.css';

//class TextInput extends Component {
const TextInput = React.forwardRef((props, ref) => {
    var label;
    if (props.title) {
        label = <label htmlFor={props.name} className="form-label">{props.title}</label>
    }

    return (
        <div className="form-group">
            {label}
            <input
                id={props.name}
                ref={ref}
                className="form-input"
                name={props.name}
                type='text'
                value={props.value}
                onChange={props.handleChange}
                placeholder='X'
                maxLength='1'
            />
        </div>
    )
});

export default TextInput;