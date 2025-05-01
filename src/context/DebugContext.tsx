import React, { createContext, useContext, useReducer } from 'react';
import { DebugPanel } from '../components/DebugPanel';

export enum EDebugAction {
  PANEL_STATUS = 'PANEL_STATUS',
  SET_INFO = 'SET_INFO',
}

interface IDebugState {
  isOpen: boolean;
  info: string;
}

interface IDebugStatusAction {
  actionType: EDebugAction.PANEL_STATUS;
  payload: boolean;
}

interface IDebugSetInfoAction {
  actionType: EDebugAction.SET_INFO;
  payload: string;
}

interface IProps {
  children: React.ReactElement;
}

export type DebugActionType = IDebugStatusAction | IDebugSetInfoAction;

const DebugReducer = (debugState: IDebugState, action: DebugActionType) => {
  switch (action.actionType) {
    case EDebugAction.PANEL_STATUS:
      return {
        ...debugState,
        isOpen: action.payload,
      };
    case EDebugAction.SET_INFO:
      return {
        ...debugState,
        info: action.payload || 'no info',
      };
    default:
      throw Error('Unknown debug action');
  }
};

const DebugContext = createContext<React.ActionDispatch<[action: DebugActionType]>>(() => []);

// or you can declare like this
// export const DebutgProvder: React.FC<IProps> = ({ children }) =>
export const DebugProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(DebugReducer, { isOpen: false, info: 'no info' });
  return (
    <DebugContext.Provider value={dispatch}>
      {children}
      <DebugPanel isOpen={state.isOpen} infoText={state.info} />
    </DebugContext.Provider>
  );
};

// simple hook for easier usage
export const useDebugContext = () => {
  const debugContext = useContext(DebugContext);
  if (!debugContext) {
    throw new Error('Please use within DebugContext Provider');
  }

  return debugContext;
};
