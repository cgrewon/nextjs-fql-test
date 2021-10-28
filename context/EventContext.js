import React, { createContext, useContext } from "react";
import useEventGql from "./hooks/useEventGql";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const value = useEventGql();

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
