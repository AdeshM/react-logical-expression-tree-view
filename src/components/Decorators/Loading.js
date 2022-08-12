import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Loading = styled(({style}) => (
    <div className={style.nodeL}>loading...</div>
))(({style}) => style);

Loading.propTypes = {
    style: PropTypes.object
};

export default Loading;
