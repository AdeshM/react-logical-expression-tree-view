import React from 'react';
import PropTypes from 'prop-types';
// import styled from '@emotion/styled';

import {Div} from '../common';
import { withStyles } from '@material-ui/core/styles';

// const Polygon = styled('polygon', {
//     shouldForwardProp: prop => ['className', 'children', 'points'].indexOf(prop) !== -1
// })((({style}) => style));

const styles = () => ({
    root: {
    },
    operator: {
        transform: 'rotateZ(0deg)',
        top: '49%',
        position: 'absolute',
        zIndex: 111,
        border: '1px solid #FFF',
        padding: '0.1rem 0.5rem',
        borderRadius: '1rem',
        background: '#666',
        left: '8.5%',
    }
});

const Toggle = ({style, onClick, node, classes}) => {
    // const {height, width} = style;
    // const midHeight = height * 0.5;
    // const points = `0,0 0,${height} ${width},${midHeight}`;
    // const { classes } = this.props;

    return (
        // <div style={style.base} onClick={onClick}>
        //     <Div style={style.wrapper}>
        //         {/* <svg {...{height, width}}>
        //             <Polygon points={points} style={style.arrow}/>
        //         </svg> */}
        //     </Div>
        // </div>
        <div  onClick={onClick} className={classes.operator}
            style={{'visibility': 'hidden'}}>
            {node.operator}
        </div>
        // <></>
    );
};

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
    node: PropTypes.object,
    classes: PropTypes.any,
};

export default withStyles(styles)(Toggle);
