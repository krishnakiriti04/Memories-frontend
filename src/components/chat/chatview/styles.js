import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    content: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '110px',
        width: 'calc(100% - 300px)',
        position: 'absolute',
        backgroundColor: 'white'
    },
    userSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    chatHeader: {
        width: 'calc(100% - 301px)',
        top: "61px",
        height: '50px',
        display: "flex",
        justifycontent: "spaceBetween",
        alignitems: "flex-start",
        backgroundColor: '#344195',
        position: 'absolute',
        marginLeft: '301px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '5px',
        paddingBottom: '5px',
        boxSizing: 'border-box'
    },

    sender: {
        color: "white",
        paddingLeft: "10px",
        paddingTop: '5px',
        paddingBottom: '5px',
    }
}))