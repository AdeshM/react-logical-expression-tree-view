/* const style = {
    padding: 5,
    display: 'flex',
    alignItems: 'center', 
    border: '1px solid black'
} */

const txColor = '#0787AC';
const lineColor = '#A4AFB7DE';
const lineSize = 5;

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    nodeC: {
        position: 'relative',
        paddingLeft: '3rem',

        '&:before': {
            content: '" AND "',
            border: `1px solid ${lineColor}`,
            padding: '0.1rem 0.5rem',
            borderRadius: '1rem',
            marginLeft: `-${lineSize*1.5}%`,
            zIndex: 11,

            // top: '50%',
            top: `calc(50% - ${10}px)`,
            position: 'absolute',
            background: `${txColor}`,
            color: '#FFF',
        }
    },

    nodeL: {
        position: 'relative',

        '&::before': {
            borderLeft: `1px solid ${lineColor}`,
            content: '" "',

            position: 'absolute',
            zIndex: 1,
            height: '100%',
            marginLeft: `-${lineSize}%`,
            top: 0,
        },

        '&:first-child::before': {
            height: '50%',
            top: '50%',
            content: '" "',
        },
        
        // '&>div:nth-child(1)::before': {
        // '&~div :first-child::before': {
        //     /* height: '50%',
        //     top: '50%', */
        //     content: '" ZZZ "',
        //     background: '#F00',
        // },

        '&:last-child::before': {
            // background: '#000',
            content: '" "',
            height: '50%',
        },

        '&::after': {
            borderTop: `1px solid ${lineColor}`,
            content: '" "',
            position: 'absolute',

            top: '50%',
            width: `${lineSize}%`,
            height: '1px',
            marginLeft: `-${lineSize}%`,
        },

    },


    paper: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1)/2,
        paddingBottom: theme.spacing(1)/2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    taxonomy: {
        fontWeight: 600,
        color: `${txColor}`,
        '&:hover': {
            color: `${txColor}`,
        }
    }
});

export default styles;