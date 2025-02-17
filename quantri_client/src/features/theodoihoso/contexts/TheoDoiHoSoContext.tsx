import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TheoDoiHoSoContext = createContext<ITheoDoiHoSoContext | null>(null);

export interface ITheoDoiHoSoContext {
  TheoDoiHoSoId: string | undefined;
  setTheoDoiHoSoId: React.Dispatch<React.SetStateAction<string | undefined>>;
  detailTheoDoiHoSoModalVisible: boolean;
  setDetailTheoDoiHoSoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const useTheoDoiHoSoContext = () => {
  const context = useContext(TheoDoiHoSoContext);
  if (!context)
    throw new Error(
      "TheoDoiHoSoContext must be used inside TheoDoiHoSoContext.Provider"
    );
  return context;
};

export const TheoDoiHoSoProvider = ({ children }: IWithChildren) => {
  const [TheoDoiHoSoId, setTheoDoiHoSoId] = useState<string>();
  const [detailTheoDoiHoSoModalVisible, setDetailTheoDoiHoSoModalVisible] =
    useState<boolean>(false);
  // thêm các hàm search cho các tabs ở đây
  return (
    <TheoDoiHoSoContext.Provider
      value={{
        TheoDoiHoSoId,
        setTheoDoiHoSoId,
        detailTheoDoiHoSoModalVisible,
        setDetailTheoDoiHoSoModalVisible,
      }}
    >
      {children}
    </TheoDoiHoSoContext.Provider>
  );
};
