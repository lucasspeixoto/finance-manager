import { AppRoutes } from 'core/config/routes';
import { auth } from 'core/services/firebase';
import { userActions } from 'core/store/auth-slice';
import { useAppDispatch } from 'core/store/hooks';
import { IUser } from 'core/types/firebase-user';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const newUser: IUser = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
          photoUrl: user.photoURL,
        };
        dispatch(userActions.saveUser(newUser));
      } else {
        dispatch(userActions.removeUser());
      }
      dispatch(userActions.stopIsLoading());
    });

    return () => {
      unsubscribe();
    };
  }, [auth, dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
