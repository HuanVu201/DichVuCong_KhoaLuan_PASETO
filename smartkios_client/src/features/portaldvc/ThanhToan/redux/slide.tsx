import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";
import {
  GetGiaoDichThanhToanByMaThamChieu,
  InitPayment,
  SearchYeuCauThanhToanPortal,
} from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import {
  IGiaoDichThanhToan,
  IGiaoDichThanhToanDetailPortal,
} from "../models/GiaoDichThanhToan";

export interface IYeuCauThanhToanState
  extends ExtendedState<IYeuCauThanhToanPortal> {
  giaoDichThanhToan: IGiaoDichThanhToan | undefined;
  giaoDichThanhToanDetail?: IGiaoDichThanhToanDetailPortal;
}

const initialState: IYeuCauThanhToanState = {
  loading: false,
  giaoDichThanhToan: undefined,
};

const Slice = createGenericSlice({
  name: "YeuCauThanhToanPortal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        SearchYeuCauThanhToanPortal.fulfilled,
        (state, YeuCauThanhToan) => {
          state.loading = false;
          state.datas = YeuCauThanhToan.payload.data;
          state.count = YeuCauThanhToan.payload.totalCount;
        }
      )
      .addCase(
        GetGiaoDichThanhToanByMaThamChieu.fulfilled,
        (state, YeuCauThanhToan) => {
          state.loading = false;
          state.giaoDichThanhToanDetail = YeuCauThanhToan.payload.data;
        }
      )
      .addCase(InitPayment.fulfilled, (state, YeuCauThanhToan) => {
        state.loading = false;
        state.giaoDichThanhToan = YeuCauThanhToan.payload;
      })
      .addMatcher(
        isPending(
          SearchYeuCauThanhToanPortal,
          InitPayment,
          GetGiaoDichThanhToanByMaThamChieu
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          SearchYeuCauThanhToanPortal,
          InitPayment,
          GetGiaoDichThanhToanByMaThamChieu
        ),
        (state, YeuCauThanhToan) => {
          toast.error((YeuCauThanhToan.payload as any)?.response?.data);
          state.loading = false;
        }
      );
  },
});

export const { resetData, resetDatas } = Slice.actions;

export default Slice.reducer;
