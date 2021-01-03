import React,{useState} from 'react'
import useStyles from "./styles"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from "react-router-dom";
import firebase from "firebase";

const Login = ()=> {
    const classes = useStyles();
    const history = useHistory();

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [serverError, setServerError] = useState(false);

    const submitLogin = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(()=>{
                history.push("/");
            },(err)=>{
                setServerError(true);
            })

    }
    
    return (
        <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In!
          </Typography>
          <form onSubmit={(e) => submitLogin(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
              <Input autoComplete='email' autoFocus onChange={(e) => setEmail(e.target.value)} id='login-email-input'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
              <Input autoComplete="current-password" type="password" onChange={(e) => setPassword(e.target.value)} id='login-password-input'></Input>
            </FormControl>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
          </form>
          { serverError ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              Incorrect Login Information
            </Typography> :
            null
          }
          <h5 className={classes.noAccountHeader}>Don't Have An Account?</h5>
          <Link className={classes.signUpLink} to='/signup'>Sign Up!</Link>
        </Paper>
      </main>
    )
}

export default Login
