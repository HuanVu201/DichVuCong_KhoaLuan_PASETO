import { useYeuCauThanhToanColumn } from "@/features/hoso/hooks/useYeuCauThanhToanColumn";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ChoThuPhiProvider } from "@/pages/dvc/thuphilephi/chothuphi/contexts/ChoThuPhiContext";
import React, { useEffect, useState } from "react";
const PhiLePhiTabTable = () => {
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
  });
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const { datas: yeuCauThanhToans } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const columns = useYeuCauThanhToanColumn({
    pagination: {
      pageNumber: searchParams.pageNumber,
      pageSize: searchParams.pageSize,
    },
    items: [],
  });
  useEffect(() => {
    if (hoSo != undefined) {
      setSearchParams((curr) => ({ ...curr, maHoSo: hoSo.maHoSo }));
    }
  }, [hoSo]);
  return (
    <>
      {searchParams.maHoSo ? (
        <AntdTable
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchYeuCauThanhToan(params))}
          columns={columns}
          dataSource={yeuCauThanhToans}
        />
      ) : null}
    </>
  );
};
function PhiLePhiTab() {
  return (
    <ChoThuPhiProvider>
      <PhiLePhiTabTable />
    </ChoThuPhiProvider>
  );
}

export default PhiLePhiTab;
