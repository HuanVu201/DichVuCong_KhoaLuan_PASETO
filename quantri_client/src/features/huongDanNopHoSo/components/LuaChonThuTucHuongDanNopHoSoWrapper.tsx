import { IHoSo } from "@/features/hoso/models";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { useTruongHopThuTucColumn } from "@/features/hoso/hooks/useTruongHopThuTucColumn";
import { ISearchTruongHopThuTuc } from "@/features/truonghopthutuc/models";
import {
  GetDuLieuThemHoSo,
  SearchTruongHopThuTuc,
} from "@/features/truonghopthutuc/redux/action";
import { AntdDivider, AntdSelect, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import {
  ElementRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import { filterOptions, filterOptionsWithTitle } from "@/utils/select";
import {
  LOAITIEPNHAN_FORMNOPTRUCTIEP,
  LOAITIEPNHAN_OPTIONS,
} from "@/features/hoso/data/formData";
import {
  resetDatas,
  resetDuLieuThemHoSo,
} from "@/features/truonghopthutuc/redux/slice";

import { FORMAT_DATE } from "@/data";
import { INPUT_RULES } from "@/features/hoso/data/formRules";
import { ISearchThuTuc } from "@/features/thutuc/models";
import { Select } from "antd/lib";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { RenderTitle } from "@/components/common";

export const LuaChonThuTucHuongDanNopHoSoWrapper = ({
  form,
  extraSearchThuTuc,
}: {
  extraSearchThuTuc?: ISearchThuTuc;
  form: FormInstance<IHoSo>;
}) => {
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);
  const { datas: truongHopThuTucs, duLieuThemHoSo } = useAppSelector(
    (state) => state.truonghopthutuc
  );
  const { data: user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({
    pageNumber: 1,
    pageSize: 100,
    reFetch: true,
    byUserOfficeCode: true,
  });
  const [selectedTruongHop, setSelectedTruongHop] = useState<string>();
  const [selectedThuTuc, setSelectedThuTuc] = useState<string>();
  const columns = useTruongHopThuTucColumn();
  useEffect(() => {
    if (thuTucs === undefined && user !== undefined) {
      dispatch(
        SearchThuTuc({
          pageNumber: 1,
          pageSize: 300,
          reFetch: true,
          donVi: user.officeCode,
          nguoiTiepNhanId: user.id,
          laThuTucChungThuc: false,
          ...extraSearchThuTuc,
        })
      );
    }
    return () => {
      dispatch(resetDuLieuThemHoSo());
      dispatch(resetDatas());
      form.setFieldValue("thuTucId", undefined);
    };
  }, [thuTucs, user]);

  useEffect(() => {
    if (duLieuThemHoSo && duLieuThemHoSo?.truongHopthuTuc) {
      const truongHopThuTuc = duLieuThemHoSo.truongHopthuTuc;

      form.setFieldValue(
        "ngayTiepNhan",
        duLieuThemHoSo.ngayTiepNhan ? dayjs(duLieuThemHoSo.ngayTiepNhan) : null
      );
      form.setFieldValue(
        "ngayHenTra",
        duLieuThemHoSo.ngayHenTra ? dayjs(duLieuThemHoSo.ngayHenTra) : null
      );
      form.setFieldValue("truongHopId", truongHopThuTuc.id);
      form.setFieldValue("maTruongHop", truongHopThuTuc.ma);
      form.setFieldValue("tenTruongHop", truongHopThuTuc.ten);
      form.setFieldValue("thoiHanBuocXuLy", truongHopThuTuc.thoiGianThucHien);
      form.setFieldValue(
        "loaiThoiHanBuocXuLy",
        truongHopThuTuc.loaiThoiGianThucHien
      );
    } else {
      form.setFieldValue("ngayTiepNhan", undefined);
      form.setFieldValue("ngayHenTra", undefined);
      form.setFieldValue("truongHopId", undefined);
      form.setFieldValue("maTruongHop", undefined);
      form.setFieldValue("tenTruongHop", undefined);
      form.setFieldValue("thoiHanBuocXuLy", undefined);
      form.setFieldValue("loaiThoiHanBuocXuLy", undefined);
    }
  }, [duLieuThemHoSo?.truongHopthuTuc]);

  useEffect(() => {
    if (selectedTruongHop) {
      dispatch(
        GetDuLieuThemHoSo({
          thuTucId: form.getFieldValue("maTTHC"),
          truongHopId: selectedTruongHop,
          returnPhiLePhi: true,
        })
      );
    }
  }, [selectedTruongHop]);

  useEffect(() => {
    if (truongHopThuTucs?.length) {
      setSelectedTruongHop(truongHopThuTucs[0].ma);
    }
    return () => {
      setSelectedTruongHop(undefined);
    };
  }, [truongHopThuTucs]);

  useEffect(() => {
    if (thuTucs && thuTucs?.length == 1) {
      const thuTuc = thuTucs[0];
      setSelectedThuTuc(thuTuc.maTTHC);
      form.setFieldValue("maTTHC", thuTuc.maTTHC);
      form.setFieldValue("tenTTHC", thuTuc.tenTTHC);
      form.setFieldValue("trichYeuHoSo", thuTuc.tenTTHC);
      setSearchParams(
        (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: thuTuc.maTTHC })
      );
    }
  }, [thuTucs]);

  const onChangeThuTuc = (maTTHC: string, attrs: any) => {
    dispatch(resetDuLieuThemHoSo());
    setSelectedTruongHop(undefined);
    const kenhThucHien = attrs["data-kenhthuchien"];
    const maLinhVucChinh = attrs["data-malinhvucchinh"];
    const trichYeuHoSo = attrs["data-trichyeuhoso"];
    form.setFieldValue("kenhThucHien", "1");

    if (thuTucs?.length && thuTucs?.length == 1) {
      setSelectedThuTuc(maTTHC);
    }
    if (!maTTHC) {
      setSearchParams(
        (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: undefined })
      );
      return;
    }

    form.setFieldValue("maTTHC", maTTHC);
    form.setFieldValue("tenTTHC", trichYeuHoSo);
    form.setFieldValue("trichYeuHoSo", trichYeuHoSo);
    setSearchParams(
      (curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: maTTHC })
    );
    form.setFieldValue("linhVucId", maLinhVucChinh);
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedTruongHop(selectedRowKeys[0] as string);
    },
    selectedRowKeys: [selectedTruongHop] as any,
  };

  return (
    <>
      <>
        <RenderTitle title="Lựa chọn thủ tục" />
        <Form.Item name="thuTucId">
          {/* {thuTucs?.length && thuTucs.length > 0 ? (
            <AntdSelect
              showSearch
              placeholder={<span style={{color:"#000"}}>Chọn thủ tục tiếp nhận</span>}
              defaultValue={
                thuTucs?.length && thuTucs.length == 1
                  ? thuTucs[0].maTTHC
                  : undefined
              }
              onChange={onChangeThuTuc}
              generateOptions={{
                model: thuTucs,
                value: 'maTTHC',
                label: 'tenTTHC',
              }}
            ></AntdSelect>
          ) : null} */}

          {thuTucs?.length && thuTucs.length > 0 ? (
            <Select
              placeholder={
                <span style={{ color: "#000" }}>Chọn thủ tục tiếp nhận</span>
              }
              key="1"
              style={{ width: "100%" }}
              defaultValue={
                thuTucs?.length && thuTucs.length == 1
                  ? thuTucs[0].maTTHC
                  : undefined
              }
              filterOption={filterOptionsWithTitle}
              allowClear
              showSearch
              onChange={onChangeThuTuc}
            >
              {thuTucs?.map((thutuc, idx) => {
                const title = `${thutuc.tenTTHC} ${
                  thutuc.mucDo ? "- " + MUCDO_THUTUC[thutuc.mucDo] : ""
                }`;
                return (
                  <Select.Option
                    title={title}
                    key={idx}
                    value={thutuc.maTTHC}
                    data-kenhthuchien={"1"}
                    data-malinhvucchinh={thutuc.maLinhVucChinh}
                    data-trichyeuhoso={thutuc.tenTTHC}
                  >
                    <span style={{ fontSize: "1rem" }}>{title}</span>
                  </Select.Option>
                );
              })}
            </Select>
          ) : null}
          {/* số lượng thủ tục lớn hơn 1 */}
          {/* {thuTucs != undefined && thuTucs?.length  && selectedThuTuc === undefined ? <Select placeholder={<span style={{color:"#000"}}>Chọn thủ tục tiếp nhận</span>} key="2" style={{ width: "100%" }}  filterOption={filterOptions}  allowClear showSearch onChange={onChangeThuTuc}  >
                    {thuTucs?.map((thutuc, idx) => {
                        const title = `${thutuc.tenTTHC} ${thutuc.mucDo ? "- " +MUCDO_THUTUC[thutuc.mucDo] : ""}`
                        return <Select.Option title={title} key={idx} value={thutuc.maTTHC} data-kenhthuchien={"1"} data-malinhvucchinh={thutuc.maLinhVucChinh} data-trichyeuhoso={thutuc.tenTTHC}>
                            <span style={{fontSize:"1rem"}}>{title}</span>
                        </Select.Option>
                    })}
                </Select> : null} */}
        </Form.Item>
      </>
      {searchParams.thuTucId ? (
        <>
          <>
            <RenderTitle title="Lựa chọn trường hợp" />
            <AntdTable
              style={{ marginBottom: 12 }}
              rowKey={"ma"}
              columns={columns}
              dataSource={truongHopThuTucs}
              pagination={false}
              rowSelection={{ type: "radio", ...rowSelection }}
              onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />

            <AntdDivider />
          </>
        </>
      ) : null}
    </>
  );
};
