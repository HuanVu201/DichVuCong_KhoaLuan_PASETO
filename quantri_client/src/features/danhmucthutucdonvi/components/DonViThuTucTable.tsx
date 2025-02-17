import { useCallback, useEffect, useMemo, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchDonViThuTuc } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { GetDonViThuTuc, SearchDonViThuTuc } from "../redux/action";
import { DonViThuTucSearch } from "./DonViThuTucSearch";
import {
  DonViThuTucProvider,
  useDonViThuTucContext,
} from "../contexts/DonViThuTucContext";
import { DonViThuTucDetail } from "./DonViThuTucDetail";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { IDonVi, ISearchDonVi } from "@/features/donvi/models";
import { SearchDonVi } from "@/features/donvi/redux/action";

import { Button, Row, Space, Table } from "antd";
import { toast } from "react-toastify";
import { ThemCanBoTiepNhanModal } from "./ThemCanBoTiepNhanModal";
import { ChonMucDoModal } from "./ChonMucDoModal";
import { UpdateTkThuHuongModal } from "./UpdateTkThuHuongModal";
import { BoSungCanBoTiepNhanModal } from "./BoSungCanBoTiepNhanModal";
import { XuatDanhSachDonViThuTucModal } from "./XuatDanhSachDonViThuTuc";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

const DanhMucDonViThuTucTable = () => {
  const dispatch = useAppDispatch();
  const {
    datas: donViThuTucs,
    data: DonViThuTuc,
    loading,
    count,
  } = useAppSelector((state) => state.donvi);

  const donViThuTucContext = useDonViThuTucContext();

  const [searchParams, setSearchParams] = useState<ISearchDonVi>({
    pageNumber: 1,
    pageSize: 100,
    Removed: false,
  });
  const { columns } = useColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    setSearchParams
  );
  const [selectedDonViThuTucs, setSelectedDonViThuTucs] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedDonViThuTucs(newSelectedRowKeys);
    donViThuTucContext.setSelectedDonViThuTucs(
      newSelectedRowKeys.filter((t: string) => t.indexOf("parent") == -1)
    );
  };
  const rowSelection = {
    selectedDonViThuTucs,
    onChange: onSelectTableChange,
  };
  const uniqueDonViThuTuc = useMemo(() => {
    if (donViThuTucs) {
      const uniqueDonViThuTuc = [
        ...new Map(donViThuTucs.map((item) => [item.donViId, item])).values(),
      ];
      setExpandedRowKeys(
        uniqueDonViThuTuc.map((itemUnique) => "parent" + itemUnique.id)
      );
      var tmpuniqueDonViThuTuc = uniqueDonViThuTuc.map((itemUnique) => {
        return {
          id: "parent" + itemUnique.id,
          donViId: itemUnique.donViId,
          groupName: itemUnique.groupName,
          children: donViThuTucs
            .filter((x) => x.donViId == itemUnique.donViId)
            .map((item, index) => {
              return { ...item, groupName: "", index: index + 1 };
            }),
        } as IDonVi;
      });

      return tmpuniqueDonViThuTuc;
    }
  }, [donViThuTucs]);
  const inDanhSach = () => {
    if (searchParams.donViId) {
      downloadPhieuExcel("Danh sách thủ tục", "ContainerSwapper");
    } else {
      toast.warning("Vui lòng chọn đơn vị")
    }
  }
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Button
            type="primary"
            className="m-1"
            onClick={() => {
              if (donViThuTucContext.selectedDonViThuTucs.length > 0) {
                donViThuTucContext.setThemCanBoTiepNhanModalVisible(true);
              } else {
                toast.error("Chưa chọn thủ tục!");
              }
            }}
          >
            Thêm cán bộ tiếp nhận
          </Button>
          <Button
            type="primary"
            className="m-1"
            style={{ backgroundColor: "rgb(255, 184, 72)" }}
            onClick={() => {
              if (donViThuTucContext.selectedDonViThuTucs.length > 0) {
                donViThuTucContext.setBoSungCanBoTiepNhanModalVisible(true);
              } else {
                toast.error("Chưa chọn thủ tục!");
              }
            }}
          >
            Bổ sung cán bộ tiếp nhận
          </Button>
          <Button
            type="default"
            className="m-1"
            onClick={() => {
              if (donViThuTucContext.selectedDonViThuTucs.length > 0) {
                donViThuTucContext.setChonMucDoModalVisible(true);
              } else {
                toast.error("Chưa chọn thủ tục!");
              }
            }}
          >
            Chọn mức độ
          </Button>
          <Button
            type="default"
            className="m-1"
            onClick={() => {
              if (donViThuTucContext.selectedDonViThuTucs.length > 0) {
                donViThuTucContext.setUpdateTkThuHuongModalVisible(true);
              } else {
                toast.error("Chưa chọn thủ tục!");
              }
            }}
          >
            Cập nhật tài khoản thụ hưởng
          </Button>
        </Row>
        <DonViThuTucSearch setSearchParams={setSearchParams} inDanhSach={inDanhSach} />
        <AntdTable
          bordered
          loading={loading}
          columns={columns}
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand: (expanded, record) => {
              if (expanded) setExpandedRowKeys([...expandedRowKeys, record.id]);
              else
                setExpandedRowKeys(
                  expandedRowKeys.filter((x) => x != record.id)
                );
            },
          }}
          dataSource={uniqueDonViThuTuc}
          rowSelection={{ ...rowSelection, checkStrictly: false }}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchDonVi(params))}
        />
        {donViThuTucContext.themCanBoTiepNhanModalVisible ? (
          <ThemCanBoTiepNhanModal
            handleCancel={() =>
              donViThuTucContext.setThemCanBoTiepNhanModalVisible(false)
            }
            onReload={() => dispatch(SearchDonVi(searchParams))}
          />
        ) : null}
        {donViThuTucContext.boSungCanBoTiepNhanModalVisible ? (
          <BoSungCanBoTiepNhanModal
            handleCancel={() =>
              donViThuTucContext.setBoSungCanBoTiepNhanModalVisible(false)
            }
            onReload={() => dispatch(SearchDonVi(searchParams))}
          />
        ) : null}
        {donViThuTucContext.chonMucDoModalVisible ? (
          <ChonMucDoModal
            handleCancel={() =>
              donViThuTucContext.setChonMucDoModalVisible(false)
            }
            onReload={() => dispatch(SearchDonVi(searchParams))}
          />
        ) : null}
        {donViThuTucContext.updateTkThuHuongModalVisible ? (
          <UpdateTkThuHuongModal
            handleCancel={() =>
              donViThuTucContext.setUpdateTkThuHuongModalVisible(false)
            }
            onReload={() => dispatch(SearchDonVi(searchParams))}
          />
        ) : null}
        {donViThuTucs && donViThuTucs.length > 0 ? <XuatDanhSachDonViThuTucModal data={donViThuTucs} /> : null}
      </AntdSpace>
    </>
  );
};
const DanhMucDonViThuTucTableWrapper = () => (
  <DonViThuTucProvider>
    <DanhMucDonViThuTucTable />
  </DonViThuTucProvider>
);
export default DanhMucDonViThuTucTableWrapper;
