import {} from "@/interfaces";
import { IAppointment } from "@/interfaces/appointments.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppointmentState extends IStoreState {
  value: number;
  appointments: IAppointment[];
  selectedAppointment?: IAppointment;
  inmutablesAppointments: IAppointment[];
}

const initialState: AppointmentState = {
  value: 0,
  appointments: [],
  inmutablesAppointments: [],
  selectedAppointment: undefined,
  loading: true,
  fetched: false,
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    toggleAppointmentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppointments: (state, action: PayloadAction<IAppointment[]>) => {
      state.fetched = true;
      state.appointments = action.payload;
      state.inmutablesAppointments = action.payload;
    },
    addAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointments.push(action.payload);
      state.inmutablesAppointments.push(action.payload);
    },
    setSelectedAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.selectedAppointment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAppointment,
  setAppointments,
  toggleAppointmentsLoading,
  setSelectedAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
