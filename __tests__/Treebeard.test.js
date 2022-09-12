import React from 'react';
import {shallow} from 'enzyme';

import ExpressionTreeView from '../src/components';
import data from './mocks/data';

const renderComponent = (props = {}) => {
    const wrapper = shallow(
        <ExpressionTreeView data={props.data || data} {...props}/>
    );
    wrapper.treeNode = () => wrapper.find('TreeNode');
    return wrapper;
};

describe('<ExpressionTreeView/>', () => {
    it('should match default snapshot', () => {
        const wrapper = renderComponent();
        expect(wrapper).toMatchSnapshot();
    });
});
