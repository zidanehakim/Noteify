import {
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";

import DateDiff from "date-diff";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import { Tooltip, TooltipProps } from "react-bootstrap";

import React from "react";
import { useDndContext } from "../hooks/useDndContext";

import { useMediaQuery } from "react-responsive";

type DateBoardProps = {
  id: string;
  type: string;
  borderClick?: string;
  borderHighlight?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const TemplateDrag = ({
  borderHighlight,
  borderClick,
  style,
  className,
  id,
  type,
  children,
}: DateBoardProps) => {
  const isFirstBreak = useMediaQuery({ query: "(min-width: 1350px)" });

  const objs = useDndContext();

  const isReserved =
    type === "calendar" &&
    objs.bigData.columns["calendar"][parseInt(id.substring(1))].tasks.length >
      0;

  const expired =
    new DateDiff(
      new Date(
        objs.bigData.columns.calendar[parseInt(id.substring(1))].year,
        objs.bigData.columns.calendar[parseInt(id.substring(1))].month,
        objs.bigData.columns.calendar[parseInt(id.substring(1))].date + 1
      ),
      new Date()
    ).minutes() < 0;

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    // some basic styles to make the items look a bit nicer
    margin: type === "maker" ? (isFirstBreak ? `0 0 1em 0` : `0 1em 0 0`) : "",
    boxShadow:
      type === "maker"
        ? isDragging
          ? "rgba(0, 0, 0, 0.5) 0px 5px 2px"
          : "rgba(0, 0, 0, 0.18) 0px 2px 4px"
        : "rgba(0, 0, 0, 0.5) 0px 5px 2px",
    touchAction: "none",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const renderTooltip = (props: TooltipProps) => {
    let message = [];

    if (props?.popper?.state) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message = props.popper.state.options.testObj;
    }

    return (
      <Tooltip id="button-tooltip" {...props}>
        {message.map((a: { name: string }, index: number) => (
          <p key={index} className="ptooltip my-2 fontMedium">
            {a.name}
          </p>
        ))}
      </Tooltip>
    );
  };

  return (
    <Droppable
      key={id}
      direction={isFirstBreak ? "vertical" : "horizontal"}
      droppableId={id}
      isDropDisabled={
        (type === "calendar" &&
          (isReserved ||
            (!objs.borderControl.m0Click &&
              !objs.borderControl.calendarClick))) ||
        ((id === "m1" || id === "m2") && objs.borderControl.calendarClick) ||
        (type === "calendar" && expired)
      }
    >
      {(provided, snapshot) => (
        <div
          key={id}
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={className}
          style={{
            border:
              (type === "calendar" || id === "m0") &&
              !(expired && type === "calendar") &&
              (objs.borderControl.calendarClick ||
                objs.borderControl.m0Click) &&
              !isReserved
                ? id === "m0"
                  ? snapshot.isDraggingOver
                    ? `2px solid ${borderHighlight}`
                    : `1px solid ${borderClick}`
                  : snapshot.isDraggingOver
                  ? `2px solid ${borderHighlight}`
                  : `1px solid ${borderClick}`
                : type === "maker" && objs.borderControl.m0Click && id !== "m0"
                ? snapshot.isDraggingOver
                  ? `2px solid ${borderHighlight}`
                  : `1px solid ${borderClick}`
                : type === "maker" && objs.borderControl.melseClick
                ? snapshot.isDraggingOver
                  ? `2px solid ${borderHighlight}`
                  : `1px solid ${borderClick}`
                : "1px solid transparent",
            ...style,
          }}
        >
          {objs.bigData?.columns[type === "maker" ? "maker" : "calendar"][
            parseInt(id.substring(1))
          ]?.tasks?.length > 0 &&
            type !== "trash" &&
            objs.bigData?.columns[type === "maker" ? "maker" : "calendar"][
              parseInt(id.substring(1))
            ]?.tasks?.map((a, index) => {
              return (
                <Draggable key={a._id} draggableId={a._id} index={index}>
                  {(provided, snapshot) => (
                    <OverlayTrigger
                      key={a._id + type}
                      placement={!isFirstBreak ? "top" : "right"}
                      delay={{ show: 5, hide: 5 }}
                      overlay={renderTooltip}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      popperConfig={{ testObj: a.tasksName }}
                    >
                      <div
                        key={a._id}
                        className={
                          snapshot.isDragging
                            ? id === "m0"
                              ? snapshot.draggingOver?.includes("m1") ||
                                snapshot.draggingOver?.includes("m2")
                                ? `sevenem text-white ${a.color}`
                                : `threem text-white ${a.color}`
                              : id.includes("c")
                              ? `threem text-white ${a.color}`
                              : `sevenem text-white ${a.color}`
                            : type === "maker"
                            ? id === "m0"
                              ? `threem text-white ${a.color}`
                              : `sevenem text-white ${a.color}`
                            : `threem animate__animated animate__swing animate_faster text-white ${a.color}`
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {a.tasksName.map((b, index) => (
                          <h6
                            key={index}
                            className="m-auto"
                            style={{
                              fontFamily: "Single Day, monospace",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {b.name}
                          </h6>
                        ))}
                      </div>
                    </OverlayTrigger>
                  )}
                </Draggable>
              );
            })}
          {type !== "trash" && provided.placeholder}
          {children}
        </div>
      )}
    </Droppable>
  );
};

export const MemoizedTemplateDrag = React.memo(TemplateDrag);
