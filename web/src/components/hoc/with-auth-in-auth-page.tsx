/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { cookies } from 'next/headers';
import React, { type ComponentType } from 'react';
import Redirect from '../redirect';
import { deleteCookie } from '@/action/delete-cookie';
import jwt from 'jsonwebtoken';

function withAuthInAuthPage<T extends any>(WrappedComponent: ComponentType<T>) {
  return function WithAuth(props: T & any) {
    const accessToken = cookies().get('session');
    if (accessToken) {
      try {
        jwt.verify(accessToken.value, process.env.JWT_SECRET as jwt.Secret);
        return <Redirect href="/logar" action={deleteCookie} />;
      } catch (error) {}
    }
    return <WrappedComponent {...props} />;
  };
}

export default withAuthInAuthPage;
