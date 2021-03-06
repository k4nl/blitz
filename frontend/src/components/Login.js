import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserContext from '../context/UserContext';

export default function Login() {

  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (passwordError) {
      setPasswordError(true);
    }

    if (emailError) {
      setEmailError(true);
    }

    if (email && password) {
      const errorMessage = await logIn({ email, password });
      if (!errorMessage) {
        navigate('/task', { replace: true });
      } else {
        global.alert(errorMessage);
      }
    }
  }
  return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={ handleSubmit }
      >
        <div>
         <TextField
          required
          label="Email"
          type="email"
          onChange={ (e) => setEmail(e.target.value)}
          error={emailError}
        />
         <TextField
          required
          type="password"
          label="Password"
          onChange={ (e) => setPassword(e.target.value)}
          error={passwordError}
        />
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 4}}>
        <Button
          onClick={ (e) => handleSubmit(e)}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Login
        </Button>
        <Button
          onClick={ () => navigate('/sign', { replace: true })}
          type="button"
          color="primary"
          variant="contained"
        >
          Create user
        </Button>
        </Box>
      </Box>
  )
}
