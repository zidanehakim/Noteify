import { useDatesContext } from "../hooks/useDatesContext";

import { DateNote } from "./DateNote";
import { DayDate } from "./DayDate";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import {
  CaretBackSharp,
  CaretForwardSharp,
  RefreshSharp,
} from "react-ionicons";
import { JsonCalendar } from "json-calendar";

import "../styles/DateNote.css";
import React from "react";

type DateBoardProps = {
  className: string;
};

export const DateBoard = ({ className }: DateBoardProps) => {
  const value = useDatesContext();

  return (
    <div className={className}>
      <table
        className="m-auto table"
        style={{
          tableLayout: "fixed",
          width: "44em",
          height: "100%",
        }}
      >
        <thead className="thead-dark">
          <tr className="py-2">
            <th className="bg-transparent text-start" colSpan={5}>
              <div className="w-100 h-100 d-flex">
                <h4
                  className="fw-bold ms-5 animate__animated animate__rubberBand m-auto"
                  style={{ color: "#343a40" }}
                >
                  {`${value.completeDates.year} ${new JsonCalendar().monthNames[
                    value.completeDates.month
                  ]
                    .substring(0, 3)
                    .toUpperCase()}`}
                </h4>
              </div>
            </th>
            <th className="bg-transparent text-end align-middle" colSpan={2}>
              <ButtonGroup size="sm">
                <Button
                  className="rounded"
                  variant="white"
                  onClick={value.previous}
                >
                  <CaretBackSharp
                    color="#343a40"
                    width="1.2em"
                    height="1.2em"
                  />
                </Button>
                <Button
                  className="rounded"
                  variant="white"
                  onClick={value.reset}
                >
                  <RefreshSharp color="#343a40" width="1.2em" height="1.2em" />
                </Button>
                <Button
                  className="rounded"
                  variant="white"
                  onClick={value.next}
                >
                  <CaretForwardSharp
                    color="#343a40"
                    width="1.2em"
                    height="1.2em"
                  />
                </Button>
              </ButtonGroup>
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-scroll">
          <tr
            className="text-center align-middle"
            style={{ width: "fit-content", height: "3em" }}
          >
            <DayDate />
          </tr>

          {new JsonCalendar({
            today: new Date(
              value.completeDates.year,
              value.completeDates.month
            ),
          }).weeks.map((notes, indexes) => (
            <tr
              key={indexes}
              className=""
              style={{ width: "fit-content", height: "3em" }}
            >
              {notes.map((note, index) => (
                <DateNote
                  id={`c${indexes * 7 + index}`}
                  type="calendar"
                  key={note.id}
                  note={note}
                  month={value.completeDates.month}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const MemoizedDateBoard = React.memo(DateBoard);
