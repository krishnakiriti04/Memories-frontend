import React,{useState} from 'react'
import useStyles from "./styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from "react-router-dom";
import firebase from "firebase"


function Signup() {

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [passwordconfirmation,setPasswordconfirmation] = useState(null);
    const [signupError,setSignuperror] = useState("");
    const classes = useStyles();
    const history = useHistory();

    const formIsValid = () => password === passwordconfirmation;

    const submitSignup = (e) =>{
        e.preventDefault();
        if(!formIsValid()){
            setSignuperror("Passwords did not match!");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then(authRes=>{
                console.log(authRes);
                const userObj = {
                    email : authRes.user.email
                };
                firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .set(userObj)
                    .then(()=>{
                        history.push("/login");
                    }, (dbError)=>{
                        console.log(dbError);
                        setSignuperror("Error while adding user to DB")
                    })
                },(authError)=>{
                    console.log(authError);
                    setSignuperror("Failed to add user");
                })
    }

    return (
        <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={(e) => submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
              <Input autoFocus onChange={(e) => setEmail(e.target.value)} id='signup-email-input'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} id='signup-password-input'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
              <Input type="password" onChange={(e) => setPasswordconfirmation(e.target.value)} id='signup-password-confirmation-input'></Input>
            </FormControl>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
          </form>
          { 
            signupError ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              {signupError}
            </Typography> :
            null
          }
          <h5 className={classes.hasAccountHeader}>Already Have An Account?</h5>
          <Link className={classes.logInLink} to='/login'>Log In!</Link>
        </Paper>
      </main>
    )
}

export default Signup
