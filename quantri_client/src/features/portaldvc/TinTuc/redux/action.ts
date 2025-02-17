import { ITinBaiPortal } from '../models/TinBai';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TinBaiPortalService } from "../services/TinBai";
import { IPaginationResponse, IPickSearch } from "@/models";

const TinBaiPortalApi = new TinBaiPortalService();

export const SearchTinBaiPortal = createAsyncThunk<
  IPaginationResponse<ITinBaiPortal[]>,
  IPickSearch<ITinBaiPortal>
>("SearchTinBaiPortal", async (params, thunkApi) => {
  try {
    const res = await TinBaiPortalApi.Search(params);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
