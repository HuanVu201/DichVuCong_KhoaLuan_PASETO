import { useMemo } from "react";

import { ColumnsType } from "antd/es/table";

import { IBasePagination } from "@/models";

import { ICoCauToChuc } from "@/features/cocautochuc/models";

export const useColumnChonDonVis = (pagination: IBasePagination) => {
  const columns = useMemo((): ColumnsType<ICoCauToChuc> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      // {
      //     title: "Mã đơn vị",
      //     key: "ma",
      //     dataIndex: "ma",
      // },
      {
        title: "Tên đơn vị",
        key: "groupName",
        dataIndex: "groupName",
      },
    ];
  }, [pagination]);
  return { columns };
};
