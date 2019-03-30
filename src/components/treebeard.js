import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {castArray} from 'lodash';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import defaultDecorators from './decorators';
import TreeNode from './TreeNode';

const Ul = styled('ul', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));

const TreeBeard = ({animations, decorators, data, onToggle, style}) => (
    <Ul style={{...defaultTheme.tree.base, ...style.tree.base}}>
        {castArray(data).map(node => (
            <TreeNode
                {...{decorators, node, onToggle, animations}}
                key={node.id}
                style={{...defaultTheme.tree.node, ...style.tree.node}}
            />
        ))}
    </Ul>
);

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    decorators: PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;
