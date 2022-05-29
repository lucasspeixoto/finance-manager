/* eslint-disable no-unused-vars */
import { useSnackBar } from 'core/hooks/useSnackbar';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';

import { auth, db } from '../../core/services/firebase';
import { User } from '../types/user';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLogged: boolean;
  registerUser: (loggedUser: User) => void;
  logout: () => Promise<void>;
  handleCreateUserWithNameEmailAndPassword: (
    name: string,
    email: string,
    password: string,
  ) => void;
  handleSignInWithEmailAndPassoword: (
    email: string,
    password: string,
  ) => Promise<UserCredential>;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //* Estados
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  //* Hooks
  const { showSnackBar } = useSnackBar();

  const setUserData = async (uid: string) => {
    const usersDocReference = query(collection(db, `users`));
    const querySnapshot = await getDocs(usersDocReference);
    querySnapshot.forEach((doc) => {
      if (doc.id.replace('}', '') === uid) {
        const loggedUser = doc.data() as User;
        setUser(loggedUser);
      }
    });
  };

  const sendPasswordResetEmail = async () => {
    await sendEmailVerification(auth.currentUser!).then(() => {
      showSnackBar('Email de confirmação enviado!', 'info');
    });
  };

  const handleCreateUserWithNameEmailAndPassword = async (
    name: string,
    email: string,
    password: string,
  ) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential: UserCredential) => {
        const { email, uid } = userCredential.user;
        const loggedUser: User = {
          id: uid,
          name: name,
          email: email!,
          avatar: '',
        };
        registerUser(loggedUser);
      },
    );
  };

  const handleSignInWithEmailAndPassoword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerUser = async (currentUser: User) => {
    if (currentUser) {
      await setDoc(doc(db, 'users', `${currentUser.id}}`), currentUser);
      sendPasswordResetEmail();
    }
  };

  const logout = () => {
    setUser({});
    return signOut(auth);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser!);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const isUserLogged = auth.currentUser && user;
    isUserLogged ? setIsLogged(true) : setIsLogged(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLogged,
        handleCreateUserWithNameEmailAndPassword,
        handleSignInWithEmailAndPassoword,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
