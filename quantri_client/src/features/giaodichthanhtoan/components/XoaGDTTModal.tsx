import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
  IAntdTabsProps,
} from "@/lib/antd/components";

import { useAppDispatch } from "@/lib/redux/Hooks";
import { DataNode } from "antd/es/tree";
import { toast } from "react-toastify";
import { DeleteGiaoDichThanhToan, SearchGiaoDichThanhToan } from "../redux/action";
import { useGiaoDichThanhToanContext } from "../contexts/GiaoDichThanhToanContext";
import { ISearchGiaoDichThanhToan } from "../models";
export const XoaGdttModal = ({
  handleCancel,
  searchParams

}: {
  handleCancel: () => void;
  searchParams: ISearchGiaoDichThanhToan

}) => {
  const dispatch = useAppDispatch();
  const gdttContext = useGiaoDichThanhToanContext();
  const handleSubmit = async () => {
    if (
      gdttContext.giaoDichThanhToanId &&
      (gdttContext.giaoDichThanhToanId.length == 1)
    ) {
      var res = await dispatch(DeleteGiaoDichThanhToan({ id: gdttContext.giaoDichThanhToanId[0].toString(), forceDelete: false })).unwrap();

      if (res.succeeded) {
        dispatch(SearchGiaoDichThanhToan(searchParams))
      }
    }
    handleCancel();
  };
  return (
    <>
      <AntdModal
        title="Xoá"
        handlerCancel={handleCancel}
        visible={true}
        footer={<AntdSpace align="center">
          <AntdButton type="primary" onClick={handleSubmit}>
            Xác nhận
          </AntdButton>
          <AntdButton type="default" onClick={handleCancel}>
            Đóng
          </AntdButton>
        </AntdSpace>}
        destroyOnClose
      >
        <div>Xác nhận xoá giao dịch thanh toán?</div>

      </AntdModal>
    </>
  );
};
