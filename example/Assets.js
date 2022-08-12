import React from 'react';
import PropTypes from 'prop-types';

import { Chip, Typography } from '@material-ui/core';
import { Container, Grid, Paper, Box, IconButton } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../src/themes/styles2';

import DeleteIcon from '@material-ui/icons/Clear';


// eslint-disable-next-line react/prop-types
const LeafLevel = ({ groupType, groupName, actionHandler, treeIndex, path /* , actions1 */ }) => {
    const useStyles = makeStyles((theme) => styles(theme));
    const classes = useStyles();

    // const { actions } = nodeProperties;
    // console.log(actions);
    return (
        // <Grid item xs={12} className={classes.nodeL}>
        <Paper className={classes.paper}>
            <Box display="flex">
                <Box flexGrow={1}>
                    <Typography variant='caption'>{groupType}</Typography>
                    <Typography variant='button' component='div' className={classes.taxonomy}>
                        {groupName} - {path} {treeIndex}
                    </Typography>
                </Box>
                <Box>
                    {
                        // 'x'
                        // actions.map((child, index) => (
                        //     cloneElement(child, {key: index})
                        // ))
                    }
                    <IconButton aria-label="delete" size="small" onClick={
                        e => actionHandler(e, treeIndex, path)
                    }>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
        // </Grid>
    );
};

LeafLevel.propTypes = {
    groupType: PropTypes.string,
    groupName: PropTypes.string
};

export {
    LeafLevel
};