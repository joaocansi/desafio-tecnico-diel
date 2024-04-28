'use client';
import getAllTags from '@/server/usecases/get-all-tags.usecase';
import api from '@/utils/axios';
import React, { createContext, useContext, useEffect } from 'react';

interface AuthContextProps {
  accessToken: string;
  tags: Record<string, string>;
}

interface AuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const [tags, setTags] = React.useState<Record<string, string>>({});

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    getAllTags().then((res) => {
      setTags(res.reduce((acc, tag) => ({ ...acc, [tag.id]: tag.name }), {}));
    });
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, tags }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
