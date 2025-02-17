import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { FORMAT_SOGIAYTO_LABEL, LOAICHUHOSO_OPTIONS } from "@/features/hoso/data/formData";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { GetHoSo, TiepNhanHoSoTrucTuyen } from "@/features/hoso/redux/action";
import { AntdButton, AntdDivider, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useMemo } from "react";
import { SoHoaThanhPhan } from "./SoHoaThanhPhan";
import { NguoiXuLyTiepTheo } from "../../NguoiXuLyTiepTheo";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";
import { TiepNhanHoSoTrucTuyenParams } from "@/features/hoso/services";
import { GetUserFromCSDLDanCu } from "@/features/user/redux/Actions";
import { normalizeVN2ENString } from "@/utils/common";
import { toast } from "react-toastify";
import { useTiepNhanHoSoTrucTuyenContext } from "@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext";
import { GiayToSoHoaHoSoTrucTuyenModal } from "./GiayToSoHoaHoSoTrucTuyenModal";
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action";
import { resetDatas } from "@/features/thanhphanhoso/redux/slice";
import { resetData } from "@/features/hoso/redux/slice";
import { IResult } from "@/models";
import { FormInstance } from "antd/lib";

type TiepNhanHoSoTrucTuyenModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    handleCloseModal?: () => void;
    tiepNhanHoSoChungThucElement?: (form: FormInstance<any>) => React.ReactNode;
    modalTitle?: React.ReactNode;
    submitHandler?: (formData: any) => Promise<IResult<any> | undefined>;
}

