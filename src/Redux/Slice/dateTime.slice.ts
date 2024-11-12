import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface DateState {
  currentMonth: number;
  currentYear: number;
  selectedDate: string;
}

const today = new Date();

const initialState: DateState = {
  currentMonth: today.getMonth() + 1,
  currentYear: today.getFullYear(),
  selectedDate: "",
};

const dateTimeSlice = createSlice({
  name: "dateTimeSlice",
  initialState,
  reducers: {
    setCurrentMonth: (state, { payload }: PayloadAction<number>) => {
      state.currentMonth = payload;
    },
    setCurrentYear: (state, { payload }: PayloadAction<number>) => {
      state.currentYear = payload;
    },
    setSelectedDate: (state, { payload }: PayloadAction<string>) => {
      state.selectedDate = payload;
    },
    goToNextMonth: (state) => {
      if (state.currentMonth === 12) {
        state.currentMonth = 1;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
    },
    goToPreviousMonth: (state) => {
      if (state.currentMonth === 1) {
        state.currentMonth = 12;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
    },
    handleToday: (state) => {
      const today = new Date();
      state.currentMonth = today.getMonth() + 1;
      state.currentYear = today.getFullYear();
      state.selectedDate = dayjs(today).format("MM-DD-YYYY");
    },
  },
});

export const {
  goToNextMonth,
  goToPreviousMonth,
  handleToday,
  setCurrentMonth,
  setCurrentYear,
  setSelectedDate,
} = dateTimeSlice.actions;

export default dateTimeSlice;
