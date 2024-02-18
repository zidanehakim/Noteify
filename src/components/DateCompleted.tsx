import React, { useContext, useEffect, useState } from "react";
import { DndContext } from "../contexts/DndContext";

import DateDiff from "date-diff";
import { useMediaQuery } from "react-responsive";

import "../styles/DateCompleted.css";
import { TemplateNote } from "./TemplateNote";
import { initialDataType } from "../utilities/initialData";
import { Button, Offcanvas } from "react-bootstrap";
import { ReorderThreeSharp } from "react-ionicons";

type DateCompletedProps = {
  className: string;
};

export const DateCompleted = ({ className }: DateCompletedProps) => {
  const isFirstBreak = useMediaQuery({ query: "(min-width: 1350px)" });

  const objs = useContext(DndContext);

  const [month, setMonth] = useState(0);
  const [threemonths, setThreemonths] = useState(0);
  const [overall, setOverall] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    objs.bigData.completedTasks.map((a) => {
      const timeData = new DateDiff(
        new Date(a.year, a.month, a.date + 1),
        new Date()
      );

      if (Math.floor(timeData.days()) > -30) setMonth((prev) => prev + 1);
      if (Math.floor(timeData.days()) > -90) setThreemonths((prev) => prev + 1);
      setOverall((prev) => prev + 1);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      objs.bigData.calendarTasks.map((a, index) => {
        const timeData = new DateDiff(
          new Date(a.year, a.month, a.date + 1),
          new Date()
        );
        if (Math.floor(timeData.minutes()) < 0) {
          const newBigdata: initialDataType = JSON.parse(
            JSON.stringify(objs.bigData)
          );

          newBigdata.completedTasks.push(a);
          newBigdata.calendarTasks.splice(index, 1);
          objs.setBigData(newBigdata);

          if (Math.floor(timeData.days()) > -30) setMonth((prev) => prev + 1);
          if (Math.floor(timeData.days()) > -90)
            setThreemonths((prev) => prev + 1);
          setOverall((prev) => prev + 1);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [objs]);

  const noteStyle = {
    // some basic styles to make the items look a bit nicer
    backgroundColor: "gray",
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 2px",
    cursor: "pointer",
  };

  return (
    <>
      {isFirstBreak ? (
        <div className={`${className} datecompleted`}>
          <div className="gridOne">
            <h6 className="text-white fw-bold text-center pt-3 completedTask">
              COMPLETED TASKS
            </h6>
            <div className="completedList pb-3">
              {objs.bigData.completedTasks.length > 0 ? (
                objs.bigData.completedTasks.map((a) =>
                  a.tasks.map((b, index) => (
                    <TemplateNote
                      key={index}
                      task={b}
                      indexes={index}
                      date={a.date}
                      month={a.month}
                      year={a.year}
                      type="datecompleted"
                      className={`sevenem mt-3 overflow-y-hidden overflow-x-hidden animate__animated animate__zoomInLeft animate_faster px-2 py-2 ${b.color}`}
                      style={noteStyle}
                    />
                  ))
                )
              ) : (
                <h6 className="text-white py-5 m-auto mt-5 fw-semibold fontSemi">
                  No record found
                </h6>
              )}
            </div>
          </div>
          <div className="gridTwo bg-dark text-center">
            <div>
              <h6 className="text-white fw-bold fontMini">THIS MONTH</h6>
              <div className="circle m-auto">
                <h6 className="text-white fw-bold fontMedium">{month}</h6>
              </div>
            </div>
            <div>
              <h6 className="text-white fw-bold fontMini">LAST 3 MONTHS</h6>
              <div className="circle m-auto">
                <h6 className="text-white fw-bold fontMedium">{threemonths}</h6>
              </div>
            </div>
            <div>
              <h6 className="text-white fw-bold fontMini">OVERALL</h6>
              <div className="circle m-auto">
                <h6 className="text-white fw-bold fontMedium">{overall}</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="dark"
            onClick={handleShow}
            className="gridThree position-fixed"
            style={{
              width: "fit-content",
              height: "fit-content",
              borderRadius: "0 0 0 .5em",
              right: "0",
              top: "3.3em",
              zIndex: "10",
            }}
          >
            <ReorderThreeSharp
              color="white"
              style={{ transform: "rotate(90deg)" }}
              height="1em"
              width="1em"
            />
          </Button>
          <Offcanvas
            show={show}
            placement="end"
            className={className}
            style={{ zIndex: "9999" }}
          >
            <Offcanvas.Body className="datecompleted">
              <Button className="bg-red border-0 my-4" onClick={handleClose}>
                Close
              </Button>
              <div className="gridOne">
                <h6 className="text-white fw-bold text-center pt-3 completedTask">
                  COMPLETED TASKS
                </h6>
                <div className="completedList pb-3">
                  {objs.bigData.completedTasks.length > 0 ? (
                    objs.bigData.completedTasks.map((a, index) =>
                      a.tasks.map((b) => (
                        <TemplateNote
                          task={b}
                          indexes={index}
                          date={a.date}
                          month={a.month}
                          year={a.year}
                          type="datecompleted"
                          className={`sevenem mt-3 overflow-y-hidden overflow-x-hidden animate__animated animate__zoomInLeft animate_faster px-2 py-2 ${b.color}`}
                          style={noteStyle}
                        />
                      ))
                    )
                  ) : (
                    <h6 className="text-white py-5 m-auto mt-5 fw-semibold fontMini">
                      No record found
                    </h6>
                  )}
                </div>
              </div>
              <div className="gridTwo bg-dark text-center">
                <div>
                  <h6 className="text-white fw-bold fontSemi">THIS MONTH</h6>
                  <div className="circle m-auto">
                    <h6 className="text-white fw-bold fontMedium">{month}</h6>
                  </div>
                </div>
                <div>
                  <h6 className="text-white fw-bold fontSemi">LAST 3 MONTHS</h6>
                  <div className="circle m-auto">
                    <h6 className="text-white fw-bold fontMedium">
                      {threemonths}
                    </h6>
                  </div>
                </div>
                <div>
                  <h6 className="text-white fw-bold fontSemi">OVERALL</h6>
                  <div className="circle m-auto">
                    <h6 className="text-white fw-bold fontMedium">{overall}</h6>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
};

export const MemoizedDateCompleted = React.memo(DateCompleted);