const TiepNhanHoSoTrucTuyenModal = ({setSearchHoSoParams, handleCloseModal, modalTitle, submitHandler,tiepNhanHoSoChungThucElement} : TiepNhanHoSoTrucTuyenModalProps) => {
    const [form] = Form.useForm()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const {datas: thanhPhanHoSos} = useAppSelector(state => state.thanhphanhoso)
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    // const daDinhDanh: boolean = Form.useWatch("daDinhDanh", form)
    const soDinhDanh: boolean = Form.useWatch("soDinhDanh", form)
    const tiepNhanHoSoTrucTuyenContext = useTiepNhanHoSoTrucTuyenContext()
    const loaiDoiTuong: string = Form.useWatch("loaiDoiTuong", form)
    const isLoaiDoiTuongCongDan = loaiDoiTuong === "Công dân"
    
    const handleCancel = () => {
        buttonActionContext.setTiepNhanHoSoTrucTuyenModalVisible(false)
        form.resetFields()
        dispatch(resetDatas())
        dispatch(resetData())
        if(handleCloseModal){
            handleCloseModal()
        }
        buttonActionContext.setSelectedHoSos([])
    }
    
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true}))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() =>{
        if(hoSo !== undefined && thanhPhanHoSos === undefined){
            dispatch(SearchThanhPhanHoSo({hoSo: hoSo.maHoSo}))
        }
    }, [hoSo])

    const truongHopThutuc = useMemo(() => {
        if(hoSo){
            return {
                edgeQuyTrinh: hoSo.edgeQuyTrinh,
                nodeQuyTrinh: hoSo.nodeQuyTrinh,
            } as ITruongHopThuTuc
        }
    }, [hoSo])
    
    useEffect(() => {
        if(hoSo != undefined){
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])

    const onOk = async () => {
        const formData = await form.validateFields() as TiepNhanHoSoTrucTuyenParams["data"]
        // if(!daDinhDanh){
        //     toast.info("Vui lòng định danh chủ hồ sơ.")
        //     return;
        // }
        if(buttonActionContext.selectedHoSos.length){
            if(submitHandler){
                const res = await submitHandler({data: formData, id: buttonActionContext.selectedHoSos[0] as string})
                if(res?.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
            } else {
                const res = await dispatch(TiepNhanHoSoTrucTuyen({data: formData, id: buttonActionContext.selectedHoSos[0] as string})).unwrap()
                if(res.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
            }
            
        }
    }
    const onDinhDanh = async () => {
        const data: Pick<IHoSo, "soGiayToChuHoSo" | "ngaySinhChuHoSo" | "chuHoSo"> = form.getFieldsValue(["soGiayToChuHoSo", "ngaySinhChuHoSo", "chuHoSo"])
        if (Object.values(data).every(x => x)) {
            const res = await dispatch(GetUserFromCSDLDanCu({ HoVaTen: normalizeVN2ENString(data.chuHoSo as string), SoDinhDanh: data.soGiayToChuHoSo, Nam: data.ngaySinhChuHoSo, NgayThangNam:"", SoCMND: "", MaHoSo: hoSo?.maHoSo })).unwrap()
            if(res.succeeded){
                toast.success("Định danh thành công")
                // form.setFieldValue("daDinhDanh", true)
                form.setFieldValue("soDinhDanh", data.soGiayToChuHoSo)
            }
        } else {
            toast.info("Vui lòng nhập đầy đủ số giấy tờ, năm sinh, họ và tên")
        }

    }

    return  <AntdModal title={modalTitle ?? "TIẾP NHẬN HỒ SƠ TRỰC TUYẾN"} visible={true} handlerCancel={handleCancel} fullsizeScrollable
    onOk={onOk} okText="Tiếp nhận">
    <Form form={form} layout="vertical" name="tiepNhanHoSoTrucTuyen">
        <Form.Item name="thoiHanBuocXuLy" hidden><Input/></Form.Item>
        <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input/></Form.Item>
        <Form.Item name="nodeQuyTrinh" hidden><Input/></Form.Item>
        <Form.Item name="buocXuLyTiep" hidden><Input/></Form.Item>
        <Form.Item name="tenBuocHienTai" hidden><Input/></Form.Item>
        <Form.Item name="buocHienTai" hidden><Input/></Form.Item>
        <Form.Item name="nguoiXuLyTiep" hidden><Input/></Form.Item>
        <Form.Item name="maTTHC" hidden><Input/></Form.Item>
        <Form.Item name="soDinhDanh" hidden><Input/></Form.Item>
        {/* <Form.Item name="daDinhDanh" hidden valuePropName="checked"><Checkbox/></Form.Item> */}
        <Row gutter={[16,8]}>
            <Col span={8}>
                <Typography.Title level={5}>{hoSo?.trichYeuHoSo}</Typography.Title>
                <Typography.Text>{hoSo?.thoiGianThucHien} giờ (tính theo {hoSo?.loaiThoiGianThucHien})</Typography.Text>
            </Col>
            <Col span={16}>
                <Row gutter={[8,0]}>
                    <Col span={12}>
                        <Form.Item name="loaiDoiTuong" label="Loại chủ hồ sơ">
                            <AntdSelect options={LOAICHUHOSO_OPTIONS} showSearch disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="soGiayToChuHoSo" label={(FORMAT_SOGIAYTO_LABEL as any)[loaiDoiTuong]}  >
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={isLoaiDoiTuongCongDan ? 12 : 24}>
                        <Form.Item name="chuHoSo" label="Họ và tên"  >
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    {isLoaiDoiTuongCongDan ?  <Col span={12}>
                        <Form.Item name="ngaySinhChuHoSo" label="Năm sinh chủ hồ sơ"  >
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>: null}
                    {soDinhDanh && hoSo ? null : <Col span={24}>
                        <AntdButton type="primary" onClick={onDinhDanh}>Định danh chủ hồ sơ</AntdButton>
                    </Col>}
                    
                </Row>
            </Col>
            {tiepNhanHoSoChungThucElement ? tiepNhanHoSoChungThucElement(form) : null}
            <Col span={24}>
                <RenderTitle title={"Số hóa thành phần hồ sơ"}/>
                <SoHoaThanhPhan form={form} thanhPhanHoSos={thanhPhanHoSos}/>
            </Col>
            <Col span={24}>
                <RenderTitle title={"Người xử lý tiếp theo"}/>
                <NguoiXuLyTiepTheo form={form} truongHopThuTuc={truongHopThutuc}/>
            </Col>
        </Row>
    </Form>
    {tiepNhanHoSoTrucTuyenContext.giayToSoHoaVisible ?<GiayToSoHoaHoSoTrucTuyenModal /> : null}
</AntdModal>
}

export default TiepNhanHoSoTrucTuyenModal;