import useGenerateDateTime from "../../Hooks/useGenerateDateTime/useGenerateDateTime";
import { dataSample } from "../../Constant/dataSample";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiLiveLine } from "react-icons/ri";
import { GoRocket } from "react-icons/go";
import { LiaSearchSolid } from "react-icons/lia";
import dayjs from "dayjs";
import customStyle from "./SmalllCalendar.module.scss";
const SmallCalendar = () => {
  const {
    currentMonth,
    currentYear,
    generateCalendar,
    goToNextMonth,
    goToPreviousMonth,
    handleSelectDate,
    handleToday,
    selectedDate,
    handleCheckActiveDay,
    handleEventList,
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

  const eventsForSelectedDate = selectedDate
    ? handleEventList(selectedDate)
    : [];

  //fuction

  const openInNewTab = (link: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  return (
    <div className={customStyle.SmallCalendarContainer}>
      <div className={customStyle.SmallCalendarHeader}>
        <button onClick={goToPreviousMonth}>
          <IoIosArrowBack />
        </button>
        <div>
          {monthNames[currentMonth - 1]} {currentYear}
        </div>
        <button onClick={goToNextMonth}>
          <IoIosArrowForward />
        </button>
      </div>

      <div className={customStyle.SmallCalendarBody}>
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
                        className={`${customStyle.cell}  ${
                          handleCheckActiveDay(day.date) &&
                          day.isDateInMonth &&
                          customStyle.activeDay
                        }`}
                        onClick={() => {
                          day.isDateInMonth && handleSelectDate(day.date);
                        }}
                      >
                        {day.date && day.isDateInMonth ? (
                          <div
                            className={`${customStyle.day} ${
                              day.eventList.length > 0 && customStyle.hasEvent
                            } ${
                              handleCheckActiveDay(day.date) &&
                              customStyle.activeDay
                            } `}
                          >
                            {day.date}
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

      <div className={customStyle.SmallCalendarFooter}>
        <div className={customStyle.header}>
          <h1>Upcoming Events</h1>
          {selectedDate && (
            <p>Today, {dayjs(selectedDate, "DD-MM-YYYY").format("D MMMM")} </p>
          )}
        </div>

        <div className={customStyle.eventList}>
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((item, index) => {
              return (
                <div
                  className={`${customStyle.event} ${
                    customStyle[item.event_type]
                  }`}
                  key={`${item.event_name}-${index}`}
                >
                  <h3>{item.event_name}</h3>
                  <p>
                    {item.event_start_time} - {item.event_end_time}
                  </p>
                  <p>
                    Location: <span>{item.location}</span>
                  </p>
                  <div
                    className={`${customStyle.icons}  ${
                      customStyle[item.event_type]
                    } `}
                    onClick={() => {
                      item.event_link && openInNewTab(item.event_link);
                    }}
                  >
                    {item.event_type === "webinar" ? (
                      <GoRocket />
                    ) : item.event_type === "appointment" ? (
                      <RiLiveLine />
                    ) : (
                      <LiaSearchSolid />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No event for this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallCalendar;
