import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 55px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
    },
    listItem: {
        cursor: 'pointer'
    },
    newChatBtn: {
        borderRadius: '0px'
    },
    unreadMessage: {
        color: 'red',
        position: 'absolute',
        top: '20px',
        right: '20px'
    }
}))