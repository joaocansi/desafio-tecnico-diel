'use client';

import { Box } from '@mui/material';
import Button from '@/components/button';
import Input from '@/components/input';
import Logo from '@/components/logo';
import Link from 'next/link';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import createUser from '@/server/usecases/create-user.usecase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import messages from '@/utils/default-messages';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUpValidation = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default function Home() {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SignUpValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  async function handleSubmit(values: FormValues) {
    toast.promise(createUser(values), {
      error: (err) => err.message,
      loading: messages.loading,
      success: () => {
        router.push('/logar');
        return 'Conta criada com sucesso!';
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
        <Input name="name" label="Digite seu nome" formik={formik} />
        <Input name="email" label="Digite seu e-mail" formik={formik} />
        <Input
          name="password"
          label="Digite sua senha"
          type="password"
          formik={formik}
        />
        <Button type="submit">Criar conta</Button>
        <Link href="/logar">
          <Button sx={{ width: '100%' }} variant="outlined" color="success">
            Entrar
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
