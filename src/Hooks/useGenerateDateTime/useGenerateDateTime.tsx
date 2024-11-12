import React, { useCallback, useMemo, useState } from "react";
import customStyle from "./useGenerateDateTime.module.css";
import { EventType } from "../../Types/dataEvent.type";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import {
  goToNextMonth,
  goToPreviousMonth,
  handleToday,
  setSelectedDate,
} from "../../Redux/Slice/dateTime.slice";

interface Props {
  dataEvent: Record<string, EventType[]>;
}

interface DayType {
  date: number;
  eventList: EventType[];
  isDateInMonth: boolean;
}
const useGenerateDateTime = ({ dataEvent }: Props) => {
  const dispatch = useAppDispatch();
  const { currentMonth, currentYear, selectedDate } = useAppSelector(
    (state: RootState) => state.dateTimeSlice
  );

  //function
  const formatDate = (day: number, month: number, year: number) =>
    dayjs(new Date(year, month - 1, day)).format("MM-DD-YYYY");

  const daysInMonth = useCallback(
    (month: number, year: number) =>
      dayjs(new Date(year, month - 1)).daysInMonth(),
    []
  );

  const handleCheckActiveDay = (day: number) => {
    const convertDay = day < 10 ? `0${day}` : day;
    const convertMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    return `${convertMonth}-${convertDay}-${currentYear}` === selectedDate;
  };

  const handleSelectDate = (day: number) => {
    const formattedDate = formatDate(day, currentMonth, currentYear);
    dispatch(setSelectedDate(formattedDate));
  };

  const generateCalendar = useMemo(
    () => (month: number, year: number) => {
      const days: DayType[] = [];
      const date = new Date(year, month - 1, 1);
      const firstDay = date.getDay();
      const totalDays = daysInMonth(month, year);

      for (let i = 0; i < firstDay; i++) {
        days.push({ date: i, eventList: [], isDateInMonth: false });
      }

      for (let i = 1; i <= totalDays; i++) {
        const dateString = formatDate(i, currentMonth, currentYear);
        const events = dataEvent[dateString] || [];
        days.push({ date: i, eventList: events, isDateInMonth: true });
      }
      return days;
    },
    [currentMonth, currentYear, dataEvent, daysInMonth]
  );

  const handleEventList = useCallback(
    (date: string) => {
      const Arrayed = Object.entries(dataEvent);
      const eventListIndex = Arrayed.findIndex(([key, value]) => key === date);
      return eventListIndex !== -1 ? Arrayed[eventListIndex][1] : [];
    },
    [dataEvent]
  );

  return {
    currentMonth,
    currentYear,
    selectedDate,
    generateCalendar,
    goToNextMonth: () => dispatch(goToNextMonth()),
    goToPreviousMonth: () => dispatch(goToPreviousMonth()),
    handleSelectDate,
    handleToday: () => dispatch(handleToday()),
    handleCheckActiveDay,
    handleEventList,
  };
};

export default useGenerateDateTime;
