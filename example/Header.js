import React from 'react';
import PropTypes from 'prop-types';


import { LeafLevel } from './Assets';

import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../src/themes/styles2';


// Example: Customising The Header Decorator To Include Icons
const Header = ({onSelect, node, actionHandler, treeIndex, path, onSelectConnector}) => {
    // const iconType = node.children ? 'folder' : 'file-text';
    // const iconClass = `fa fa-${iconType}`;
    // const iconStyle = {marginRight: '5px'};

    const useStyles = makeStyles((theme) => styles(theme));
    const classes = useStyles();

    return (
        // <div style={style.base} onClick={onSelect}>
        <>
            { !node.children &&
            <Grid item xs={12} className={classes.nodeL} onClick={onSelect}>
                {/* <Div style={node.selected ? {...style.title, ...customStyles.header.title} : style.title}> */}
                {/* //{ node.children &&
                // <i className={iconClass} style={iconStyle}/>
                //<div></div>
                //} */}
                {/* { !node.children && */}
                <LeafLevel {...{groupType: 'Test', groupName: node.name, actionHandler, treeIndex, path,
                    onSelectConnector}
                }/>
                {/* } */}
                {/* </Div> */}
            </Grid>
            }
        </>
        // </div>
    );
};

Header.propTypes = {
    onSelect: PropTypes.func,
    node: PropTypes.object,
    style: PropTypes.object,
    customStyles: PropTypes.object,
    actionHandler: PropTypes.func,
    treeIndex: PropTypes.number,
    path: PropTypes.array,
    onSelectConnector: PropTypes.func,
};

Header.defaultProps = {
    customStyles: {}
};

export default Header;
