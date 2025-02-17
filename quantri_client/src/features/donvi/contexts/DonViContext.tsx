import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { IWithChildren } from "@/types";
import { DefaultOptionType } from "antd/es/select";
import React, { createContext, useContext, useState } from "react";

const DonViContext = createContext<IDonViContext | null>(null);

export interface IDonViContext {
  donViId: string | undefined;
  setDonViId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  donViModalVisible: boolean;
  setDonViModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  selectedUserOptions: DefaultOptionType[];
  setSelectedUserOptions: React.Dispatch<
    React.SetStateAction<DefaultOptionType[]>
  >;

  addMultiDonViModalVisible: boolean;
  setAddMultiDonViModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  chonMucDoModalVisible: boolean;
  setChonMucDoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  chonDonVisModalVisible: boolean;
  setChonDonVisModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  selectedDonVis: ICoCauToChuc[];
  setSelectedDonVis: React.Dispatch<React.SetStateAction<ICoCauToChuc[]>>;

  selectedDonViThuTucs: string[];
  setSelectedDonViThuTucs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useDonViContext = () => {
  const context = useContext(DonViContext);
  if (!context)
    throw new Error("DonViContext must be used inside DonViContext.Provider");
  return context;
};

export const DonViProvider = ({ children }: IWithChildren) => {
  const [donViId, setDonViId] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserOptions, setSelectedUserOptions] = useState<
    DefaultOptionType[]
  >([]);
  const [selectedDonViThuTucs, setSelectedDonViThuTucs] = useState<string[]>(
    []
  );
  const [chonMucDoModalVisible, setChonMucDoModalVisible] =
    useState<boolean>(false);
  const [donViModalVisible, setDonViModalVisible] = useState<boolean>(false);
  const [addMultiDonViModalVisible, setAddMultiDonViModalVisible] =
    useState<boolean>(false);
  const [chonDonVisModalVisible, setChonDonVisModalVisible] =
    useState<boolean>(false);
  const [selectedDonVis, setSelectedDonVis] = useState<ICoCauToChuc[]>([]);
  // thêm các hàm search cho các tabs ở đây
  return (
    <DonViContext.Provider
      value={{
        donViId,
        setDonViId,
        donViModalVisible,
        setDonViModalVisible,
        selectedUsers,
        setSelectedUsers,
        selectedUserOptions,
        setSelectedUserOptions,
        addMultiDonViModalVisible,
        setAddMultiDonViModalVisible,
        chonDonVisModalVisible,
        setChonDonVisModalVisible,
        selectedDonVis,
        setSelectedDonVis,
        selectedDonViThuTucs,
        setSelectedDonViThuTucs,
        chonMucDoModalVisible,
        setChonMucDoModalVisible,
      }}
    >
      {children}
    </DonViContext.Provider>
  );
};
