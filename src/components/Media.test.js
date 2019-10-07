import React from 'react';
import { mount, shallow } from 'enzyme';
import Media from './Media';

describe('Media tests', () => {

    it('should exist', () => {
        const wrapper = shallow(<Media />);
        expect(wrapper.exists()).toBe(true);
    })

})