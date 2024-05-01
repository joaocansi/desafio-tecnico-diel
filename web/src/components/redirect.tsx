'use client';

import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface RedirectProps {
  href: string;
  action: (data: any) => Promise<void>;
}

export const Redirect = ({ href }: Omit<RedirectProps, 'action'>) => {
  useEffect(() => {
    redirect(href);
  }, []);
  return null;
};

export const RedirectWithAction = ({ href, action }: RedirectProps) => {
  const deleteTokensRef = useRef(action);

  useEffect(() => {
    deleteTokensRef.current = action;
  });

  useEffect(() => {
    deleteTokensRef.current({});
    redirect(href);
  }, []);

  return null;
};
