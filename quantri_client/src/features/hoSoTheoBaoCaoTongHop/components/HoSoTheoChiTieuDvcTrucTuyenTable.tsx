import { useEffect, useMemo, useState } from "react";
import { AntdTable, AntdSpace, AntdModal } from "../../../lib/antd/components";

import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "../contexts/HoSoTheoBaoCaoTongHopContext";

import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { screenType } from "@/features/hoso/data";
import { useHoSoTheoBaoCaoTongHopColumn } from "../hooks/useHoSoTheoBaoCaoTongHopColumn";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import { ISearchHoSoTheoBaoCaoTongHopParams } from "@/features/hoso/models";
import {
  SearchHoSoTheoBaoCaoTongHop,
  SearchHoSoTheoChiTieuDvcTrucTuyen,
  SearchHoSoTheoTiepNhanTrucTuyen,
} from "@/features/hoso/redux/action";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { Button } from "antd";
import { XuatDanhSachHoSoModal } from "../exportElements/XuatDanhSachHoSo";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "../exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
const HoSoTheoChiTieuDvcTrucTuyenTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const {
    datas: hoSos,
    count,
    loading,
  } = useAppSelector((state) => state.hoso);

  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );

  const { columns } = useHoSoTheoBaoCaoTongHopColumn(
    {
      pageNumber: hoSoTheoBaoCaoTongHopContext.searchParams.pageNumber,
      pageSize: hoSoTheoBaoCaoTongHopContext.searchParams.pageSize,
    },
    items
  );
  useEffect(() => {
    dispatch(
      SearchHoSoTheoChiTieuDvcTrucTuyen(
        hoSoTheoBaoCaoTongHopContext.searchParams
      )
    );
  }, [hoSoTheoBaoCaoTongHopContext.searchParams]);
  return (
    <AntdModal
      visible={true}
      title={"Danh sách hồ sơ"}
      fullsizeScrollable
      footer={null}
      handlerCancel={() =>
        hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(false)
      }
    >
      <LazyActions
        setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchParams}
      >
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
            <Button
              onClick={() => {
                downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
              }}
            >
              <FileExcelOutlined style={{ color: "#36a3f7" }} /> In danh sách
            </Button>
          </AntdSpace>
          <AntdTable
            columns={columns}
            dataSource={hoSos}
            pagination={{
              total: count,
            }}
            loading={loading}
            searchParams={hoSoTheoBaoCaoTongHopContext.searchParams}
            setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchParams}
            onSearch={(params) => {}}
          />
        </AntdSpace>
      </LazyActions>
      <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} />
    </AntdModal>
  );
};
const HoSoTheoChiTieuDvcTrucTuyenWrapper = () => (
  <ButtonActionProvider>
    <HoSoTheoChiTieuDvcTrucTuyenTable />
  </ButtonActionProvider>
);
export default HoSoTheoChiTieuDvcTrucTuyenWrapper;
