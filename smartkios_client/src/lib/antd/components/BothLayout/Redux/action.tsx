import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuPortalService } from "../Services/KenhTin";
import { IMenuPortal } from "../Models/KenhTin";
import { IPaginationResponse, IPickSearch } from "@/models";

const MenuPortalApi = new MenuPortalService();

export const SearchMenuPortal = createAsyncThunk<
  IPaginationResponse<IMenuPortal[]>,
  IPickSearch<IMenuPortal>
>("SearchMenuPortal", async (params, thunkApi) => {
  try {
    const res = await MenuPortalApi.Search(params);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
