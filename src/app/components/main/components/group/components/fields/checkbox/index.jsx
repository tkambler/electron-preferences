'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { newGuid } from '../../../../../../../utils/newGuid';

class CheckboxField extends React.Component {

	render() {

		let { value } = this;
		const { help, label } = this;

		const fieldID = `checkbox_${newGuid()}`;

		const options = this.options.map((option, idx) => {

			// If only a single checkbox is being rendered, this allows you the ability to pass
			// a boolean default value instead of ['value'], for convenience.
			if (typeof value === 'boolean' && this.options.length === 1) {

				value = value ? [ option.value ] : [];

			} else if (typeof value !== 'object') {

				value = [];

			}

			const id = `${fieldID}_${idx}`;
			const checked = value.indexOf(option.value) >= 0;

			return (
				<label htmlFor={ id } className="checkbox-option" key={idx}>
					{ option.label }
					<input type="checkbox" id={ id } onChange={ this.onChange.bind(this) } checked={ checked } />
					<span className="check-square" />
				</label>
			);

		});

		return (
			<div className="field field-checkbox">
				<div className="field-label">{ label }</div>
				{ options }
				{ help && <span className="help">{ help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || [];

	}

	get label() {

		return this.field.label;

	}

	get options() {

		return this.field.options || [];

	}

	get help() {

		return this.field.help;

	}

	onChange(e) {

		let { value } = this;
		const idx = e.target.id.split('_')[2];
		const option = this.options[idx];

		// Coerce values
		if (typeof value === 'boolean' && this.options.length === 1) {

			value = value ? [ option.value ] : [];

		} else if (typeof value !== 'object') {

			value = [];

		}

		if (e.target.checked) {

			if (value.indexOf(option.value) === -1) {

				value.push(option.value);

			}

		} else {

			const valIdx = value.indexOf(option.value);
			if (valIdx > -1) {

				value.splice(valIdx, 1);

			}

		}

		return this.props.onChange(value);

	}

}

CheckboxField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.array,
	onChange: PropTypes.func,
};

export default CheckboxField;
