'use client'
import { createContext, useContext, useState } from 'react';

const ShowDataContext = createContext();

export const ShowDataProvider = ({ children }) => {
  const [showData1, setShowData1] = useState(true);

  return (
    <ShowDataContext.Provider value={{ showData1, setShowData1 }}>
      {children}
    </ShowDataContext.Provider>
  );
};

export const useShowData = () => {
  return useContext(ShowDataContext);
};