/* eslint-disable no-unused-vars */
import { Error } from 'core/helpers/error-messages';
import { useSnackBar } from 'core/hooks/useSnackbar';
import {
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';

import { auth, db } from '../../core/services/firebase';
import { User } from '../types/user';

interface AuthContextType {
  isLogged?: any;
  isLoading?: any;
  user?: User | undefined | any;
  signInWithGoogle?: () => Promise<void>;
  signInWithEmailAndPasswordHandler: (email: string, password: string) => void;
  registerUser: (loggedUser: any) => void;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //* Estados
  const [user, setUser] = useState<any>({});
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //* Hooks
  const { showSnackBar } = useSnackBar();

  /**
   * TODO - Verificar o estado de autenticação e salvar em 'user' os dados do usuário logado
   *
   * @return - void
   */
  const setUserData = async (uid: string) => {
    const usersDocReference = query(collection(db, `users`));
    const querySnapshot = await getDocs(usersDocReference);
    querySnapshot.forEach((doc) => {
      if (doc.id.replace('}', '') === uid) {
        const loggedUser = doc.data() as User;
        setUser(loggedUser);
        setIsLogged(true);
        setIsLoading(false);
      }
    });
  };

  /**
   * TODO - Observar se houve alteração no estado de autenticação do usuário
   *
   * @return - void
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserData(currentUser!.uid);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * TODO - Envia o e-mail de informação da criação de um conta
   *
   * @return - Promise<void>
   */
  const sendPasswordResetEmail = async () => {
    await sendEmailVerification(auth.currentUser!).then(() => {
      showSnackBar('Email de confirmação enviado!', 'info');
    });
  };

  /**
   * TODO - Insere um novo documento na collection 'users'
   *
   * @return - void
   */
  const registerUser = async (loggedUser: User) => {
    if (loggedUser) {
      await setDoc(doc(db, 'users', `${loggedUser.id}}`), loggedUser);
      sendPasswordResetEmail();
    }
  };

  /**
   * TODO - Realiza um login com email e senha
   * @param email string
   * @param password string
   *
   * @return - void
   */
  const signInWithEmailAndPasswordHandler = async (email: string, password: string) => {
    //setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showSnackBar(`Bem Vindo: ${user}`, 'success');

        // ...
      })
      .catch((error) => {
        const code: string = error.code as string;
        const message: string = Error[code];
        showSnackBar(`Error Code: ${message}`, 'error');
      });
  };

  const logout = async () => {
    setIsLogged(false);
    setUser(undefined);
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isLoading,
        user,
        registerUser,
        signInWithEmailAndPasswordHandler,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
