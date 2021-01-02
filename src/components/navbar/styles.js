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
        textTransform: "uppercase"
    },
    navLeft: {
        display: "flex",
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