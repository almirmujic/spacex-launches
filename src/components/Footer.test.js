import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer tests', () => {

    it('should exist', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    })

})