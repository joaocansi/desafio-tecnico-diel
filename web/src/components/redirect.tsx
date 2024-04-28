'use client';

import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface RedirectProps {
  href: string;
  action: (data: any) => Promise<void>;
}

const Redirect = ({ href, action }: RedirectProps) => {
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

export default Redirect;
