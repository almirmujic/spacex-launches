import React from 'react';
import { mount, shallow } from 'enzyme';
import Thumbnail from './Thumbnail';

describe('Thumbnail tests', () => {

    it('should exist', () => {
        const wrapper = shallow(<Thumbnail />);
        expect(wrapper.exists()).toBe(true);
    })

})