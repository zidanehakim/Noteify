import { CalendarDay } from "json-calendar";

import "../styles/DateNote.css";
import { MemoizedTemplateDrag } from "./TemplateDrag";

type DateNoteProps = {
  id: string;
  type: string;
  note: CalendarDay;
  month: number;
};

export const DateNote = ({ note, month, id, type }: DateNoteProps) => {
  return (
    <td
      className={
        note.monthIndex !== month
          ? "bg-red text-white m-auto border "
          : "bg-white text-dark m-auto border "
      }
    >
      <div className="dateNote justify-content-center">
        <div className="h-100 gridOne animate__animated animate__flipInY animate_faster">
          <h6 className="fw-bold fontMini">{note.day}</h6>
        </div>
        <div className="h-100 gridTwo ">
          <MemoizedTemplateDrag
            id={id}
            type={type}
            className="w-100 h-100"
            borderClick="#f2ae44"
            borderHighlight="#b52d5f"
          />
        </div>
      </div>
    </td>
  );
};
