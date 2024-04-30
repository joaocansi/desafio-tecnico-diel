'use client';

import { Box, TextField } from '@mui/material';
import { pt } from 'yup-locale-pt';

import Button from '@/components/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import authenticateUser from '@/server/usecases/authenticate-user.usecase';
import messages from '@/utils/default-messages';

import React, { useState } from 'react';
import * as Yup from 'yup';

Yup.setLocale(pt);

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    toast.promise(authenticateUser({ email, password }), {
      error: (err) => err.message,
      loading: messages.loading,
      success: () => {
        router.push('/');
        return 'Logado com sucesso!';
      },
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Logo />
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          width: '90%',
          maxWidth: '350px',
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <TextField
          name="email"
          label="Digite seu e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          name="password"
          label="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit">Entrar</Button>
        <Link href="/registrar">
          <Button sx={{ width: '100%' }} variant="outlined" color="success">
            Criar Conta
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
