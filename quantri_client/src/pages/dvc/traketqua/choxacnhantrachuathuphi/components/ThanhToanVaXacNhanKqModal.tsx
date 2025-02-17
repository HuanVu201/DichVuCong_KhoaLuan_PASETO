import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import {
  GetHoSo,
  XacNhanKetQuaVaYeuCauThuPhi,
  YeuCauThuPhi,
} from "@/features/hoso/redux/action";
import {
  AntdButton,
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdTable,
  AntdUpLoad,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, Input, InputNumber, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { LOAIPHILEPHI_OPTIONS, LOAIPHILEPHI_PAYMENT_OPTIONS } from "@/features/hoso/data/formData";
import { IPhiLePhi, ISearchPhiLePhi } from "@/features/philephi/models";
import { YeuCauThuPhiParams } from "@/features/hoso/services";
import { YeuCauThanhToan } from "@/features/hoso/components/YeuCauThanhToan";
import { PhiLePhi } from "@/features/hoso/components/PhiLePhi";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { filterOptions, getCurrency } from "@/utils";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { PlusCircleOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { usePhiLePhiColumn } from "@/features/hoso/hooks/usePhiLePhiColumn";

const YeuCauThanhToanVaXacNhanKqModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<
    React.SetStateAction<ISearchYeuCauThanhToan>
  >;
}) => {
  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  const [form] = Form.useForm<YeuCauThuPhiParams>();
  const buttonActionContext = useButtonActionContext();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const { datas: yeuCauThanhToans } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const [searchPhiLePhiParams, setSearchPhiLePhiParams] =
    useState<ISearchPhiLePhi>({
      pageNumber: 1,
      pageSize: 100,
      reFetch: true,
    });
  const [dataSource, setDataSource] = useState<IPhiLePhi[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [defaultSelected, setDefaultSelected] = useState<string | undefined>(undefined)
  const [hasCharge,setHasCharge] = useState<string[]>(["Thu trước", "Thu sau"]);
    const hinhThucThu = Form.useWatch("hinhThucThu", form);
  const dispatch = useAppDispatch();
  const updateSoTien = (datas: IPhiLePhi[]) => {
    let tongPhi = 0;
    let tongLePhi = 0;
    datas.forEach((row) => {
      if (row.loai == "Lệ phí") {
        tongLePhi += row.soTien;
      } else if (row.loai == "Phí") {
        tongPhi += row.soTien;
      }
    });
    form.setFieldValue("phiThu", tongPhi);
    form.setFieldValue("lePhiThu", tongLePhi);
    form.setFieldValue("tongTien", tongPhi + tongLePhi);
  };
  useEffect(() => {
    (async () => {
      if (buttonActionContext.selectedHoSos.length) {
        await dispatch(
          GetHoSo({
            id: buttonActionContext.selectedHoSos[0] as string,
            view: "yeuCauThanhToan"
          })
        );
      }
    })();
  }, [buttonActionContext.selectedHoSos]);
 
  const handleCancel = () => {
    buttonActionContext.setYeuCauThanhToanVaXacNhanKqModalVisible(false);
    buttonActionContext.setSelectedHoSos([]);
  };
  useEffect(() => {
    // tính tổng tiền
    const selectedRows = dataSource.filter((x) =>
      selectedRowKeys.includes(x.id)
    );
    updateSoTien(selectedRows);
    // updateSoTien(selectedRows)
  }, [dataSource, selectedRowKeys]);
  const onOk = async () => {
    const formData = await form.validateFields();
    if (buttonActionContext.selectedHoSos.length) {
      var phi = form.getFieldValue("phiThu")
        ? parseInt(form.getFieldValue("phiThu"))
        : 0;
      var lePhi = form.getFieldValue("lePhiThu")
        ? parseInt(form.getFieldValue("lePhiThu"))
        : 0;
      var tongSo = phi + lePhi;
      const chiTietJson = dataSource.map((item) => {
        if (selectedRowKeys.includes(item.id)) {
          return { ...item, selected: true };
        }
        return item;
      });
      const chiTiet = JSON.stringify(chiTietJson);
      const res = await dispatch(
        XacNhanKetQuaVaYeuCauThuPhi({
          id: buttonActionContext.selectedHoSos[0] as string,
          phi: phi,
          lePhi: lePhi,
          soTien: tongSo,
          chiTiet: chiTiet,
          hinhThucThu: hinhThucThu
        })
      ).unwrap();
      if (res.succeeded) {
        setSearchHoSoParams((curr) => ({ ...curr }));
        handleCancel();
      }
    }
  };
  const columns = usePhiLePhiColumn({ setDataSource, dataSource });
  const onAddRow = () => {
    const newRow: any = {
      id: uuid(),
      ten: "",
      loai: "Lệ phí",
      soTien: 0,
    };
    setDataSource([...dataSource, newRow]);
    setSelectedRowKeys((curr) => [...curr, newRow.id]);
  };
  useEffect(() => {
    if (
      hinhThucThu === "Không thu phí" ||
      hinhThucThu === "Đối tượng miễn phí"
    ) {
      form.setFieldValue("chiTietPhiLePhi", undefined);
      setSelectedRowKeys([]);
    }
  }, [hinhThucThu]);
  const rowSelection = useMemo(
    () => ({
      onChange: async (selectedKeys: React.Key[], datas: IPhiLePhi[]) => {
        updateSoTien(datas);
        const chiTiet = dataSource.map((item) => {
          if (selectedKeys.includes(item.id)) {
            return { ...item, selected: true };
          }
          return item;
        });
        form.setFieldValue("chiTietPhiLePhi", JSON.stringify(chiTiet));
        setSelectedRowKeys(selectedKeys);
      },
      selectedRowKeys,
    }),
    [dataSource, selectedRowKeys]
  );
  useEffect(() => {
    if (hoSo?.phiLePhis && hoSo?.phiLePhis.length){
      setDataSource(hoSo?.phiLePhis);
      setSelectedRowKeys(hoSo.phiLePhis.flatMap((x) => x.id));
      form.setFieldValue("hinhThucThu", "Thu trước");
    }else{
      form.setFieldValue("hinhThucThu", "Không thu phí");
    }
    if (defaultSelected) {
      form.setFieldValue("hinhThucThu", defaultSelected);
    }
    if (defaultSelected) {
      form.setFieldValue("hinhThucThu", defaultSelected);
    }
    return () => {
      setDataSource([]);
      form.setFieldValue("chiTietPhiLePhi", undefined);
    };
  }, [hoSo?.phiLePhis,defaultSelected]);
  return (
    <AntdModal
      title="YÊU CẦU THU PHÍ, LỆ PHÍ HỒ SƠ"
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      fullsizeScrollable
    >
      <Form
        form={form}
        layout="vertical"
        name="TraKetQuaHoSoModal"
        onFieldsChange={(changedFileds, allFiled) => {
          if (
            changedFileds.length > 0 &&
            changedFileds[0].name[0] != "tongTien"
          ) {
            var phi = form.getFieldValue("phiThu")
              ? parseInt(form.getFieldValue("phiThu"))
              : 0;
            var lePhi = form.getFieldValue("lePhiThu")
              ? parseInt(form.getFieldValue("lePhiThu"))
              : 0;

            var tongSo = phi + lePhi;
            form.setFieldValue("tongTien", tongSo);
          }
        }}
      >
        <Row gutter={[8, 16]}>
          <Col span={24}>
            <h4 style={{ marginBottom: 2 }}>{hoSo?.chuHoSo}</h4>
            <span style={{ marginBottom: 2 }}>{hoSo?.trichYeuHoSo}</span>
          </Col>
          <Col span={24}>
            <RenderTitle title="Thu phí lệ phí" />
         
            <Row gutter={[8, 0]}>
              <Form.Item name="chiTietPhiLePhi" label="chi tiết" hidden>
                <Input></Input>
              </Form.Item>
              <Col md={6} span={24}>
            <Form.Item name="hinhThucThu" label="Loại">
              <AntdSelect
                options={LOAIPHILEPHI_PAYMENT_OPTIONS}
                showSearch
                filterOption={filterOptions}
              />
            </Form.Item>
            
            </Col>
            {hasCharge.includes(hinhThucThu) ? (
              <>
              <Col md={6} span={24}>
                <Form.Item name="phiThu" label="Phí thu">
                  <InputNumber
                    style={{ width: "100%" }}
                    defaultValue={0}
                    formatter={formatter}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item name="lePhiThu" label="Lệ phí thu">
                  <InputNumber
                    style={{ width: "100%" }}
                    defaultValue={0}
                    formatter={formatter}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col md={6} span={24}>
                <Form.Item
                  name="tongTien"
                  label="Tổng tiền"
                  rules={
                    hasCharge.includes(hinhThucThu)
                      ? [
                          {
                            required: true,
                            message: "Tổng tiền phải lớn hơn 1.000 (VNĐ)",
                          },
                          {
                            validator(rule, value, callback) {
                              if (value < 1000) {
                                return Promise.reject(
                                  "Tổng tiền phải lớn hơn 1.000 (VNĐ)"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]
                      : undefined
                  }
                >
                  <InputNumber
                    disabled
                    style={{ width: "100%" }}
                    defaultValue={0}
                    formatter={formatter}
                  />
                </Form.Item>
              </Col>
              </>) : null}
            </Row>
            {hasCharge.includes(hinhThucThu) ? (
            <AntdTable
              columns={columns as any}
              dataSource={dataSource}
              footer={() => (
              
                <AntdButton
                  icon={<PlusCircleOutlined />}
                  type="primary"
                  onClick={onAddRow}
                >
                  Thêm phí, lệ phí
                </AntdButton> ) 
              }
              searchParams={searchPhiLePhiParams}
              pagination={false}
              rowSelection={rowSelection}
              setSearchParams={setSearchPhiLePhiParams}
              // onRow={onRow}
              onSearch={(params) => {}}
            />):null }
            <AntdDivider />
          </Col>
          <Col span={24}>
            <RenderTitle title="Yêu cầu thanh toán" />
            <YeuCauThanhToan yeuCauThanhToans={hoSo?.yeuCauThanhToans} />
            <AntdDivider />
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};

export default YeuCauThanhToanVaXacNhanKqModal;
