import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, YeuCauMotCuaBoSungHoSo } from "@/features/hoso/redux/action"
import { AntdButton, AntdModal, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, InputNumber, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { YeuCauDinhKemBoSungHoSo } from "../../YeuCauDinhKemBoSungHoSo"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { RenderTitle } from "@/components/common"
import { resetData } from "@/features/hoso/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { toast } from "react-toastify"
import { XuatPhieuModal } from "./modals/XuatPhieuModal"
import { fileApi } from "@/features/file/services"
import { CURRENTTIME_ISOSTRING, ID_SEPARATE } from "@/data"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { MA_PHIEU_YEU_CAU_BO_SUNG_HO_SO_TRUC_TUYEN, TEN_PHIEU_YEU_CAU_BO_SUNG_HO_SO_TRUC_TUYEN } from "@/pages/dvc/MauPhieu/documents/pdf"
import { isNumber, numberFormat } from "highcharts"
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

export interface IDinhKemBoSungHoSo {
    lyDoBoSung: string;
    noiDungBoSung?: string;
    dinhKemBoSung?: string;
    thanhPhanBoSung: ThanhPhanBoSungHoSo[];
    thanhPhanHoSo?: ThanhPhanBoSungHoSo[];
    thoiHanBoSung?: number;
    maGiayToHoSo?: string
}
export interface ThanhPhanBoSungHoSo {
    thanhPhanHoSoId: string;
    tenThanhPhan: string;
    fileDinhKem: string;
    noiDungBoSung?: string;
    laThanhPhanMoi?: boolean;
}

const YeuCauMotCuaBoSungModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm()
    const { loading, data: hoSo } = useAppSelector(state => state.hoso)
    const { datas: thanhPhanHoSos } = useAppSelector(state => state.thanhphanhoso)
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKemBoSung", form)
    const buttonActionContext = useButtonActionContext()
    const [onChangeLyDo, setOnChangeLyDo] = useState<boolean>(true)
    const [newFile, setNewFile] = useState<string>()
    const [loadingPhieu, setLoadingPhieu] = useState<boolean>(false)
    const [xuatPhieuModal, setXuatPhieuModal] = useState<boolean>(false)
    const [lyDoBoSung, setLyDoBoSung] = useState<string>()
    const [maGiayToHoSo, setMaGiayToHoSo] = useState<string>();
    const [urlPhieu, setUrlPhieu] = useState<string>();
    const { data: user } = useAppSelector(state => state.user)


    const { publicModule: config } = useAppSelector(state => state.config)
    const [requireKySo, setRequireKySo] = useState<boolean>(false)
    const [requireDinhKem, setRequireDinhKem] = useState<boolean>(false)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ky-so-tu-choi-tiep-nhan-truc-tuyen' && item.content == '1')
                setRequireKySo(true)
            if (item.code == 'dinh-kem-yeu-cau-bo-sung-ho-so-nop-truc-tuyen' && item.content == '1')
                setRequireDinhKem(true)
        })
    }, [config])

    useEffect(() => {
        form.setFieldValue("dinhKemBoSung", newFile)
    }, [newFile])



    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }))
        }
    }, [buttonActionContext.selectedHoSos.length])

    useEffect(() => {
        if (hoSo != undefined) {
            dispatch(SearchThanhPhanHoSo({ hoSo: hoSo.maHoSo, reFetch: true }))
            setMaGiayToHoSo(`${hoSo.maHoSo}_${MA_PHIEU_YEU_CAU_BO_SUNG_HO_SO_TRUC_TUYEN}`)
        }
    }, [hoSo])

    const handleCancel = () => {
        dispatch(resetData())
        buttonActionContext.setYeuCauMotCuaBoSungModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        setLoadingPhieu(true)
        const formData = await form.validateFields() as IDinhKemBoSungHoSo
        let checkField: boolean = true
        if (!form.getFieldValue('lyDoBoSung')) {
            toast.error("Vui lòng nhập lý do!")
            checkField = false
        } else
            if (requireDinhKem) {
                if (requireKySo) {
                    if (dinhKem) {
                        try {
                            const { data: { data: { hasDigitalSinature } } } = await fileApi.VerifyDigitalSignature(dinhKem.split(ID_SEPARATE))

                            if (hasDigitalSinature) {
                                checkField = true
                            } else {
                                checkField = false
                                toast.error("Phiếu yêu cầu chưa ký số!")
                            }
                        } catch {
                            toast.warn('Có lỗi khi kiểm tra ký số!')
                        }
                    }
                    else {
                        checkField = false
                        toast.error("Vui lòng đính kèm tệp!")
                    }
                } else {
                    checkField = true
                }
            } else {
                checkField = true
            }



        if (form.getFieldValue('thoiHanBoSung')) {
            if (!isNumber(form.getFieldValue('thoiHanBoSung'))) {
                checkField = false
                toast.error('Thời hạn xử lý phải là một số!')
            }
        }
        if (buttonActionContext.selectedHoSos.length && checkField) {
            const resSaveGiayToHoSo = await giayToHoSoApi.Create({
                maHoSo: hoSo?.maHoSo,
                loaiGiayTo: TEN_PHIEU_YEU_CAU_BO_SUNG_HO_SO_TRUC_TUYEN,
                nguoiXuatPhieu: user?.fullName || user?.userName,
                ngayXuatPhieu: CURRENTTIME_ISOSTRING,
                suDung: true,
                maGiayTo: maGiayToHoSo,
                pdfPhieu: dinhKem,
                ngayGuiCongDan: CURRENTTIME_ISOSTRING,
                trangThaiGuiCongDan: 'Đã gửi',
                nguoiGuiCongDan: user?.fullName || user?.userName,
            })
            const thanhPhanBoSung = formData.thanhPhanBoSung.filter(x => !x.laThanhPhanMoi);
            const thanhPhanHoSo = formData.thanhPhanBoSung.filter(x => x.laThanhPhanMoi)
            const res = await dispatch(YeuCauMotCuaBoSungHoSo({ 
                id: buttonActionContext.selectedHoSos[0] as string, 
                data: { 
                    ...formData, 
                    maGiayToHoSo: maGiayToHoSo,
                    thanhPhanBoSung,
                    thanhPhanHoSo
                } 
            })).unwrap()
            if (res.succeeded) {
                setSearchHoSoParams((curr) => ({ ...curr }))
                form.setFieldValue("dinhKemBoSung", undefined)
                toast.success("Yêu cầu bổ sung thành công!")
                setLoadingPhieu(false)
                handleCancel()
            } else {
                setLoadingPhieu(false)
                toast.error('Có lỗi trong quá trình thực hiện!')
            }
        } else
            setLoadingPhieu(false)
    }

    const xuatPhieu = async () => {
        if (!form.getFieldValue('lyDoBoSung')) {
            toast.error("Vui lòng nhập lý do!")
        }
        else {
            setXuatPhieuModal(true)
            if (lyDoBoSung != form.getFieldValue('lyDoBoSung')) {
                setLoadingPhieu(true)
                setOnChangeLyDo(true)
                setLyDoBoSung(form.getFieldValue('lyDoBoSung'))
            }
            else {
                setOnChangeLyDo(false)
            }
        }
    }

    const handleFileChange = (fileList: any) => {

        if (fileList && fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setNewFile(file)
        }
    };

    const handleLyDoTuChoiChange = (event: any) => {
        setOnChangeLyDo(true)
    };

    return <>
        <AntdModal confirmLoading={loadingPhieu} title={"CÁN BỘ MỘT CỬA YÊU CẦU BỔ SUNG HỒ SƠ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} visible={true} handlerCancel={handleCancel} fullsizeScrollable
            footer={
                <AntdSpace direction="horizontal">
                    {onChangeLyDo ? <AntdButton key={3} loading={loadingPhieu} onClick={xuatPhieu}>Xuất phiếu</AntdButton> : null}
                    <AntdButton key={2} loading={loadingPhieu} onClick={onOk}>Xác nhận yêu cầu</AntdButton>
                    <AntdButton key={1} onClick={handleCancel}>Đóng</AntdButton>
                </AntdSpace>
            }>
            <Spin spinning={loadingPhieu}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form form={form} layout="vertical" name="YeuCauMotCuaBoSung" initialValues={{thoiHanBoSung: 0}}>
                    <Form.Item name="thanhPhanBoSung" hidden><Input></Input></Form.Item>
                    <Form.Item name="thanhPhanHoSo" hidden><Input></Input></Form.Item>
                    <Row gutter={[16, 8]}>
                        <Col span={8}>
                            <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                            <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
                        </Col>
                        <Col span={16}>
                            <Form.Item name="lyDoBoSung" label="Lý do bổ sung" required >
                                <Input.TextArea rows={4} maxLength={500} showCount onChange={handleLyDoTuChoiChange} />
                            </Form.Item>

                            <Row>
                                <Col span={12}>
                                    <Form.Item name="dinhKemBoSung" label="Đính kèm bổ sung" required={requireDinhKem}>
                                        {/* <AntdUpLoad maxCount={10} formInstance={form} fieldName="dinhKemBoSung" folderName="YeuCauBoSung" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                                        {hoSo?.maHoSo ? <RegularUpload
                                            // kySo={KY_SO}
                                            dinhKem={dinhKem}
                                            onChange={handleFileChange}
                                            fieldName={"dinhKemBoSung"}
                                            folderName={hoSo.maHoSo}
                                            kySoToken
                                            form={form} /> : null}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="thoiHanBoSung" label="Thời hạn bổ sung (theo ngày)" >
                                        <InputNumber min={0} max={300} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <RenderTitle title={"Tệp đính kèm"} />
                            <YeuCauDinhKemBoSungHoSo form={form} thanhPhanHoSos={thanhPhanHoSos} />
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </AntdModal>
        <XuatPhieuModal visible={xuatPhieuModal} handlerClose={() => setXuatPhieuModal(false)}
            lyDoBoSung={lyDoBoSung} setNewFile={setNewFile}
            onChangeLyDo={onChangeLyDo} setOnChangeLyDo={setOnChangeLyDo}
            maGiayToHoSo={maGiayToHoSo} setMaGiayToHoSo={setMaGiayToHoSo}
            urlPhieu={urlPhieu} setUrlPhieu={setUrlPhieu}
            loadingPhieu={loadingPhieu} setLoadingPhieu={setLoadingPhieu}
            form={form}
        />
    </>
}

export default YeuCauMotCuaBoSungModal