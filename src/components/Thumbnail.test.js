import React from 'react';
import { mount } from 'enzyme';
import Thumbnail from './Thumbnail';

describe('Run thumbnail tests', () => {

    it('Should mount successfully', () => {
        mount(<Thumbnail />);
    })

})