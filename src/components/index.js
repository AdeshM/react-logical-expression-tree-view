import React from 'react';
import PropTypes from 'prop-types';
import {castArray} from 'lodash';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import {randomString} from '../util';
import {Ul} from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

import { Container, Grid, Paper, Box, IconButton } from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from '../themes/styles2';


const TreeBeard = ({
    animations, decorators, data, onToggle, style, onSelect, customStyles, actionHandler, /* onChange */
}) => {
    const useStyles = makeStyles((theme) => styles(theme));
    const classes = useStyles();
    const path = [];
    return (
        // <Ul style={{...defaultTheme.tree.base, ...style.tree.base}}>
        <Grid container spacing={3} /* className={`${classes.nodeC} ${classes.operator}`} */ >
            {castArray(data).map((node, index) => (
            <TreeNode
                decorators={decorators}
                node={node}
                onToggle={onToggle}
                animations={animations}
                onSelect={onSelect}
                customStyles={customStyles}
                key={node.id || randomString()}
                style={{...defaultTheme.tree.node, ...style.tree.node}}
                    actionHandler={actionHandler}
                    treeIndex={index}
                    path={path}
                    // onChange={onChange}
            />
        ))}
        </Grid>
        // </Ul> */
);
};

TreeBeard.propTypes = {
    style: PropTypes.object,
    customStyles: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    decorators: PropTypes.object,
    actionHandler: PropTypes.func,
    // onChange: PropTypes.func,
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
    customStyles: {}
};

export default TreeBeard;
