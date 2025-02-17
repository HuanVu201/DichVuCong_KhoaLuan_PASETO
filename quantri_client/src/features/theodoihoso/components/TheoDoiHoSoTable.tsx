import { useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchHoSo } from "../../hoso/models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchHoSo } from "../../hoso/redux/action";
import { TheoDoiHoSoSearch } from "./TheoDoiHoSoSearch";
import {
  TheoDoiHoSoProvider,
  useTheoDoiHoSoContext,
} from "../contexts/TheoDoiHoSoContext";
import { TheoDoiHoSoDetail } from "./TheoDoiHoSoDetail";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

const TheoDoiHoSoTable = () => {
  const dispatch = useAppDispatch();
  const { datas: hoSos, count } = useAppSelector((state) => state.hoso);
  const theoDoiHoSoContext = useTheoDoiHoSoContext();
  const buttonActionContext = useButtonActionContext();
  const {btnElememts} = useButtonActions({
    maScreen: screenType["theo-doi-ho-so-tn"],
  });
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 10,
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <TheoDoiHoSoSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchHoSo(params))}
        />
      </AntdSpace>
      {theoDoiHoSoContext.detailTheoDoiHoSoModalVisible ? (
        <TheoDoiHoSoDetail />
      ) : null}
    </>
  );
};
const TheoDoiHoSoWrapper = () => (
  <TheoDoiHoSoProvider>
    <TheoDoiHoSoTable />
  </TheoDoiHoSoProvider>
);
export default TheoDoiHoSoWrapper;
