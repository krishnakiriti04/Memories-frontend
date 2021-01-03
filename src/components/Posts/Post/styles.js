import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    cardcontent: {
        padding: "4px 16px"
    },
    media: {
        height: "75px",
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    border: {
        border: 'solid',
    },
    fullHeightCard: {
        height: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
    },
    title: {
        padding: '0 16px',
    },
    cardActions: {
        padding: '0 0px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardheader: {
        backgroundColor: "#4c4c4c",
        color: "white"
    },
    sendBtn: {
        color: 'blue',
        cursor: 'pointer',
        '&:hover': {
            color: 'gray'
        }
    },
    chatTextBoxContainer: {
        marginTop: "10px",
        boxSizing: 'border-box',
        overflow: 'auto',
        // width: 'calc(100% - 300px - 50px)',
    },
    chatTextBox: {
        width: 'calc(100% - 25px)',
    },
    comments: {
        marginTop: "5px",
        maxHeight: "50px",
        overflow: "auto"
    }
});