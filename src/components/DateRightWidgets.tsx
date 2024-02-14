import { useEffect, useState } from "react";
import "../styles/DateRightWidgets.css";

import { useDatesContext } from "../hooks/useDatesContext";

type DateRightWidgetsProps = {
  className: string;
};

export const DateRightWidgets = ({ className }: DateRightWidgetsProps) => {
  const value = useDatesContext();

  const [dateNow, setDateNow] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const tempDate = new Date();

      setDateNow(
        `${
          tempDate.getHours() !== 12
            ? tempDate.getHours() === 0
              ? 12
              : tempDate.getHours() % 12
            : tempDate.getHours()
        }:`
      );

      if (tempDate.getMinutes() < 10)
        setDateNow((prev) => prev + `0${tempDate.getMinutes()}:`);
      else setDateNow((prev) => prev + `${tempDate.getMinutes()}:`);

      if (tempDate.getSeconds() < 10)
        setDateNow((prev) => prev + `0${tempDate.getSeconds()}`);
      else setDateNow((prev) => prev + `${tempDate.getSeconds()}`);

      if (tempDate.getHours() > 12) setDateNow((prev) => prev + ` PM`);
      else setDateNow((prev) => prev + ` AM`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <div className="gridOne bg-dark text-white d-flex flex-column">
        <h6 className="m-auto pt-2 fw-semibold fontSemi ">
          {new Date().toLocaleDateString("default", { weekday: "long" })}
        </h6>
        <h3 className="m-auto pb-3">{new Date().getDate()}</h3>
      </div>
      <div className="gridTwo d-flex flex-column px-3 pt-2 bg-white">
        <h6 className="fw-semibold mt-1">
          {`${new Date().getFullYear()} ${new Date()
            .toLocaleString("default", { month: "long" })
            .substring(0, 3)}`}
        </h6>
        <h6 className="fontSemi">{dateNow}</h6>
        <h6 className="fontSemi">
          {value.countryName.city && value.countryName.country
            ? `${value.countryName.city}, ${value.countryName.country}`
            : "Looking for location"}
        </h6>
      </div>
    </div>
  );
};
