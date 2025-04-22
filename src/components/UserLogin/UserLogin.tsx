/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Alert, Box, Button, TextField, Snackbar, Typography } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { useQueryPost } from '../../services/hooks/useQueryPost';
import { envConfig } from '../../services/envConfg';
import { IUserTokenPayload, IUserTokenResponse, ServerError } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';

export const UserLogin = () => {
  const auth = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleLoginSuccess = (data: IUserTokenResponse) => {
    // parent should react to the setting of the token
    auth.updateUserToken(data.user_token);
  };

  const handleLoginError = (error: ServerError) => {
    setApiError(`${error.code}: ${error.message} (${error.detail})`);
    setShowToast(true);
  };

  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.USER_TOKEN_POST]({});
  const { mutate, isPending } = useQueryPost<IUserTokenResponse, IUserTokenPayload>({
    url: url,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    isFormData: true,
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
    setEmailError('');
    setApiError('');
    mutate({ username: email, password });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 600, padding: 2 }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Please enter your email and password to log in:
        </Typography>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          Login
        </Button>
      </Box>
      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowToast(false)} severity="error" sx={{ width: '100%' }}>
          {apiError}
        </Alert>
      </Snackbar>
    </>
  );
};
