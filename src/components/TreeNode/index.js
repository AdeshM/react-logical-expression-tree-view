import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {isArray, isFunction} from 'lodash';

import defaultAnimations from '../../themes/animations';
import {randomString} from '../../util';
import NodeHeader from '../NodeHeader';
import Drawer from './Drawer';
import Loading from './Loading';

import { Grid } from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from '../../themes/styles2';


// const Li = styled('li', {
//     shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
// })(({style}) => style);

class TreeNode extends PureComponent {
    onClick() {
        const {node, onToggle} = this.props;
        if (onToggle) {
            onToggle(node, !node.toggled);
        }
    }

    animations() {
        const {animations, node} = this.props;
        if (!animations) {
            return {
                toggle: defaultAnimations.toggle(this.props, 0)
            };
        }
        const animation = Object.assign({}, animations, node.animations);
        return {
            toggle: animation.toggle(this.props),
            drawer: animation.drawer(this.props)
        };
    }

    decorators() {
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    // operator content - via styles
    createOperatorContentClass(operator) {
        const classes2 = makeStyles({
            operator: {
                '&::before': {
                    content: `"${operator}"`,
                }
            }
        })();
        return classes2.operator;
    }

    createPath() {
        const {path, treeIndex} = this.props;
        // console.log(treeIndex, path);
        return [...path, treeIndex];
    }

    renderChildren(decorators, path) {
        const {
            animations, decorators: propDecorators,
            node, style, onToggle, onSelect, customStyles, actionHandler,
            onSelectConnector,
        } = this.props;

        // console.log(this.props.path, path);


        if (node.loading) {
            return (
                <Loading decorators={decorators} style={this.props.classes}/>
            );
        }

        let children = node.children;
        if (!isArray(children)) {
            children = children ? [children] : [];
        }

        // const useStyles = makeStyles((theme) => styles(theme));
        // const classes = useStyles();
        // operator content - via styles
        /* const classes2 = makeStyles({
            operator: {        
                '&::before': {
                    content: `"${node.operator}"`,
                }
            }
        })(); */

        const { classes } = this.props;

        return (
            // <>
            <Grid item xs={12} className={classes.nodeL} /* onClick={onSelect} */ >
                {/* <> */}
                { children.length > 1 &&
                    <div className={classes.operator} /* onClick={onSelectConnector} */
                        onClick={ () => {
                            // console.log('Hello Bamiyooo!', e, children, path);
                            return (typeof onSelectConnector === 'function')
                                ? onSelectConnector(children, path)
                                : undefined;
                        } }
                    >
                        {node.operator}
                    </div>
                }
                <Grid container spacing={3}
                    className={`${classes.nodeC} `}>
                    {/* ${this.createOperatorContentClass(node.operator)}`} > */}
                    {children.map((child, childIndex) => { /* console.log(child); */ return (
                        <TreeNode
                            onSelect={onSelect}
                            onToggle={onToggle}
                            animations={animations}
                            style={style}
                            customStyles={customStyles}
                            decorators={propDecorators}
                            key={child.id || randomString()}
                            node={child}
                            classes={classes}
                            actionHandler={actionHandler}
                            treeIndex={childIndex}
                            path={path}
                            onSelectConnector={onSelectConnector}
                        />
                    );})}
                </Grid>
                {/* </> */}
            </Grid>
            // </>
        );
    }

    render() {
        const {
            node, style, onSelect, customStyles, actionHandler, treeIndex, onSelectConnector
        } = this.props;
        const decorators = this.decorators();
        const animations = this.animations();
        const path = this.createPath();
        const {...restAnimationInfo} = animations.drawer;

        const { classes } = this.props;
        return (
            <>
                <NodeHeader
                    decorators={decorators}
                    animations={animations}
                    node={node}
                    style={style}
                    customStyles={customStyles}
                    onClick={() => this.onClick()}
                    onSelect={isFunction(onSelect) ? (() => onSelect(node, path)) : undefined}
                    classes={classes}
                    actionHandler={ isFunction(actionHandler)
                        ? ((e, newNode) => actionHandler(e, newNode || node, treeIndex, path))
                        : undefined }
                    treeIndex={treeIndex}
                    path={path}
                    onSelectConnector={isFunction(onSelectConnector)
                        ? (() => onSelectConnector(node, path))
                        : undefined
                    }
                />
                <Drawer restAnimationInfo={{...restAnimationInfo}}>
                    {node.toggled ? this.renderChildren(decorators, path, node, onSelectConnector, animations) : null}
                </Drawer>
            </>
        );
    }
}

TreeNode.propTypes = {
    onSelect: PropTypes.func,
    onToggle: PropTypes.func,
    style: PropTypes.object.isRequired,
    customStyles: PropTypes.object,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    classes: PropTypes.object,
    actionHandler: PropTypes.func,
    treeIndex: PropTypes.number,
    path: PropTypes.array,
    onSelectConnector: PropTypes.func
};

TreeNode.defaultProps = {
    customStyles: {}
};

// export default TreeNode;
export default withStyles(styles)(TreeNode);
