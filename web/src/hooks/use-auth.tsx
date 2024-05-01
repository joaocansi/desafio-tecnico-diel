'use client';
import getAllTags from '@/server/usecases/get-all-tags.usecase';
import getAllTasks from '@/server/usecases/get-all-tasks.usecase';
import api from '@/utils/axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextProps {
  accessToken: string;
  tags: Tag[];
  updateTag: (tag: Tag) => void;
  createTag: (tag: Tag) => void;
  deleteTag: (id: string) => void;
  updateTask: (task: Task) => void;
  createTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface AuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export interface Tag {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  is_completed: boolean;
  tags: Array<{ id: string; name: string }>;
}

const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    getAllTags().then((res) => {
      setTags(res);
    });
    getAllTasks({}).then((res) => {
      setTasks(res);
    });
  }, []);

  const updateTag = useCallback(
    (tag: Tag) => {
      setTags((prevTags) => {
        const index = prevTags.findIndex((t) => t.id === tag.id);
        if (index === -1) return prevTags;
        const newTags = [...prevTags];
        newTags[index] = tag;
        return newTags;
      });
    },
    [tags],
  );

  const createTag = useCallback(
    (tag: Tag) => {
      setTags((prevTags) => [...prevTags, tag]);
    },
    [tags],
  );

  const deleteTag = useCallback(
    (id: string) => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    },
    [tags],
  );

  const updateTask = useCallback(
    (task: Task) => {
      setTasks((prevTasks) => {
        const index = prevTasks.findIndex((t) => t.id === task.id);
        if (index === -1) return prevTasks;
        const newTasks = [...prevTasks];
        newTasks[index] = task;
        return newTasks;
      });
    },
    [tasks],
  );

  const createTask = useCallback(
    (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [tasks],
  );

  const value = useMemo(
    () => ({
      accessToken,
      tags,
      tasks,
      setTasks,
      updateTag,
      createTag,
      deleteTag,
      updateTask,
      createTask,
      deleteTask,
    }),
    [tags, tasks],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
