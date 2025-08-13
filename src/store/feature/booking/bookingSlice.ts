import { ICompany, IService } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IBookinData {
  companyId: string;
  service?: IService;
  duration: string;
  member?: IMember;
  time: string;
  date: string;
}
export interface BookingState extends IStoreState {
  step: number;
  bookingData: IBookinData;
  error: boolean;
}

const initialState: BookingState = {
  step: 0,
  loading: true,
  fetched: false,
  error: false,
  bookingData: {
    companyId: "",
    service: undefined,
    duration: "",
    member: undefined,
    date: new Date().toISOString(),
    time: "",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setError: (state) => {
      state.step = 5;
    },
    setStep: (state, action: PayloadAction<"forward" | "back" | "error">) => {
      if (action.payload === "error") {
        state.step = 5;
        return;
      }

      if (action.payload === "back" && state.step === 0) {
        return;
      }
      if (action.payload === "back" && state.step === 5) {
        state.step = 2;
        return;
      }

      state.step =
        action.payload === "forward" ? state.step + 1 : state.step - 1;
    },
    setBookinData: (
      state,
      action: PayloadAction<{
        key: keyof IBookinData;
        value: string | number | ICompany | IService | IMember;
      }>
    ) => {
      const { key, value } = action.payload;
      state.bookingData = { ...state.bookingData, [key]: value };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStep, setBookinData } = bookingSlice.actions;

export default bookingSlice.reducer;
