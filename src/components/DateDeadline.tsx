import React, { useEffect, useState } from "react";

import { useDndContext } from "../hooks/useDndContext";

import DateDiff from "date-diff";
import { calendarType } from "../utilities/initialData";

import "../styles/DateDeadline.css";
import { TemplateNote } from "./TemplateNote";

type DateDeadlineProps = {
  className: string;
};

const red = 1;
const yellow = 5;

export const DateDeadline = ({ className }: DateDeadlineProps) => {
  const objs = useDndContext();

  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deadline = (a: calendarType) => {
    const stringList: string[] = [];
    const dateThat = new Date(a.year, a.month, a.date + 1);

    if (
      Math.floor(new DateDiff(dateThat, dateNow).minutes()) < 60 &&
      Math.floor(new DateDiff(dateThat, dateNow).minutes()) > 0
    )
      stringList.push(
        `${Math.floor(
          new DateDiff(dateThat, dateNow).minutes()
        ).toString()} minutes`
      );
    else {
      if (Math.floor(new DateDiff(dateThat, dateNow).hours()) <= 24)
        stringList.push(
          `${Math.floor(
            new DateDiff(dateThat, dateNow).hours()
          ).toString()} hours`
        );
      else {
        if (Math.floor(new DateDiff(dateThat, dateNow).days()) <= 29)
          stringList.push(
            `${Math.floor(
              new DateDiff(dateThat, dateNow).days()
            ).toString()} days`
          );
        else {
          if (Math.floor(new DateDiff(dateThat, dateNow).days() / 30) <= 11) {
            stringList.push(
              `${Math.floor(
                new DateDiff(dateThat, dateNow).days() / 30
              ).toString()} months`
            );

            const days = Math.floor(
              new DateDiff(dateThat, dateNow).days() % 30
            );
            days !== 0 && stringList.push(`${days.toString()} days`);
          } else {
            stringList.push(
              `${Math.floor(
                new DateDiff(dateThat, dateNow).days() / 360
              ).toString()} years`
            );

            if (
              Math.floor((new DateDiff(dateThat, dateNow).days() % 360) / 30) <=
              11
            ) {
              const months = Math.floor(
                (new DateDiff(dateThat, dateNow).days() % 360) / 30
              );
              months !== 0 && stringList.push(`${months.toString()} months`);

              const days = Math.floor(
                new DateDiff(dateThat, dateNow).days() % 30
              );
              days !== 0 && stringList.push(`${days.toString()} days`);
            }
          }
        }
      }
    }

    return stringList;
  };

  return (
    <div className={className}>
      {objs.bigData.calendarTasks.length > 0 ? (
        objs.bigData.calendarTasks.map(
          (a, index) =>
            new DateDiff(
              new Date(a.year, a.month, a.date + 1),
              dateNow
            ).minutes() > 0 &&
            a.tasks.map((b) => (
              <TemplateNote
                key={b._id}
                task={b}
                indexes={index}
                date={a.date}
                month={a.month}
                year={a.year}
                type="datedeadline"
                className={`sevenem mt-3 overflow-y-hidden overflow-x-hidden animate__animated animate__bounceInRight animate_faster mx-2 px-2 py-2 ${b.color}`}
                deadline={deadline(a)}
                style={{
                  cursor: "pointer",
                  boxShadow:
                    "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
                }}
                urgency={{
                  red: red,
                  yellow,
                  days: new DateDiff(
                    new Date(a.year, a.month, a.date + 1),
                    dateNow
                  ).days(),
                }}
              />
            ))
        )
      ) : (
        <h6 className="text-dark my-5 m-auto fw-semibold fontMedium">
          Go stick some note!!
        </h6>
      )}
    </div>
  );
};

export const MemoizedDateDeadline = React.memo(DateDeadline);
