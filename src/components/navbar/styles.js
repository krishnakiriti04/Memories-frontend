import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        color: "white",
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
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    },
    navDisplayFlex: {
        flexGrow: 1,
        display: `flex`,
        //justifyContent: `space-between`
    },
    navitems: {
        flexGrow: 1,
        display: "flex",
        justifycontent: "flexStart"
    }
}))