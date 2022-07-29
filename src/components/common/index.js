import styled from '@emotion/styled';

export const Div = styled('div', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));

export const Ul = styled('ul', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));


export const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);
