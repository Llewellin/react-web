import * as React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

describe('App', () => {
    const app = shallow(<App />);
    describe('render properly', () => {
        it('match snapshot', () => {
            expect(app).toMatchSnapshot();
        });
    });
});
