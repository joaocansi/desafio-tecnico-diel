/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import AuthProvider from '@/hooks/use-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { type ComponentType } from 'react';
import Redirect from '../redirect';

import jwt from 'jsonwebtoken';
import { deleteCookie } from '@/action/delete-cookie';

function withAuth<T extends any>(WrappedComponent: ComponentType<T>) {
  return function WithAuth(props: T & any) {
    const accessToken = cookies().get('session');
    if (!accessToken) redirect('/logar');

    try {
      jwt.verify(accessToken.value, process.env.JWT_SECRET as jwt.Secret);
    } catch (error) {
      return <Redirect href="/logar" action={deleteCookie} />;
    }

    return (
      <AuthProvider accessToken={accessToken.value}>
        <WrappedComponent {...props} />
      </AuthProvider>
    );
  };
}

export default withAuth;
