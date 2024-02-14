import { useState } from "react";
import { useDatesContext } from "../hooks/useDatesContext";
import { useDndContext } from "../hooks/useDndContext";

import walkingduck from "../images/walkingduck.gif";

import Tooltip, { TooltipProps } from "react-bootstrap/esm/Tooltip";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";

import { useMediaQuery } from "react-responsive";
import Form from "react-bootstrap/esm/Form";
import { task } from "../utilities/initialData";
import { CheckmarkSharp, CloseSharp } from "react-ionicons";

type TemplateNoteProps = {
  task: task;
  date: number;
  month: number;
  year: number;
  className: string;
  type: string;
  indexes: number;
  style?: React.CSSProperties;
  deadline?: string[];
  urgency?: { red: number; yellow: number; days: number };
};

export const TemplateNote = ({
  task,
  date,
  month,
  year,
  className,
  type,
  indexes,
  style,
  deadline,
  urgency,
}: TemplateNoteProps) => {
  const objs = useDndContext();
  const value = useDatesContext();

  const isFirstBreak = useMediaQuery({ query: "(min-width: 1350px)" });

  const [show, setShow] = useState({ tooltip: false, element: false });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const obj = e.target as HTMLElement;
    const month = Number(obj.dataset.month);
    const year = Number(obj.dataset.year);

    obj.dataset.month && value.jump(month, year);
  };

  const changeHandler = (index: number) => {
    const newBigData = { ...objs.bigData };
    if (type === "datecompleted")
      newBigData.completedTasks[indexes].tasks[0].tasksName[index].status =
        !newBigData.completedTasks[indexes].tasks[0].tasksName[index].status;
    else
      newBigData.calendarTasks[indexes].tasks[0].tasksName[index].status =
        !newBigData.calendarTasks[indexes].tasks[0].tasksName[index].status;

    objs.setBigData(newBigData);
  };

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip
      id="button-tooltip"
      onMouseEnter={() => setShow((prev) => ({ ...prev, tooltip: true }))}
      onMouseLeave={() => setShow((prev) => ({ ...prev, tooltip: false }))}
      {...props}
    >
      {task.tasksName.map((a, index) => (
        <div key={index} className="ptooltip d-flex">
          <p
            className="d-inline-block m-auto my-2 fontMedium px-2"
            style={{ userSelect: "all" }}
          >
            {a.name}
          </p>
          {type === "datedeadline" ? (
            <Form.Check
              type="checkbox"
              id={`check-api-checkbox`}
              isValid
              className="d-inline-block pe-2"
              style={{ marginTop: ".4em" }}
              checked={a.status}
              onChange={() => changeHandler(index)}
            ></Form.Check>
          ) : a.status ? (
            <div className="my-2">
              <CheckmarkSharp color="green" />
            </div>
          ) : (
            <div className="my-2">
              <CloseSharp color="red" />
            </div>
          )}
        </div>
      ))}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={!isFirstBreak ? "bottom" : "left"}
      delay={{ show: 5, hide: 5 }}
      overlay={renderTooltip}
      show={show.tooltip || show.element}
    >
      <div
        key={task._id}
        className={className}
        style={style}
        onClick={clickHandler}
        data-month={month}
        data-year={year}
        onMouseEnter={() => setShow((prev) => ({ ...prev, element: true }))}
        onMouseLeave={() =>
          setTimeout(
            () =>
              setShow((prev) => ({ ...prev, element: show.tooltip || false })),
            200
          )
        }
      >
        <h6
          className="m-auto fw-bold mb-1"
          style={{ fontSize: ".7em", position: "relative" }}
          onClick={clickHandler}
          data-month={month}
          data-year={year}
        >{`${date} ${new Date(year, month)
          .toLocaleString("default", {
            month: "long",
          })
          .substring(0, 3)} ${year}`}</h6>

        {deadline ? (
          <>
            {deadline.map((a, index) => (
              <h6
                key={index}
                className="m-auto fw-semibold "
                style={{ fontSize: ".6em" }}
                onClick={clickHandler}
                data-month={month}
                data-year={year}
              >
                {a}
              </h6>
            ))}
            {urgency!.days < urgency!.red && (
              <img src={walkingduck} width="25px" className="m-auto"></img>
            )}
            <h6
              className="m-auto mt-1 fw-semibold"
              style={{ fontSize: ".7em", position: "absolute", bottom: "10%" }}
              onClick={clickHandler}
              data-month={month}
              data-year={year}
            >
              {`${
                urgency!.days < urgency!.red
                  ? "It's the DAY!!!"
                  : urgency!.days < urgency!.yellow
                  ? "Don't forget!!"
                  : "Chill..!"
              }`}
            </h6>
          </>
        ) : (
          <h6
            className="m-auto mt-4 fw-semibold"
            style={{ fontSize: ".8em" }}
            data-month={month}
            data-year={year}
          >
            Completed
          </h6>
        )}
      </div>
    </OverlayTrigger>
  );
};
