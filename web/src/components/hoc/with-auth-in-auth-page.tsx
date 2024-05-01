/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { cookies } from 'next/headers';
import React, { type ComponentType } from 'react';
import jwt from 'jsonwebtoken';
import { deleteCookie } from '@/action/delete-cookie';
import { Redirect, RedirectWithAction } from '../redirect';

function withAuthInAuthPage<T extends any>(WrappedComponent: ComponentType<T>) {
  return function withAuthInAuthPage(props: T & any) {
    const accessToken = cookies().get('session');
    if (accessToken) {
      try {
        jwt.verify(accessToken.value, process.env.JWT_SECRET as jwt.Secret);
        return <Redirect href="/" />;
      } catch (error) {
        return <RedirectWithAction href="/logar" action={deleteCookie} />;
      }
    }
    return <WrappedComponent {...props} />;
  };
}

export default withAuthInAuthPage;
