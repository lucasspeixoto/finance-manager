/* eslint-disable no-unused-vars */
import { useSnackBar } from 'core/hooks/useSnackbar';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';

import { auth, db } from '../../core/services/firebase';
import { User } from '../types/user';

interface AuthContextType {
  user: User;
  registerUser: (loggedUser: User) => void;
  logout: () => void;
  handleCreateUserWithNameEmailAndPassword: (
    name: string,
    email: string,
    password: string,
  ) => void;
  handleSignInWithEmailAndPassoword: (email: string, password: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //* Estados
  const [user, setUser] = useState<any>({});
  const [isLogged, setIsLogged] = useState(false);
  //* Hooks
  const { showSnackBar } = useSnackBar();

  /**
   * TODO - Verificar o estado de autenticação e salvar em 'user' os dados do usuário logado
   * @return - void
   */
  const setUserData = async (uid: string) => {
    const usersDocReference = query(collection(db, `users`));
    const querySnapshot = await getDocs(usersDocReference);
    querySnapshot.forEach((doc) => {
      if (doc.id.replace('}', '') === uid) {
        const loggedUser = doc.data() as User;
        setIsLogged(true);
        setUser(loggedUser);
      }
    });
  };

  /**
   * TODO - Observar se houve alteração no estado de autenticação do usuário
   * @return - void
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUserData(currentUser!.uid);
    });
    return () => {
      unsubscribe();
    };
  }, [isLogged]);

  /**
   * TODO - Envia o e-mail de informação da criação de um conta
   * @return void
   */
  const sendPasswordResetEmail = async () => {
    await sendEmailVerification(auth.currentUser!).then(() => {
      showSnackBar('Email de confirmação enviado!', 'info');
    });
  };

  /**
   * TODO - Receber nome, email e senha para criação novo usuário
   * @return void
   */
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

  /**
   * TODO - Receber email e senha para autenticação
   * @return void
   */
  const handleSignInWithEmailAndPassoword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      setIsLogged(true);
    });
  };

  /**
   * TODO - Insere um novo documento na collection 'users'
   * @return - void
   */
  const registerUser = async (currentUser: User) => {
    if (currentUser) {
      await setDoc(doc(db, 'users', `${currentUser.id}}`), currentUser);
      sendPasswordResetEmail();
    }
  };

  /**
   * TODO - Remover usuário ativo
   * @return void
   */
  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
