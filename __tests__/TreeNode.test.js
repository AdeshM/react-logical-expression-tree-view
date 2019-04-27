import React from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../src/components/TreeNode';
import defaultTheme from '../src/themes/default';
import defaultAnimations from '../src/themes/animations';
import defaultDecorators from '../src/components/Decorators';
import data from '../example/data';

const clickFn = jest.fn();

const renderComponent = (props = {}) => <TreeNode
    node={data}
    decorators={defaultDecorators}
    animations={defaultAnimations}
    style={defaultTheme}
    {...props}
/>;

const simulateClickOnButton = wrapper => wrapper.find('NodeHeader').simulate('click');

describe('<TreeNode/>', () => {
    describe('when onToggle function is called', () => {
        test('should call correctly', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            simulateClickOnButton(wrapper);
            expect(clickFn).toHaveBeenCalled();
        });
        test('should return a node selected', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            clickFn.mockReturnValue(data);
            simulateClickOnButton(wrapper);
            expect(clickFn()).toEqual(data);
        });
        test('should return toggled boolean on false', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            clickFn.mockImplementation((node, toggled) => toggled);
            simulateClickOnButton(wrapper);
            expect(clickFn.mock.calls[0][1]).toBe(false);
        });
    });
    describe('Drawer when toggled is false', () => {
        test('should be children size equal to zero', () => {
            const wrapper = shallow(renderComponent({node: {...data, toggled: false}}));
            expect(wrapper.find('Drawer').children().length).toBe(0);
        })
    });
    describe('animations method', () => {
        describe('animations and node toggled are false', () => {
            test('should return a toggle object with an animation with rotateZ 0 and duration zero', () => {
                const wrapper = shallow(renderComponent({animations: false, node: {...data, toggled: false}}));
                const instance = wrapper.instance();
                const animations = instance.animations();
                expect(animations).toEqual({
                    toggle: {
                        animation: {rotateZ: 0},
                        duration: 0
                    }
                });
            })
        });
        describe('animations are false and node toggled is true', () => {
            test('should return a toggle object with an animation with rotateZ 90 and duration zero', () => {
                const wrapper = shallow(renderComponent({animations: false}));
                const instance = wrapper.instance();
                const animations = instance.animations();
                expect(animations).toEqual({
                    toggle: {
                        animation: {rotateZ: 90},
                        duration: 0
                    }
                });
            })
        });
    });
    describe('decorators method', () => {
        test('should return defaultDecorators if node decorators not exists', () => {
            const wrapper = shallow(renderComponent({animations: false}));
            const instance = wrapper.instance();
            const decorators = instance.decorators();
            expect(decorators).toEqual(defaultDecorators);
        });
    })
});
