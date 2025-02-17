import { AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace, AntdTab, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Input, Row, Form, DatePicker, TabsProps, Spin } from "antd"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { Suspense, lazy, useEffect, useMemo } from "react"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { FORMAT_DATE } from "@/data"
import { ThongTinChungTab } from "./ThongTinChungTab"
import dayjs from 'dayjs'
import { GetHoSo } from "@/features/hoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { QuaTrinhXuLy } from "./QuaTrinhXuLy"
import { LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { BoSungHoSo } from "./BoSungHoSo"
import { hoSoApi } from "@/features/hoso/services"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { PhiLePhi } from "./PhiLePhi"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import QuaTrinhTraoDoiCongDanWrapper from "@/features/quatrinhtraodoicongdan/components/QuaTrinhTraoDoiCongDanTable"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"

const QuyTrinhXuLyLazy = lazy(() => import("./QuyTrinhXuLy"))


const ChiTietHoSoModal = ({setSearchHoSoParams}: {setSearchHoSoParams?: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const dispatch = useAppDispatch()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    // const {actionInModals} = useAppSelector(state => state.screenaction)
    const buttonActionContext = useButtonActionContext()
    const {buttons} = useButtonActions({
        filterActionBy: (action) => action.showInModal == true
    });
    const [form] = Form.useForm<IHoSo>()
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true}))
        }
    },[buttonActionContext.selectedHoSos])
    useEffect(() => {
        if(hoSo){
            form.setFieldsValue({...hoSo, 
                ngayTiepNhan: hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan) as any : undefined,
                ngayHenTra: hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra) as any : undefined,
            })
            dispatch(SearchThanhPhanHoSo({hoSo: hoSo.maHoSo}))
            // if(hoSo.eFormData){
            //     window.objDataCSDLDanCu = JSON.parse(hoSo.eFormData)
            // }
        }
    }, [hoSo])

    const CHITIETHOSO_TABS : TabsProps["items"] = [{
        key: "thong-tin-chung",
        label: <div style={{fontWeight:500}}>Thông tin chung</div>,
        children: <ThongTinChungTab form={form}/>
    },{
        key: "qua-trinh-xu-ly",
        label: <div style={{fontWeight:500}}>Quá trình xử lý</div>,
        children: <QuaTrinhXuLy/>
    },
    // {
    //     key: "qua-trinh-trao-doi-voi-cong-dan",
    //     label: <div> Quá trình trao đổi với công dân</div>,
    //     children: <QuaTrinhTraoDoiCongDanWrapper/>,
    // },
    {
        key: "thanh-toan-phi-le-phi",
        label: <div style={{fontWeight:500}}>Thanh toán phí, lệ phí</div>,
        children: <PhiLePhi/>
    },{
        key: "bo-sung-ho-so",
        label: <div style={{fontWeight:500}}>Bổ sung hồ sơ</div>,
        children: <BoSungHoSo/>
    },{
        key: "quy-trinh-xu-ly",
        label: <div style={{fontWeight:500}}>Quy trình xử lý</div>,
        children: <QuyTrinhXuLyLazy/>
    }]
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        dispatch(resetDatas())
        buttonActionContext.setChiTietHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    };

    // const onOk = async () => {
    //     if(buttonActionContext.selectedHoSos.length){
    //         const res = await hoSoApi.ChuyenBuocNhanhHoSo({id: buttonActionContext.selectedHoSos[0] as string})
    //         if(res.data.succeeded){
    //             setSearchHoSoParams ? setSearchHoSoParams((curr) => ({...curr})) : null
    //             handleCancel()
    //         }
    //     }
    // }
    return (
        <AntdModal title={"Chi tiết hồ sơ " + hoSo?.maHoSo} visible={true} handlerCancel={handleCancel} fullsizeScrollable 
        footer={<AntdSpace direction="horizontal">
            {buttons}
            <AntdButton onClick={handleCancel}>Đóng</AntdButton>
            {/* {actionInModals?.map((action, index) =>
                <AntdButton type="primary" key={index}>{action.ten}</AntdButton>
            )} */}
        </AntdSpace>}>
        <Form name='ChiTietHoSoModal' layout="vertical" form={form} disabled 
         initialValues={{ thuTu: 1 }}>
            <Form.Item name="hinhThucTra" hidden><Input/></Form.Item>
            <Row gutter={8}>
                <>
                    <Col span={24}>
                        <RenderTitle title="Thông tin chi tiết" />
                    </Col>
                    <Col span={8}>
                        <Form.Item name="kenhThucHien" label="Kênh thực hiện" >
                            <AntdSelect options={LOAITIEPNHAN_OPTIONS}  />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="ngayTiepNhan" label="Ngày tiếp nhận" >
                            <DatePicker format={FORMAT_DATE}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="ngayHenTra" label="Ngày hẹn trả" >
                            <DatePicker format={FORMAT_DATE}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ" >
                            <Input.TextArea rows={2} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <RenderTitle title={"Kết quả xử lý"} />
                    </Col>
                    <Col span={12}>
                        <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                    </Col>
                        <Col span={12}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {/* <AntdUpLoad editing = {buttonActionContext.chiTietHoSoModalVisible !== undefined} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                                {/* <AntdUpLoad editing={true} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                                {hoSo?.maHoSo ? <RegularUpload 
                                    // kySo={KY_SO}
                                    hideUpload={true}
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemKetQua"} 
                                    folderName={hoSo.maHoSo} 
                                    form={form}/>: null}
                                
                            </Form.Item>
                        </Col>
                    <AntdDivider />
                </>
                <>
                    <Col span={24}>
                        <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                            <AntdTab items={CHITIETHOSO_TABS} centered/>
                        </Suspense>
                    </Col>
                </>
            </Row>
        </Form>
        </AntdModal>
    )
}

export default ChiTietHoSoModal