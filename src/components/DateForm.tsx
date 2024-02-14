import React, { SetStateAction, useState } from "react";
import "../styles/DateForm.css";
import { Button, Form } from "react-bootstrap";
import { GithubPicker } from "react-color";

import { useDndContext } from "../hooks/useDndContext";

import ObjectID from "bson-objectid";
import { initialDataType } from "../utilities/initialData";

type DateFormProps = {
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
};

enum colorsName {
  "#f03d34" = "red",
  "#1d9136" = "green",
  "#fcc815" = "yellow",
  "#69a9e6" = "blue",
  "#c4a84b" = "brown",
  "#7055af" = "purple",
  "#fe5b7c" = "pink",
  "#1fc1c3" = "aqua",
}

const colors = [
  "#f03d34",
  "#1d9136",
  "#fcc815",
  "#69a9e6",
  "#c4a84b",
  "#7055af",
  "#fe5b7c",
  "#1fc1c3",
];

export const DateForm = ({ setSelectedKey }: DateFormProps) => {
  const objs = useDndContext();

  const [color, setColor] = useState("#f03d34");
  const [tasks, setTasks] = useState([""] as string[]);

  const [isCreated, setIsCreated] = useState(false);

  const colorHandler = (e: { hex: SetStateAction<string> }) => {
    setColor(e.hex);
  };

  const inputHandler = (e: { target: { value: string } }) => {
    const obj = e.target as unknown as HTMLElement;
    const newTasks = [...tasks];

    newTasks[Number(obj.dataset.index)] = e.target.value;
    setTasks(newTasks);
  };

  const buttonHandlerAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newTasks = [...tasks];
    newTasks.push("");
    setTasks(newTasks);
  };

  const buttonHandlerDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newTasks = [...tasks];
    newTasks.pop();
    setTasks(newTasks);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBigdata: initialDataType = JSON.parse(
      JSON.stringify(objs.bigData)
    );
    const newColor: colorsName = colorsName[color as keyof typeof colorsName];
    const id = new ObjectID();

    const newTasks = tasks.map((a) => ({ name: a, status: false }));
    newBigdata.columns.maker[2].tasks.push({
      _id: id.toHexString(),
      color: newColor,
      tasksName: newTasks,
    });

    objs.setPrevBigData([...objs.prevBigData, objs.bigData]);
    objs.setNextBigData([]);
    objs.setBigData(newBigdata);

    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
      setSelectedKey("tasks");
      setColor("#f03d34");
      setTasks([""] as string[]);
    }, 1000);
  };

  return (
    <Form className="dateform py-2" onSubmit={submitHandler}>
      <Form.Group
        className="mb-3 gridOne px-4"
        controlId="exampleForm.ControlInput1"
      >
        <div
          className="mb-3 m-auto px-2 py-1"
          style={{
            width: "8em",
            height: "8em",
            backgroundColor: color,
          }}
        >
          {tasks.map((a, index) => (
            <h6
              className="fontSemi"
              key={index}
              style={{
                fontFamily: "'Single Day', monospace",
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {a}
            </h6>
          ))}
        </div>
        <GithubPicker
          colors={colors}
          color={color}
          onChangeComplete={colorHandler}
          width="7.1em"
        />
      </Form.Group>
      <Form.Group
        className="mb-3 gridTwo"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label className="fontMedium fw-semibold">Tasks list</Form.Label>
        {tasks.map((a, index) => (
          <Form.Control
            key={index}
            required
            maxLength={18}
            value={a}
            onChange={inputHandler}
            size="sm"
            type="text"
            placeholder="Small text"
            data-index={index}
            className="fontMini text-white mb-1"
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "1px solid white",
              borderRadius: "0",
              outline: "0",
            }}
          />
        ))}
        {tasks.length < 5 && (
          <Button
            disabled={isCreated}
            onClick={buttonHandlerAdd}
            className="mt-3 me-2 bg-red border-0"
          >
            <h6 className="fontMini m-auto">Add</h6>
          </Button>
        )}
        {tasks.length > 1 && (
          <Button
            disabled={isCreated}
            onClick={buttonHandlerDelete}
            className="mt-3 bg-red border-0"
          >
            <h6 className="fontMini m-auto position">Remove</h6>
          </Button>
        )}
      </Form.Group>
      <Form.Group className="mb-3 gridThree fontMedium">
        {isCreated && (
          <div className="text-success mb-2 fw-semibold m-auto text-center">
            Successfully created!
          </div>
        )}
        <Button
          disabled={isCreated}
          type="submit"
          className="px-5 w-100 m-auto fw-semibold bg-red border-0 mb-2"
        >
          Save Note
        </Button>
      </Form.Group>
    </Form>
  );
};
