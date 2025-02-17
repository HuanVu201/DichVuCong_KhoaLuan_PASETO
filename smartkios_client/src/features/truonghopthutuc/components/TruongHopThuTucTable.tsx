import { Suspense, lazy, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchTruongHopThuTuc } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { NhanBanTruongHopThuTuc, SearchTruongHopThuTuc } from "../redux/action";
import { TruongHopThuTucSearch } from "./TruongHopThuTucSearch";
import {
  TruongHopThuTucProvider,
  useTruongHopThuTucContext,
} from "../contexts/TruongHopThuTucContext";
import { TruongHopThuTucDetail } from "./TruongHopThuTucDetail";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { Form, Input, Modal, Spin } from "antd";
import { ChonDonViThucHienRiengModal } from "./modals/ChonDonViThucHienRieng";
import { toast } from "react-toastify";
import { truongHopThuTucApi } from "../services";
import { DuplicateQuyTrinhXuLy } from "@/features/quytrinhxuly/redux/action";

const EFormLazy = lazy(() => import("./modals/EForm"));
const EFormKetQuaLazy = lazy(() => import("./modals/EFormKetQua"));
const ReactFlowModalLazy = lazy(() => import("./modals/ReactFlowModal"));
const TruongHopThuTucTable = () => {
  const dispatch = useAppDispatch();
  const { datas: TruongHopThuTucs, count } = useAppSelector(
    (state) => state.truonghopthutuc
  );
  const truongHopThuTucContext = useTruongHopThuTucContext();
  const thuTucContext = useThuTucContext();
  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({
    pageNumber: 1,
    pageSize: 10,
    thuTucId: thuTucContext.thuTucId,
  });
  const columns = useColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    setSearchParams
  );
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <TruongHopThuTucSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={TruongHopThuTucs}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))}
        />
      </AntdSpace>
      {truongHopThuTucContext.truongHopThuTucModalVisible ? (
        <TruongHopThuTucDetail setSearchParams={setSearchParams} />
      ) : null}

      {truongHopThuTucContext.selectDonViThucHienRiengModalVisible ? (
        <ChonDonViThucHienRiengModal
          handleCancel={() => {
            truongHopThuTucContext.setSelectDonViThucHienRiengModalVisible(
              false
            );
          }}
        />
      ) : null}
      <Suspense
        fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
      >
        {truongHopThuTucContext.eFormModalVisible ? <EFormLazy /> : null}
        {truongHopThuTucContext.eFormModalKetQuaVisible ? (
          <EFormKetQuaLazy />
        ) : null}
        {truongHopThuTucContext.flowModalVisible ? (
          <ReactFlowModalLazy />
        ) : null}
      </Suspense>

      {/* Modal Confirm sao chép trường hợp thủ tục */}
      {truongHopThuTucContext.confirmCopyTHTTVisible ? (
        <Modal
          title="Bạn muốn sao chép trường hợp thủ tục này không?"
          open={truongHopThuTucContext.confirmCopyTHTTVisible}
          onOk={async () => {
            const id = truongHopThuTucContext.truongHopThuTucId;
            const res = await truongHopThuTucApi.NhanBanTruongHopThuTuc({ id });
            if (res.status == 201) {
              toast.success("Đã sao chép trường hợp thủ tục!");
              setSearchParams((cur) => ({
                ...cur,
                thuTucId: thuTucContext.thuTucId,
              }));
              truongHopThuTucContext.setConfirmCopyTHTTVisible(false);
              truongHopThuTucContext.setTruongHopThuTucId("");
              truongHopThuTucContext.setMaTHTTVisible("");
            }
          }}
          onCancel={() => {
            truongHopThuTucContext.setConfirmCopyTHTTVisible(false);
            truongHopThuTucContext.setTruongHopThuTucId("");
          }}
        >
          <p>Mã trường hợp: {truongHopThuTucContext.maTHTTVisible}</p>
        </Modal>
      ) : null}

      {/* Modal Confirm sao chép thành phần thủ tục */}
      {truongHopThuTucContext.confirmCopyTPTTVisible ? (
        <Modal
          title="Sao chép quy trình từ thủ tục khác"
          open={truongHopThuTucContext.confirmCopyTPTTVisible}
          onOk={async () => {
            const id = truongHopThuTucContext.truongHopThuTucId ?? "";
            const maTruongHop = form.getFieldValue("maTruongHop")
              ? form.getFieldValue("maTruongHop").trim()
              : "";
            var result = await dispatch(
              DuplicateQuyTrinhXuLy({ id: id, maTruongHop: maTruongHop })
            ).unwrap();
            form.setFieldValue("maTruongHop", "");
            truongHopThuTucContext.setConfirmCopyTPTTVisible(false);
          }}
          onCancel={() => {
            truongHopThuTucContext.setConfirmCopyTPTTVisible(false);
            truongHopThuTucContext.setTruongHopThuTucId("");
          }}
        >
          <Form form={form} layout="vertical" name="CopyQuyTrinhXuLy">
            <Form.Item name="maTruongHop" label="Nhập mã trường hợp:">
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>
          </Form>
        </Modal>
      ) : null}

      {/* Modal Confirm Xóa trường hợp thủ tục */}
      {truongHopThuTucContext.confirmDeleteTHTTVisible ? (
        <Modal
          title="Bạn muốn xóa trường hợp thủ tục này không?"
          open={truongHopThuTucContext.confirmDeleteTHTTVisible}
          onOk={async () => {
            const id = truongHopThuTucContext.truongHopThuTucId;
            const res = await truongHopThuTucApi.Delete({
              id,
              forceDelete: false,
            });
            if (res.status == 200) {
              toast.success("Đã xóa trường hợp thủ tục!");
              setSearchParams((cur) => ({
                ...cur,
                thuTucId: thuTucContext.thuTucId,
              }));
              truongHopThuTucContext.setConfirmDeleteTHTTVisible(false);
              truongHopThuTucContext.setTruongHopThuTucId("");
              truongHopThuTucContext.setMaTHTTVisible("");
            }
          }}
          onCancel={() => {
            truongHopThuTucContext.setConfirmDeleteTHTTVisible(false);
            truongHopThuTucContext.setTruongHopThuTucId("");
          }}
        >
          <p>Mã trường hợp: {truongHopThuTucContext.maTHTTVisible}</p>
        </Modal>
      ) : null}
    </>
  );
};
const TruongHopThuTucTableWrapper = () => (
  <TruongHopThuTucProvider>
    <TruongHopThuTucTable />
  </TruongHopThuTucProvider>
);
export default TruongHopThuTucTableWrapper;
