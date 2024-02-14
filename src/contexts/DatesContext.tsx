import { createContext, useReducer, useState } from "react";
import { changeDate } from "../utilities/initialDate";

type datemonthyear = {
  date: number;
  month: number;
  year: number;
};

type datesmonthyear = {
  dates: number[][];
  month: number;
  year: number;
};

type countrytype = {
  country?: string;
  city: string;
};

type actionType1 = {
  type: "previous" | "next";
};

type actionType2 = {
  type: "reset" | "jump";
  payload: datemonthyear;
};

type actionType = actionType1 | actionType2;

type DatesContextProviderProps = {
  children: React.ReactNode;
};

type DatesContextType = {
  completeDates: datesmonthyear;
  dispatch: React.Dispatch<actionType>;
  previous: () => void;
  next: () => void;
  reset: () => void;
  jump: (month: number, year: number) => void;
  initially: datemonthyear;
  countryName: countrytype;
  setCountryName: React.Dispatch<React.SetStateAction<countrytype>>;
};

export const DatesContext = createContext({} as DatesContextType);

export const DatesContextProvider = ({
  children,
}: DatesContextProviderProps) => {
  const reducer = (
    state: datesmonthyear,
    action: actionType
  ): datesmonthyear => {
    switch (action.type) {
      case "previous":
        if (state.month == 0) {
          const { initialDate } = changeDate(11, state.year - 1);
          return initialDate;
        } else {
          const { initialDate } = changeDate(state.month - 1, state.year);
          return initialDate;
        }
      case "next":
        if (state.month == 11) {
          const { initialDate } = changeDate(0, state.year + 1);
          return initialDate;
        } else {
          const { initialDate } = changeDate(state.month + 1, state.year);
          return initialDate;
        }
      case "reset":
        // eslint-disable-next-line no-case-declarations
        const { initialDate } = changeDate(
          action.payload.month,
          action.payload.year
        );
        return initialDate;
      case "jump":
        // eslint-disable-next-line no-case-declarations
        const initialDate2 = changeDate(
          action.payload.month,
          action.payload.year
        );
        return initialDate2.initialDate;
      default:
        return state;
    }
  };

  const initially = {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  const [completeDates, dispatch] = useReducer(
    reducer,
    changeDate(initially.month, initially.year).initialDate
  );

  const [countryName, setCountryName] = useState({} as countrytype);

  // METHOD
  const previous = (): void => dispatch({ type: "previous" });
  const next = (): void => dispatch({ type: "next" });
  const reset = (): void => dispatch({ type: "reset", payload: initially });
  const jump = (month: number, year: number): void =>
    dispatch({ type: "jump", payload: { month, year, date: 0 } });

  return (
    <DatesContext.Provider
      value={{
        completeDates,
        dispatch,
        previous,
        next,
        reset,
        jump,
        initially,
        countryName,
        setCountryName,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};
