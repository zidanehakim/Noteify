import { MemoizedDateBoard } from "../components/DateBoard";
import { MemoizedDateMaker } from "../components/DateMaker";
import { MemoizedDateDeadline } from "../components/DateDeadline";
import {
  makerType,
  calendarType,
  initialDataType,
} from "../utilities/initialData";
import {
  DragDropContext,
  DraggableRubric,
  DropResult,
} from "react-beautiful-dnd";

import "../styles/Planner.css";

import React from "react";
import { useDndContext } from "../hooks/useDndContext";

import { MemoizedDateCompleted } from "../components/DateCompleted";
import { DateRightWidgets } from "../components/DateRightWidgets";
import { DateLeftWidgets } from "../components/DateLeftWidgets";
import { Loading } from "../components/Loading";

import { useMediaQuery } from "react-responsive";
import { Navbars } from "../components/Navbars";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Planner = () => {
  useDocumentTitle("Calendar Planner");
  const isFirstBreak = useMediaQuery({ query: "(min-width: 1350px)" });

  const objs = useDndContext();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    source.droppableId.includes("m0")
      ? objs.setBorderControl({ ...objs.borderControl, m0Click: false })
      : null;
    source.droppableId.includes("c")
      ? objs.setBorderControl({ ...objs.borderControl, calendarClick: false })
      : null;
    source.droppableId.includes("m1") || source.droppableId.includes("m2")
      ? objs.setBorderControl({ ...objs.borderControl, melseClick: false })
      : null;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (
      (destination.droppableId === "m1" || destination.droppableId === "m2") &&
      source.droppableId.includes("c")
    )
      return;
    if (
      (source.droppableId === "m1" || source.droppableId === "m2") &&
      destination.droppableId.includes("c")
    )
      return;

    const newBigdata: initialDataType = JSON.parse(
      JSON.stringify(objs.bigData)
    );

    if (destination.droppableId !== source.droppableId) {
      const newIndex = parseInt(destination.droppableId.substring(1));
      const currIndex = parseInt(source.droppableId.substring(1));

      const newDroppable: makerType | calendarType =
        destination.droppableId.includes("c")
          ? newBigdata.columns.calendar[newIndex]
          : newBigdata.columns.maker[newIndex];
      const currDroppable: makerType | calendarType =
        source.droppableId.includes("c")
          ? newBigdata.columns.calendar[currIndex]
          : newBigdata.columns.maker[currIndex];

      if (destination.droppableId === "t0") {
        const reupdate = () => {
          // REUPDATE
          if (source.droppableId.includes("c")) {
            // REMOVE CALENDARTASK
            const index1 = newBigdata.calendarTasks.findIndex((a) => {
              return a.tasks[0]._id! === currDroppable.tasks[source.index]._id;
            });
            if (newBigdata.calendarTasks && index1 >= 0)
              newBigdata.calendarTasks.splice(index1, 1);

            // REMOVE COMPLETEDTASK
            // const index2 = newBigdata.completedTasks.findIndex((a) => {
            //   return a.tasks[0]._id! === currDroppable.tasks[source.index]._id;
            // });
            // if (newBigdata.completedTasks && index2 >= 0)
            //   newBigdata.completedTasks.splice(index2, 1);
          }
        };

        const reorder = () => {
          // REORDER
          currDroppable.tasks.splice(source.index, 1);
        };

        reupdate();
        reorder();
      } else {
        const reupdate = () => {
          // REUPDATE
          if (source.droppableId.includes("c")) {
            // REMOVE CALENDARTASK
            const index1 = newBigdata.calendarTasks.findIndex((a) => {
              return a.tasks[0]._id! === currDroppable.tasks[source.index]._id;
            });
            if (newBigdata.calendarTasks && index1 >= 0)
              newBigdata.calendarTasks.splice(index1, 1);

            // REMOVE COMPLETEDTASK
            // const index2 = newBigdata.completedTasks.findIndex((a) => {
            //   return a.tasks[0]._id! === currDroppable.tasks[source.index]._id;
            // });
            // if (newBigdata.completedTasks && index2 >= 0)
            //   newBigdata.completedTasks.splice(index2, 1);
          }

          const generateId = currDroppable.tasks[source.index]._id;
          if (destination.droppableId.includes("c")) {
            const data = {
              ...newBigdata.columns.calendar[newIndex],
              _id: generateId[generateId.length - 1] + generateId.substring(1),
              tasks: [currDroppable.tasks[source.index]],
            };
            const compare1 = new Date(
              `${data.year}-${data.month + 1}-${data.date}`
            ).getTime();

            let isFound = false;
            newBigdata.calendarTasks.length > 0
              ? newBigdata.calendarTasks.forEach((a, index) => {
                  const compare2 = new Date(
                    `${a.year}-${a.month + 1}-${a.date}`
                  ).getTime();

                  if (compare2 >= compare1 && !isFound) {
                    isFound = true;
                    newBigdata.calendarTasks.splice(index, 0, data);
                    return;
                  } else if (index === newBigdata.calendarTasks.length - 1)
                    newBigdata.calendarTasks.push(data);
                })
              : newBigdata.calendarTasks.push(data);
          }
        };

        const reorder = () => {
          // REORDER
          newDroppable.tasks.splice(
            destination.index,
            0,
            currDroppable.tasks[source.index]
          );
          currDroppable.tasks.splice(source.index, 1);
        };

        reupdate();
        reorder();
      }
    } else {
      const index = parseInt(destination.droppableId[1]);

      const droppable = destination.droppableId.includes("c")
        ? newBigdata.columns.calendar[index]
        : newBigdata.columns.maker[index];

      const temp = droppable.tasks[source.index];

      droppable.tasks.splice(source.index, 1);
      droppable.tasks.splice(destination.index, 0, temp);
    }

    objs.setPrevBigData([...objs.prevBigData, objs.bigData]);
    objs.setNextBigData([]);
    objs.setBigData(newBigdata);
  };

  const onDragStart = (result: DraggableRubric) => {
    const { source } = result;
    source.droppableId.includes("m0")
      ? objs.setBorderControl({ ...objs.borderControl, m0Click: true })
      : null;
    source.droppableId.includes("c")
      ? objs.setBorderControl({ ...objs.borderControl, calendarClick: true })
      : null;
    source.droppableId.includes("m1") || source.droppableId.includes("m2")
      ? objs.setBorderControl({ ...objs.borderControl, melseClick: true })
      : null;
  };

  return !objs.isLoading ? (
    <section className="planner justify-content-center">
      <Navbars className="position-fixed gridOne" />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <MemoizedDateMaker className="datemaker bg-dark text-white gridOne"></MemoizedDateMaker>
        <MemoizedDateBoard className="dateboard gridTwo p-2 rounded bg-white overflow-x-auto"></MemoizedDateBoard>
      </DragDropContext>
      <MemoizedDateCompleted className="bg-dark gridThree"></MemoizedDateCompleted>
      <DateLeftWidgets className="dateleftwidgets border-top border-top-1 border-top-white gridFour bg-white"></DateLeftWidgets>
      <MemoizedDateDeadline className="datedeadline border border-1 border-white bg-white gridFive d-flex flex-row overflow-x-scroll align-items-center px-4 pb-4 mb-1"></MemoizedDateDeadline>
      {isFirstBreak && (
        <DateRightWidgets className="daterightwidgets border border-1 border-white gridSix"></DateRightWidgets>
      )}
    </section>
  ) : (
    <Loading />
  );
};

export const MemoizedPlanner = React.memo(Planner);
