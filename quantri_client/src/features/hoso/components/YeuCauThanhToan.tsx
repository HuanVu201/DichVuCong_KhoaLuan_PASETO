import {
  ISearchYeuCauThanhToan,
  IYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { useYeuCauThanhToanColumn } from "../hooks/useYeuCauThanhToanColumn";
import { GetHoSoParam } from "../services";
import { useButtonActionContext } from "../contexts/ButtonActionsContext";
import { ISearchHoSo } from "../models";
import { GetHoSo } from "../redux/action";
import { ChoThuPhiProvider } from "@/pages/dvc/thuphilephi/chothuphi/contexts/ChoThuPhiContext";

const YeuCauThanhToanTable = ({
  yeuCauThanhToans,
}: {
  yeuCauThanhToans: IYeuCauThanhToan[] | undefined;
}) => {
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
  });
  const columns = useYeuCauThanhToanColumn({
    pagination: {
      pageNumber: searchParams.pageNumber,
      pageSize: searchParams.pageSize,
    },
    items: [],
  });
  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={yeuCauThanhToans}
        onSearch={() => {}}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export const YeuCauThanhToan = ({
  yeuCauThanhToans,
}: {
  yeuCauThanhToans: IYeuCauThanhToan[] | undefined;
}) => {
  return (
    <ChoThuPhiProvider>
      <YeuCauThanhToanTable yeuCauThanhToans={yeuCauThanhToans} />
    </ChoThuPhiProvider>
  );
};
