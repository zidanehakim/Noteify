import { useEffect, useState } from "react";

import "../styles/DateLeftWidgets.css";
import { dayDivider } from "../utilities/dayDivider";
import { byFips } from "country-code-lookup";

import { useDatesContext } from "../hooks/useDatesContext";

import { useMediaQuery } from "react-responsive";
import { Button, Offcanvas } from "react-bootstrap";
import { ReorderThreeSharp } from "react-ionicons";
import { DateRightWidgets } from "./DateRightWidgets";

type DateLeftWidgetsProps = {
  className: string;
};

type weatherType = {
  main: { temp: number; humidity: number };
  weather: { main: string }[];
  wind: { speed: number };
};

export const DateLeftWidgets = ({ className }: DateLeftWidgetsProps) => {
  const isSecondBreak = useMediaQuery({ query: "(min-width: 1350px)" });
  const value = useDatesContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ChangeWeather, setChangeWeather] = useState([] as weatherType[]);

  useEffect(() => {
    const key = import.meta.env.VITE_WEATHER_ID;
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`
        );
        const data = await response.json();
        value.setCountryName({
          country: byFips(data.city.country)?.country,
          city: data.city.name,
        });
        setChangeWeather(
          dayDivider(data.list, Math.floor(data.list.length / 5))
        );
      } catch (err) {
        console.error("Error:", err);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isSecondBreak ? (
        <div className={className}>
          <div className="gridOne bg-red my-2 mx-2 rounded">
            <div
              className={
                ChangeWeather[0]?.weather[0]?.main.includes("Rain")
                  ? "raining icon"
                  : "cloudy icon"
              }
            ></div>
            <div className="temperature text-white">
              <h4 className="gridOnes mx-2 px-1">{`${Math.floor(
                ChangeWeather[0]?.main.temp - 273
              )}°`}</h4>
              <div className="gridTwos px-1 pb-1">
                <h6 className="fontSMini">Wind</h6>
                <h6 className="fontMini fw-bold">{`${Math.floor(
                  ChangeWeather[0]?.wind?.speed * 3.6
                )} km/h`}</h6>
              </div>
              <div className="gridThrees px-1 pb-1">
                <h6 className="fontSMini">Humidity</h6>
                <h6 className="fontMini fw-bold">{`${ChangeWeather[0]?.main?.humidity}%`}</h6>
              </div>
            </div>
          </div>
          <div className="gridTwo d-flex d-flex-column flex-wrap">
            {ChangeWeather.map(
              (a, index) =>
                index !== 0 && (
                  <div
                    key={index}
                    className="bg-orange m-auto rounded text-center text-white box"
                    style={{
                      width: "8em",
                      height: "4em",
                    }}
                  >
                    <div
                      className={
                        a?.weather[0]?.main.includes("Rain")
                          ? "raining gridOnes"
                          : "cloudy gridOnes"
                      }
                    ></div>
                    <div className="text-white gridTwos mt-2">
                      <h6 className="fontSemi fw-semibold ">{`${Math.floor(
                        a?.main.temp - 273
                      )}°`}</h6>
                      <h6 className="fontSMini fw-bold">{`in ${index} days`}</h6>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="dark"
            onClick={handleShow}
            className="gridFour position-fixed"
            style={{
              width: "fit-content",
              height: "fit-content",
              borderRadius: ".5em 0 0 .5em",
              right: "0",
              top: "5.7em",
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
          <Offcanvas show={show} placement="end" style={{ zIndex: "9999" }}>
            <Offcanvas.Body className="dateleftwidgets bg-dark">
              <div className="gridOne bg-red my-2 mx-2 rounded">
                <div
                  className={
                    ChangeWeather[0]?.weather[0]?.main.includes("Rain")
                      ? "raining icon"
                      : "cloudy icon"
                  }
                ></div>
                <div className="temperature text-white">
                  <h4 className="gridOnes px-3">{`${Math.floor(
                    ChangeWeather[0]?.main.temp - 273
                  )}°`}</h4>
                  <div className="gridTwos px-3 pb-1">
                    <h6 className="fontSMini">Wind</h6>
                    <h6 className="fontSemi fw-bold">{`${Math.floor(
                      ChangeWeather[0]?.wind?.speed * 3.6
                    )} km/h`}</h6>
                  </div>
                  <div className="gridThrees px-3 pb-1">
                    <h6 className="fontSMini">Humidity</h6>
                    <h6 className="fontSemi fw-bold">{`${ChangeWeather[0]?.main?.humidity}%`}</h6>
                  </div>
                </div>
              </div>
              <div className="gridTwo d-flex d-flex-column flex-wrap">
                {ChangeWeather.map(
                  (a, index) =>
                    index !== 0 && (
                      <div
                        key={index}
                        className="bg-orange m-auto rounded text-center text-white box"
                        style={{
                          width: "8em",
                          height: "4em",
                        }}
                      >
                        <div
                          className={
                            a?.weather[0]?.main.includes("Rain")
                              ? "raining gridOnes"
                              : "cloudy gridOnes"
                          }
                        ></div>
                        <div className="text-white gridTwos mt-2">
                          <h6 className="fontMedium fw-semibold ">{`${Math.floor(
                            a?.main.temp - 273
                          )}°`}</h6>
                          <h6 className="fontMini fw-bold">{`in ${index} days`}</h6>
                        </div>
                      </div>
                    )
                )}
              </div>
              <DateRightWidgets className={"gridThree"} />
              <Button
                className="gridFour bg-red border-0 my-4"
                onClick={handleClose}
              >
                Close
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
};
