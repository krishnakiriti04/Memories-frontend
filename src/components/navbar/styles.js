import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        color: "white",
    },
    listitem: {
        fontFamily: "sanserif",
        fontSize: "24px",
        paddingLeft: "10px",
        paddingRight: "10px",
        textTransform: "uppercase",
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px",
            paddingLeft: "4px",
            paddingRight: "4px",
        },
    },
    rightItems: {
        marginRight: "4px",
        textTransform: "capitalize",
        display: "flex",
        justifycontent: "spaceBetween",
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px",
            marginRight: "0px",
            padding: "0px"
        },
    },
    navLeft: {

        display: "flex",
        [theme.breakpoints.down('xs')]: {
            marginRight: "0px",
            padding: "0px"
        },
    },
    navRight: {
        display: "flex",
        marginLeft: "auto",
        justifycontent: "spaceBetween"
    },
    toolbar: {
        display: "flex",
        justifycontent: "spaceBetweem"
    }

}))