import React, { createContext, useContext, useReducer } from 'react';

// Define las acciones para actualizar el estado de autenticación
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Función reductora para actualizar el estado de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Proveedor de estado global
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Funciones de acción para actualizar el estado
const setAuthenticated = (dispatch) => {
  dispatch({ type: SET_AUTHENTICATED });
};

const setUnauthenticated = (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

// Funciones para acceder al estado y las acciones
const useAuthState = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { AuthProvider, useAuthState, useAuthDispatch, setAuthenticated, setUnauthenticated };
