import { AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { useEffect, useMemo, useRef, useState } from "react"
import { resetData } from "@/features/hoso/redux/slice"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import { TiepNhanGuiVBDLISAction } from "@/features/lienthongvbdlis/redux/action"
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { GetByGroupCodeAction } from "@/features/cocautochuc/redux/crud"
import { ITiepNhanGuiVBDLISParams } from "@/features/lienthongvbdlis/services"

const TiepNhanGuiVBDLISModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
  const [form] = Form.useForm()
  const buttonActionContext = useButtonActionContext()
  const { data: hoSo } = useAppSelector(state => state.hoso)
  const dispatch = useAppDispatch()
  const [searchDanhMucDiaBanParams, setSearchDanhMucDiaBanParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 20000,

    });
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
  const selectedTinh = Form.useWatch("tinhId", form);
  const selectedHuyen = Form.useWatch("huyenId", form);
  const [btnLoading, setBtnLoading] = useState(false)
  const { datas: danhmucdiabans, loading: loadingDiaBan } = useAppSelector(
    (state) => state.danhmucdiaban
  );
  const regularUploadRef = useRef<RegularUploadRef>(null)
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }))
    }
  }, [buttonActionContext.selectedHoSos])

  useEffect(() => {
    (async () => {
      if (hoSo != undefined) {
        form.setFieldsValue(hoSo)

        if (danhmucdiabans && danhmucdiabans.length > 0) {
          if (hoSo.tinhThanhDiaBan && hoSo.quanHuyenDiaBan) {
            form.setFieldValue("tinhId", hoSo.tinhThanhDiaBan)
            if (hoSo.quanHuyenDiaBan.startsWith(hoSo.tinhThanhDiaBan + ".")) {
              var tmpQuanHuyen = hoSo.quanHuyenDiaBan.slice(`${hoSo.tinhThanhDiaBan}.`.length)
              form.setFieldValue("huyenId", tmpQuanHuyen)
            }
            if (hoSo.xaPhuongDiaBan && hoSo.xaPhuongDiaBan.startsWith(hoSo.quanHuyenDiaBan + ".")) {
              var tmpQuanHuyen = hoSo.quanHuyenDiaBan.slice(`${hoSo.quanHuyenDiaBan}.`.length)
              form.setFieldValue("xaId", tmpQuanHuyen)
            }
          } else {
            var resGroup = await dispatch(GetByGroupCodeAction(hoSo.donViId)).unwrap()
            if (resGroup.data) {
              if (resGroup.data.maTinh) form.setFieldValue("tinhId", resGroup.data.maTinh)
              if (resGroup.data.maHuyen) form.setFieldValue("huyenId", resGroup.data.maHuyen)
              if (resGroup.data.maXa) form.setFieldValue("xaId", resGroup.data.maXa)
            }
          }
        }


      }
    })()

  }, [hoSo, danhmucdiabans])
  useEffect(() => {
    (async () => {
      if (maTinh) {
        await dispatch(SearchDanhMucDiaBan({
          ...searchDanhMucDiaBanParams,
          maTinh: maTinh
        }));

      }
    })();
  }, [searchDanhMucDiaBanParams, maTinh]);
  const handleCancel = async () => {
    form.resetFields();
    dispatch(resetData())
    dispatch(resetDatas())
    buttonActionContext.setTiepNhanGuiVBDLISModalVisible(false)
    // buttonActionContext.setSelectedHoSos([])

  }

  const onOk = async () => {
    const formData = await form.validateFields() as ITiepNhanGuiVBDLISParams
    if (buttonActionContext.selectedHoSos.length) {
      try {
        setBtnLoading(true)
        const res = await dispatch(TiepNhanGuiVBDLISAction({ ...formData, id: buttonActionContext.selectedHoSos[0] as string })).unwrap()
        if (res.succeeded) {

          setSearchHoSoParams((curr) => ({ ...curr }))
          handleCancel()
        }
        setBtnLoading(false)
      } catch (error) {
        setBtnLoading(false)
        console.log(error);

      }
    }
  }
  const handlerTrichXuatOCR = (eFormData: string, eForm: string) => {
    form.setFieldValue("eFormKetQuaData", eFormData)
    form.setFieldValue("eFormKetQua", eForm)
  }
  // const onExtractDataModify = () => {
  //     regularUploadRef.current?.setTrichXuatDuLieuOCRModalVisible
  //      regularUploadRef.current?.setModeTrichXuat("modify")
  // }
  const tinhs = useMemo(() => {
    return danhmucdiabans?.filter((x) => x.maTinh && !x.maHuyen && !x.maXa);
  }, [danhmucdiabans]);
  const huyens = useMemo(() => {
    if (selectedTinh && danhmucdiabans && danhmucdiabans.length > 0)
      return (
        danhmucdiabans?.filter(
          (x) => x.maTinh == selectedTinh && x.maHuyen && !x.maXa
        ) ?? []
      );
    return [];
  }, [selectedTinh, danhmucdiabans]);
  const xas = useMemo(() => {
    if (selectedHuyen && danhmucdiabans && danhmucdiabans.length > 0)
      return (
        danhmucdiabans?.filter((x) => x.maHuyen == selectedHuyen && x.maXa) ??
        []
      );
    return [];
  }, [selectedHuyen, danhmucdiabans]);
  return <AntdModal title={"Chuyển liên thông VBDLIS:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} visible={true} handlerCancel={handleCancel} width={1280}
    footer={<AntdSpace>
      <AntdButton onClick={handleCancel} key={"1"}>Đóng</AntdButton>
      {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
      <AntdButton loading={btnLoading} onClick={onOk} key={"3"} type="primary">Cập nhật</AntdButton>
    </AntdSpace>}>
    <Form form={form} layout="vertical" name="TiepNhanGuiVBDLISModal">
      <Row gutter={8}>
        <Col span={24}>
          <RenderTitle title="Thông tin địa bàn" />
          <Row gutter={[4, 8]}>
            <Col md={8} span={24}>
              <Form.Item
                label="Mã tỉnh"
                name="tinhId"
                rules={[{ required: true, message: "Không được để trống" }]}

              >
                <AntdSelect
                  loading={loadingDiaBan}
                  generateOptions={{
                    model: tinhs,
                    value: "maTinh",
                    label: "tenDiaBan",
                  }}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item

                label="Mã huyện"
                name="huyenId"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <AntdSelect
                  loading={loadingDiaBan}
                  generateOptions={{
                    model: huyens,
                    value: "maHuyen",
                    label: "tenDiaBan",
                  }}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item

                label="Mã xã"
                name="xaId"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <AntdSelect
                  loading={loadingDiaBan}
                  generateOptions={{
                    model: xas,
                    value: "maXa",
                    label: "tenDiaBan",
                  }}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <AntdDivider />
        </Col>
      </Row>
    </Form>
  </AntdModal>
}

export default TiepNhanGuiVBDLISModal