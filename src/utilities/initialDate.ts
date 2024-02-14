import { JsonCalendar } from "json-calendar";

export const changeDate = (month: number, year: number) => {
  const init = new JsonCalendar({
    today: new Date(year, month),
  });

  const iterate = init.weeks.map((objs) => objs.map((obj) => obj.day));

  const initialDate = {
    dates: iterate,
    month: month,
    year: year,
  };

  return { initialDate };
};
