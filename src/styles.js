import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '5px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    image: {
        marginLeft: '15px',
    },
    gridItemPosts: {
        display: "flex",
        justifyContent: "center"
    },
    container: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column-reverse"
        },
    }

}));