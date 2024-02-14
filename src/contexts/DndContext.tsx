import { createContext, useState, useEffect } from "react";
import { changeData, initialDataType } from "../utilities/initialData";
import React from "react";

import { useDatesContext } from "../hooks/useDatesContext";

import { useAuthContext } from "../hooks/useAuthContext";

type DndContextProviderProps = {
  children: React.ReactNode;
};

type DndContextType = {
  bigData: initialDataType;
  setBigData: React.Dispatch<React.SetStateAction<initialDataType>>;
  prevBigData: initialDataType[];
  setPrevBigData: React.Dispatch<React.SetStateAction<initialDataType[]>>;
  nextBigData: initialDataType[];
  setNextBigData: React.Dispatch<React.SetStateAction<initialDataType[]>>;
  borderControl: {
    calendarClick: boolean;
    m0Click: boolean;
    melseClick: boolean;
  };
  setBorderControl: React.Dispatch<
    React.SetStateAction<{
      calendarClick: boolean;
      m0Click: boolean;
      melseClick: boolean;
    }>
  >;
  isLoading: boolean;
};

export const DndContext = createContext({} as DndContextType);

const base = "https://noteify-server.onrender.com";

export const DndContextProvider = ({ children }: DndContextProviderProps) => {
  const auth = useAuthContext();
  const value = useDatesContext();

  const [isLoading, setIsLoading] = useState(true);

  const [prevBigData, setPrevBigData] = useState([] as initialDataType[]);
  const [bigData, setBigData] = useState({} as initialDataType);
  const [nextBigData, setNextBigData] = useState({} as initialDataType[]);

  const [borderControl, setBorderControl] = useState({
    calendarClick: false,
    m0Click: false,
    melseClick: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${base}/planner/`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();

      if (response.ok) {
        const { initialData } = changeData(
          value.completeDates.dates,
          value.completeDates.month,
          value.completeDates.year,
          json.makerList,
          json.tasksList,
          json.completedList
        );

        initialData && setBigData({ ...initialData });

        setIsLoading(false);
      }
    };

    if (auth.user) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  useEffect(() => {
    const stateChange = () => {
      const { initialData } = changeData(
        value.completeDates.dates,
        value.completeDates.month,
        value.completeDates.year,
        bigData?.columns?.maker,
        bigData?.calendarTasks,
        bigData?.completedTasks
      );

      if (initialData) {
        setPrevBigData([]);
        setBigData({ ...initialData });
        setNextBigData([]);
      }
    };

    if (auth.user && !isLoading) stateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.completeDates]);

  useEffect(() => {
    const postData = async () => {
      const sentBigdata = {
        tasksList: bigData?.calendarTasks,
        makerList: bigData?.columns?.maker,
        completedList: bigData?.completedTasks,
      };
      const response = await fetch(`${base}/planner/`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(sentBigdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) console.log("UPDATED!");
      else console.log(json.error);
    };

    if (auth.user && !isLoading) postData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigData, auth.user]);

  return (
    <DndContext.Provider
      value={{
        bigData,
        setBigData,
        prevBigData,
        setPrevBigData,
        nextBigData,
        setNextBigData,
        borderControl,
        setBorderControl,
        isLoading,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};
