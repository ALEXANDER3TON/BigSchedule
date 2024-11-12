import React from "react";
import useGenerateDateTime from "../../Hooks/useGenerateDateTime/useGenerateDateTime";
import { dataSample } from "../../Constant/dataSample";
import customStyle from "./BigCalendar.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const BigCalendar: React.FC = (): JSX.Element => {
  const {
    currentMonth,
    currentYear,
    selectedDate,
    generateCalendar,
    goToNextMonth,
    goToPreviousMonth,
    handleSelectDate,
    handleToday,
    handleCheckActiveDay,
  } = useGenerateDateTime({ dataEvent: dataSample });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //fuction

  const openInNewTab = (link: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  return (
    <div className={customStyle.BigCalendarContainer}>
      <div className={customStyle.BigCalendarHeader}>
        <button onClick={handleToday} className={customStyle.todayBtn}>
          Today
        </button>
        <button onClick={goToPreviousMonth}>
          <IoIosArrowBack size={30} />
        </button>

        <button onClick={goToNextMonth}>
          <IoIosArrowForward />
        </button>
        <div>
          {monthNames[currentMonth - 1]} {currentYear}
        </div>
      </div>

      <div className={customStyle.BigCalendarBody}>
        <table>
          <thead>
            <tr className={`${customStyle.row}`}>
              <th className={`${customStyle.cell}`}>Sun</th>
              <th className={`${customStyle.cell}`}>Mon</th>
              <th className={`${customStyle.cell}`}>Tue</th>
              <th className={`${customStyle.cell}`}>Wed</th>
              <th className={`${customStyle.cell}`}>Thu</th>
              <th className={`${customStyle.cell}`}>Fri</th>
              <th className={`${customStyle.cell}`}>Sat</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex} className={`${customStyle.row}`}>
                {generateCalendar(currentMonth, currentYear)
                  .slice(rowIndex * 7, (rowIndex + 1) * 7)
                  .map((day, index) => {
                    return (
                      <td
                        key={index}
                        className={`${customStyle.cell} ${
                          day.eventList.length > 0 && customStyle.hasEvent
                        } ${
                          handleCheckActiveDay(day.date) &&
                          day.isDateInMonth &&
                          customStyle.activeDay
                        }`}
                        onClick={() => {
                          day.isDateInMonth && handleSelectDate(day.date);
                        }}
                      >
                        {day.date && day.isDateInMonth ? (
                          <div>
                            <div
                              className={`${customStyle.day} ${
                                handleCheckActiveDay(day.date) &&
                                customStyle.activeDay
                              }`}
                            >
                              {day.date}
                            </div>
                            <div className={customStyle.eventContainer}>
                              {day.eventList.map((event) => (
                                <div
                                  key={event.event_id}
                                  className={`${customStyle.event} ${
                                    customStyle[event.event_type]
                                  }`}
                                  onClick={() => {
                                    event.event_link &&
                                      openInNewTab(event.event_link);
                                  }}
                                >
                                  <span>{event.event_name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BigCalendar;
