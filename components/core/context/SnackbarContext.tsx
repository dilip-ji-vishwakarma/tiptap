import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface SnackbarState {
  message: string;
  type: 'info' | 'success' | 'error';
  isVisible: boolean;
}

interface SnackbarAction {
  type: 'SHOW_SNACKBAR' | 'HIDE_SNACKBAR';
  payload: { message: string; type: 'info' | 'success' | 'error' };
}

const initialState: SnackbarState = {
  message: '',
  type: 'info',
  isVisible: false,
};

const SnackbarContext = createContext<any>(null);

const snackbarReducer = (state: SnackbarState, action: SnackbarAction): SnackbarState => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        isVisible: true,
      };
    case 'HIDE_SNACKBAR':
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);
  return (
    <SnackbarContext.Provider value={{ state, dispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
