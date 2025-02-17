import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { FORMAT_SOGIAYTO_LABEL, LOAICHUHOSO_OPTIONS } from "@/features/hoso/data/formData";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { GetHoSo, TiepNhanHoSoTrucTuyen, TiepNhanNhieuHoSoTrucTuyen } from "@/features/hoso/redux/action";
import { AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace, AntdUpLoad } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
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
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";
import { leading0 } from "@/utils";
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_SECOND, SHOW_DEMO } from "@/data";
import { ThayDoiTruongHopXuLy } from "../thayDoiTruongHopXuLy/ThayDoiTruongHopXuLy";
import React from "react";
import { DiaBanPhatSinhHoSo } from "../../DiaBanPhatSinhHoSo";

type TiepNhanHoSoTrucTuyenModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    handleCloseModal?: () => void;
    tiepNhanHoSoChungThucElement?: (form: FormInstance<any>) => React.ReactNode;
    submitHandler?: (formData: any) => Promise<IResult<any> | undefined>;
    remove?: boolean;
}

const TiepNhanHoSoTrucTuyenModal = ({remove, setSearchHoSoParams, handleCloseModal, submitHandler,tiepNhanHoSoChungThucElement} : TiepNhanHoSoTrucTuyenModalProps) => {
    const [form] = Form.useForm()
    const {data: hoSo, datas: hoSos} = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    // const daDinhDanh: boolean = Form.useWatch("daDinhDanh", form)
    const soDinhDanh: boolean = Form.useWatch("soDinhDanh", form)
    const tiepNhanHoSoTrucTuyenContext = useTiepNhanHoSoTrucTuyenContext()
    const loaiDoiTuong: string = Form.useWatch("loaiDoiTuong", form)
    const isLoaiDoiTuongCongDan = loaiDoiTuong === "Công dân"
    const isMultipleHoSo = buttonActionContext.selectedHoSoKeyByTHTTs.length > 1
    const modalTitle = isMultipleHoSo? "TIẾP NHẬN TRỰC TUYẾN NHIỀU HỒ SƠ " : "TIẾP NHẬN HỒ SƠ TRỰC TUYẾN:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`
    const [btnLoading, setBtnLoading] = useState(false)

    const onCloseModal = () => {
        form.resetFields()
        dispatch(resetDatas())
        dispatch(resetData())
        buttonActionContext.setTiepNhanHoSoTrucTuyenModalVisible(false)
        if(handleCloseModal){
            handleCloseModal()
        }
    }

    const handleCancel = (data: Record<string, string>) : boolean => {
        
        const errorIds = Object.keys(data) || []
        const succeedIds = buttonActionContext.selectedHoSoKeyByTHTTs.filter(x => !errorIds.includes(x))

        
        if(errorIds.length){
            const dataKey : Record<string, string> = {}
            hoSos?.forEach(item => {
                if(errorIds.includes(item.id)){
                    dataKey[item.id] = item.maHoSo
                }
            })
            const toastData = errorIds.map(key => {
                return <p>Hồ sơ <strong>{dataKey[key]}</strong>: {data[key]}</p>
            })
            toast.warn(<>{toastData.map((item, idx) => {
                return <React.Fragment key={idx}>{item}</React.Fragment>
            })}</>, {autoClose: 10000})
        } 
        if(succeedIds.length) {
            buttonActionContext.setSelectedHoSoKeyByTHTTs(errorIds)
            buttonActionContext.setSelectedHoSos((curr) => {
                return curr.filter(x => !succeedIds.includes(x as string))
            })
            toast.success(`tiếp nhận thành công ${succeedIds.length} hồ sơ`)
            setSearchHoSoParams((curr) => ({...curr}))
            onCloseModal()
            return true
        } 
        return false

        
        // buttonActionContext.setSelectedHoSos([])
    }
    useEffect(() => {
        if(buttonActionContext.selectedHoSoKeyByTHTTs.length){
            getHoSo()
        }
    }, [buttonActionContext.selectedHoSoKeyByTHTTs])

    const getHoSo = () => {
        if (buttonActionContext.selectedHoSoKeyByTHTTs.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSoKeyByTHTTs[0] as string, view: "tiepNhanTrucTuyen", returnNodeQuyTrinh: true }))
        }
    }

    useEffect(() => {
        if(hoSo != undefined){
            form.setFieldsValue(hoSo)
        }
    }, [hoSo])

    const onOk = async () => {
        const formData = await form.validateFields() as TiepNhanHoSoTrucTuyenParams["data"]
        if(buttonActionContext.selectedHoSoKeyByTHTTs.length){
            try {
                setBtnLoading(true)
                if(submitHandler){ // tiếp nhận chứng thực
                    if(!isMultipleHoSo && formData?.thanhPhanHoSos?.findIndex(x => !x.maGiayTo) != -1){
                        toast.warn("Vui lòng chọn Loại/Tên giấy tờ")
                        setBtnLoading(false)
                        return;
                    }
                    const res = await submitHandler({...formData, Ids: buttonActionContext.selectedHoSoKeyByTHTTs})
                    if(res?.succeeded){
                        handleCancel(res.data)
                    }
                } else {
                    const res = await dispatch(TiepNhanNhieuHoSoTrucTuyen({...formData, Ids: buttonActionContext.selectedHoSoKeyByTHTTs, thanhPhanHoSos: formData.thanhPhanHoSos})).unwrap()
                    if(res.succeeded){
                        handleCancel(res.data)
                    }
                }
                setBtnLoading(false)
            } catch (error) {
                console.log(error);
                setBtnLoading(false)
            }
        }
    }
    const onDinhDanh = async () => {
        const data: Pick<IHoSo, "soGiayToChuHoSo" | "ngaySinhChuHoSo" | "chuHoSo"> = form.getFieldsValue(["soGiayToChuHoSo", "ngaySinhChuHoSo", "chuHoSo"])
        if (Object.values(data).every(x => x)) {
            try {
                setBtnLoading(true)
                const res = await dispatch(GetUserFromCSDLDanCu({ HoVaTen: normalizeVN2ENString(data.chuHoSo as string), SoDinhDanh: data.soGiayToChuHoSo, Nam: data.ngaySinhChuHoSo, NgayThangNam:"", SoCMND: "", MaHoSo: hoSo?.maHoSo })).unwrap()
                if(res.succeeded){
                    toast.success("Định danh thành công")
                    // form.setFieldValue("daDinhDanh", true)
                    form.setFieldValue("soDinhDanh", data.soGiayToChuHoSo)
                }
                setBtnLoading(false)
            } catch (error) {
                console.log(error);
                setBtnLoading(false)
            }
        } else {
            toast.info("Vui lòng nhập đầy đủ số giấy tờ, năm sinh, họ và tên")
        }
    }

    const onOkAndSend = async () => {
        const formData = await form.validateFields() as TiepNhanHoSoTrucTuyenParams["data"]
        try {
            setBtnLoading(true)
            const res = await dispatch(TiepNhanNhieuHoSoTrucTuyen({...formData, Ids: buttonActionContext.selectedHoSoKeyByTHTTs, thanhPhanHoSos: formData.thanhPhanHoSos, chuyenSoHoa: true})).unwrap()
            if(res.succeeded){
                handleCancel(res.data)
            }
        } catch (error) {
            
        }
        finally{
            setBtnLoading(false)
        }
    }

    return  <AntdModal title={modalTitle} confirmLoading={btnLoading} visible={true} handlerCancel={onCloseModal} fullsizeScrollable
    footer={<AntdSpace direction="horizontal">
        <AntdButton key={1} onClick={onCloseModal}>Đóng</AntdButton>
        <AntdButton key={2} onClick={onOk} type={SHOW_DEMO ? "default" : "primary"}>Tiếp nhận</AntdButton>
        {SHOW_DEMO && !isMultipleHoSo && !remove ? <AntdButton type={SHOW_DEMO ? "primary" : "default"} key={3} onClick={onOkAndSend}>Tiếp nhận và chuyển số hóa</AntdButton> : null}
    </AntdSpace>}>
    <Form form={form} layout="vertical" name="tiepNhanHoSoTrucTuyen" >
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
                <>
                    <Typography.Paragraph style={{margin:0}}>Ngày tiếp nhận: {dayjs().format(FORMAT_DATE_WITHOUT_SECOND)}</Typography.Paragraph> 
                    {hoSo?.khongCoNgayHenTra ? null: <>
                        {hoSo?.ngayHenTra ? <Typography.Paragraph>Ngày hẹn trả: {dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND)}</Typography.Paragraph> : null}
                    </>}
                    <Typography.Text>Thời hạn xử lý: {hoSo?.khongCoNgayHenTra ? <strong>Thủ tục không quy định ngày hẹn trả</strong> : `${leading0(hoSo?.thoiGianThucHien ? hoSo?.thoiGianThucHien / 8 : 0)} ${hoSo?.loaiThoiGianThucHien}`} </Typography.Text>
                </>
            </Col>
            <Col span={16}>
                <Row gutter={[8,0]}>
                    <Col span={12}>
                        <Form.Item name="loaiDoiTuong" label="Đối tượng chủ hồ sơ">
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
                    {(soDinhDanh && hoSo) || isMultipleHoSo ? null : <Col span={24}>
                        <AntdButton type="primary" loading={btnLoading} onClick={onDinhDanh}>Định danh chủ hồ sơ</AntdButton>
                    </Col>}
                    
                </Row>
            </Col>
            {isMultipleHoSo ? null :  <Col span={24}>
                <RenderTitle title={"Danh sách trường hợp xử lý hồ sơ"}/>
                <ThayDoiTruongHopXuLy setSearchHoSoParams={setSearchHoSoParams} onChangeSuccess={getHoSo}/>
            </Col>}
            {isMultipleHoSo ? null :  
                <DiaBanPhatSinhHoSo form={form} tinhThanhDiaBan={hoSo?.tinhThanhDiaBan} quanHuyenDiaBan={hoSo?.quanHuyenDiaBan} xaPhuongDiaBan={hoSo?.xaPhuongDiaBan} mergeStr={true} />
            }
            {tiepNhanHoSoChungThucElement && !isMultipleHoSo ? tiepNhanHoSoChungThucElement(form) : null}
            {remove || isMultipleHoSo ? null : <Col span={24}>
                <RenderTitle title={"Số hóa thành phần hồ sơ"}/>
                <SoHoaThanhPhan form={form}/>
            </Col>}
            <Col span={24}>
                <RenderTitle title={"Người xử lý tiếp theo"}/>
                <NguoiXuLyTiepTheo form={form} truongHopThuTuc={{
                    edgeQuyTrinh: hoSo?.edgeQuyTrinh,
                    nodeQuyTrinh : hoSo?.nodeQuyTrinh
                } as any}/>
            </Col>
        </Row>
    </Form>
    {tiepNhanHoSoTrucTuyenContext.giayToSoHoaVisible ?<GiayToSoHoaHoSoTrucTuyenModal /> : null}
</AntdModal>
}

export default TiepNhanHoSoTrucTuyenModal;