'use client';

import { Box } from '@mui/material';
import Button from '@/components/button';
import Input from '@/components/input';
import Logo from '@/components/logo';
import Link from 'next/link';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import messages from '@/utils/default-messages';
import authenticateUser from '@/server/usecases/authenticate-user.usecase';

interface FormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignUpValidation = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(24).required(),
});

export default function Logar() {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SignUpValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  async function handleSubmit(values: FormValues) {
    toast.promise(authenticateUser(values), {
      error: (err) => err.message,
      loading: messages.loading,
      success: () => {
        router.push('/');
        return 'Conta autenticada com sucesso!';
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
        <Button type="submit">Logar</Button>
        <Link href="/registrar">
          <Button sx={{ width: '100%' }} variant="outlined" color="success">
            Criar Conta
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
