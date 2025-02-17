import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchYeuCauThanhToan } from "../models";

const YeuCauThanhToanContext = createContext<IYeuCauThanhToanContext | null>(
  null
);

export interface IYeuCauThanhToanContext {
  searchParams: ISearchYeuCauThanhToan;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchYeuCauThanhToan>>;
  yeuCauThanhToanModalVisible: boolean;
  setYeuCauThanhToanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useYeuCauThanhToanContext = () => {
  const context = useContext(YeuCauThanhToanContext);
  if (!context)
    throw new Error(
      "YeuCauThanhToanContext must be used inside YeuCauThanhToanContext.Provider"
    );
  return context;
};

export const YeuCauThanhToanProvider = ({ children }: IWithChildren) => {
  const [yeuCauThanhToanModalVisible, setYeuCauThanhToanModalVisible] =
    useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 100,
  });
  // thêm các hàm search cho các tabs ở đây
  return (
    <YeuCauThanhToanContext.Provider
      value={{
        searchParams,
        setSearchParams,
        yeuCauThanhToanModalVisible,
        setYeuCauThanhToanModalVisible,
      }}
    >
      {children}
    </YeuCauThanhToanContext.Provider>
  );
};
