import React from 'react';
import App from '../App';
import { render } from 'react-testing-library';

describe('<App />', () => {
	it('should render the component', () => {
		const { getByText } = render(<App />);
		expect(getByText('Hi my world')).toBeTruthy();
	});
})