import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface DepthContextType {
  depth: number;
  addDepth: () => void;
}

const context = createContext<DepthContextType>({
  depth: 0,
  addDepth: () => null,
});

export const DepthProvider: React.FC = ({ children }) => {
  const [depth, setDepth] = useState<number>(0);

  const addDepth = useCallback(() => {
    setDepth((prevState) => prevState + 1);
  }, [setDepth]);

  const value = useMemo(
    () => ({
      depth,
      addDepth,
    }),
    [depth, addDepth],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useDepth = (): DepthContextType => useContext(context);
