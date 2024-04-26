'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { pt } from 'yup-locale-pt';
import * as Yup from 'yup';

import Button from '@/components/button';
import Input from '@/components/input';
import Logo from '@/components/logo';
import Link from 'next/link';
import toast from 'react-hot-toast';
import authenticateUser from '@/api/usecases/authenticate-user.usecase';
import { useRouter } from 'next/navigation';

Yup.setLocale(pt);

interface FormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignInValidation = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default function Home() {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SignInValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  async function handleSubmit(values: FormValues) {
    toast.promise(authenticateUser(values), {
      error: (err) => err.message,
      loading: 'Carregando...',
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
        onSubmit={formik.handleSubmit}
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
        <Input name="email" label="Digite seu e-mail" formik={formik} />
        <Input
          name="password"
          label="Digite sua senha"
          type="password"
          formik={formik}
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
