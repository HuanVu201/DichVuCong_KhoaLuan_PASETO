import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TypeOfProc_MgrContext = createContext<ITypeOfProc_MgrContext | null>(
  null
);

export interface ITypeOfProc_MgrContext {
  typeOfProc_MgrId: string | undefined;
  setTypeOfProc_MgrId: React.Dispatch<React.SetStateAction<string | undefined>>;
  typeOfProc_MgrModalVisible: boolean;
  setTypeOfProc_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


  List_ProcOfThisTyPeModalVisible: boolean;
  setList_ProcOfThisTyPeModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const useTypeOfProc_MgrContext = () => {
  const context = useContext(TypeOfProc_MgrContext);
  if (!context)
    throw new Error(
      "TypeOfProc_MgrContext must be used inside TypeOfProc_MgrContext.Provider"
    );
  return context;
};

export const TypeOfProc_MgrProvider = ({ children }: IWithChildren) => {
  const [typeOfProc_MgrId, setTypeOfProc_MgrId] = useState<string>();
  const [typeOfProc_MgrModalVisible, setTypeOfProc_MgrModalVisible] =
    useState<boolean>(false);
  const [List_ProcOfThisTyPeModalVisible, setList_ProcOfThisTyPeModalVisible] =
    useState<boolean>(false);
  // thêm các hàm search cho các tabs ở đây
  return (
    <TypeOfProc_MgrContext.Provider
      value={{
        typeOfProc_MgrId,
        setTypeOfProc_MgrId,
        typeOfProc_MgrModalVisible,
        setTypeOfProc_MgrModalVisible,
        List_ProcOfThisTyPeModalVisible,
        setList_ProcOfThisTyPeModalVisible
      }}
    >
      {children}
    </TypeOfProc_MgrContext.Provider>
  );
};
