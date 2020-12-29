import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer"
    },
    chatbtn: {
        cursor: "pointer"
    },
    navitems: {
        flexGrow: 1,
        display: "flex",
        justifycontent: "flexStart"
    }
}))