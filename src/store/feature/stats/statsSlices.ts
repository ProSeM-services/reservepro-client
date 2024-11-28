import { IAppointment } from "@/interfaces/appointments.interface";
import { MonthlyData } from "@/layers/dashboard/models";
import { ICustomerStat } from "@/layers/dashboard/models/customer-stats.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface StatsState extends IStoreState {
  appointmentStats: MonthlyData[];
  customersStats: ICustomerStat[];
  calenderAppointments: IAppointment[];
  calendarDate: Date;
}

const initialState: StatsState = {
  loading: true,
  fetched: false,
  calenderAppointments: [],
  appointmentStats: [],
  customersStats: [],
  calendarDate: new Date(),
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setAppointmentsStats: (state, action: PayloadAction<MonthlyData[]>) => {
      state.appointmentStats = action.payload;
    },
    setCustomerStats: (state, action: PayloadAction<ICustomerStat[]>) => {
      state.customersStats = action.payload;
    },
    setCalendarAppointments: (
      state,
      action: PayloadAction<{ appointments: IAppointment[]; date: Date }>
    ) => {
      state.calenderAppointments = action.payload.appointments;
      state.calendarDate = action.payload.date;
    },
  },
});

export const {
  setAppointmentsStats,
  setCustomerStats,
  setCalendarAppointments,
} = statsSlice.actions;
export default statsSlice.reducer;
