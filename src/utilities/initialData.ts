export type task = {
  _id: string;
  tasksName: { name: string; status: boolean }[];
  color: string;
};

export type calendarType = {
  _id: string;
  date: number;
  month: number;
  year: number;
  tasks: task[];
};

export type makerType = {
  _id: string;
  tasks: task[];
};

export type initialDataType = {
  completedTasks: calendarType[];
  calendarTasks: calendarType[];
  columns: { maker: makerType[]; calendar: calendarType[] };
};

export const changeData = (
  dates: number[][],
  month: number,
  year: number,
  makerList: makerType[],
  calendarTasks: calendarType[],
  completedTasks: calendarType[]
) => {
  const initialData: initialDataType = {
    completedTasks,
    calendarTasks,
    columns: {
      maker: makerList,
      calendar: [],
    },
  };

  let count = 0;
  let temp = -1;
  let monthdiff = 1;
  dates.map((a) =>
    a.map((b) => {
      const obj: calendarType = {
        _id: `c${count}`,
        date: b,
        month: month,
        year: year,
        tasks: [],
      };

      if ((Math.abs(b - temp) > 1 && temp !== -1) || b === 1)
        monthdiff = monthdiff + 1;

      obj.month = obj.month - 2 + monthdiff;

      if (obj.month === -1) {
        obj.year = year - 1;
        obj.month = 11;
      } else if (obj.month === 12) {
        obj.year = year + 1;
        obj.month = 0;
      }

      initialData.columns.calendar.push(obj);
      count = count + 1;
      temp = b;
    })
  );

  initialData?.calendarTasks?.map((a: calendarType) => {
    const index = initialData?.columns?.calendar.findIndex((b) => {
      return b.date === a.date && b.month === a.month && b.year === a.year;
    });

    if (initialData?.columns && index >= 0)
      initialData.columns.calendar[index].tasks = [...a.tasks];
  });

  const uniqueIds: string[] = [];
  const filteredCompletedTasks = initialData?.completedTasks
    ?.reverse()
    .filter((a) => {
      const isDuplicate = uniqueIds.includes(a._id);

      if (!isDuplicate) {
        uniqueIds.push(a._id);

        return true;
      }

      return false;
    });

  filteredCompletedTasks.map((a: calendarType) => {
    const exists = initialData.calendarTasks.findIndex((b) => {
      return a._id === b._id;
    });

    if (exists < 0) {
      const index = initialData?.columns?.calendar.findIndex((b) => {
        return b.date === a.date && b.month === a.month && b.year === a.year;
      });

      if (initialData?.columns && index >= 0)
        initialData.columns.calendar[index].tasks = [...a.tasks];
    }
  });

  filteredCompletedTasks.reverse();

  return { initialData };
};
