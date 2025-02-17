import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { GetHoSo, TuChoiTiepNhanHoSoTrucTuyen } from "@/features/hoso/redux/action";
import { TuChoiTiepNhanHoSoTrucTuyenParams } from "@/features/hoso/services";
import { AntdButton, AntdModal, AntdSpace, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { XuatPhieuModal } from "./modals/XuatPhieuModal";
import { toast } from "react-toastify";
import { giayToHoSoApi } from "@/features/giaytohoso/service";
import { CURRENTTIME_ISOSTRING, ID_SEPARATE } from "@/data";
import { fileApi } from "@/features/file/services";
import { TEN_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN } from "@/pages/dvc/MauPhieu/documents/pdf";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

const TuChoiTiepNhanHoSoTrucTuyenModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm<TuChoiTiepNhanHoSoTrucTuyenParams["data"]>()
    const { data: hoSo, loading } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [xuatPhieuModal, setXuatPhieuModal] = useState<boolean>(false)
    const [lyDoTuChoi, setLyDoTuChoi] = useState<string>()
    const [onChangeLyDo, setOnChangeLyDo] = useState<boolean>(true)
    const [loadingPhieu, setLoadingPhieu] = useState<boolean>(false)
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const [newFile, setNewFile] = useState<string>()
    const [maGiayToHoSo, setMaGiayToHoSo] = useState<string>();
    const [urlPhieu, setUrlPhieu] = useState<string>();
    const dinhKem = Form.useWatch("dinhKemTuChoi", form)
    const { publicModule: config } = useAppSelector(state => state.config)
    const [requireKySo, setRequireKySo] = useState<boolean>(false)
    const [requireDinhKem, setRequireDinhKem] = useState<boolean>(false)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ky-so-tu-choi-tiep-nhan-truc-tuyen' && item.content == '1')
                setRequireKySo(true)
            if (item.code == 'dinh-kem-tu-choi-tiep-nhan-ho-so-nop-truc-tuyen' && item.content == '1')
                setRequireDinhKem(true)
        })
    }, [config])


    useEffect(() => {
        form.setFieldValue("dinhKemTuChoi", newFile)
    }, [newFile])

    const handleCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setTuChoiTiepNhanHoSoTrucTuyenModalVisible(false)
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }))
        }
    }, [buttonActionContext.selectedHoSos.length])

    const onOk = async () => {
        setLoadingPhieu(true)

        const formData = await form.validateFields() as TuChoiTiepNhanHoSoTrucTuyenParams["data"]
        let checkField: boolean = false
        if (!form.getFieldValue('lyDoTuChoi')) {
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
                            }
                            else {
                                toast.error("Phiếu từ chối chưa ký số!")
                            }
                        } catch {
                            toast.warn('Có lỗi khi kiểm tra ký số!')
                        }
                    } else {
                        checkField = false
                        toast.error("Vui lòng đính kèm tệp!")
                    }
                } else {
                    checkField = true
                }


            } else {
                checkField = true
            }



        if (buttonActionContext.selectedHoSos.length && checkField) {

            const resSaveGiayToHoSo = await giayToHoSoApi.Create({
                maHoSo: hoSo?.maHoSo,
                loaiGiayTo: TEN_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN,
                nguoiXuatPhieu: user?.fullName || user?.userName,
                ngayXuatPhieu: CURRENTTIME_ISOSTRING,
                suDung: true,
                maGiayTo: maGiayToHoSo,
                pdfPhieu: dinhKem,
                ngayGuiCongDan: CURRENTTIME_ISOSTRING,
                trangThaiGuiCongDan: 'Đã gửi',
                nguoiGuiCongDan: user?.fullName || user?.userName,

            })

            const res = await dispatch(TuChoiTiepNhanHoSoTrucTuyen({ id: buttonActionContext.selectedHoSos[0] as string, data: formData })).unwrap()
            if (res.succeeded) {
                form.setFieldValue("dinhKemTuChoi", undefined) // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined 
                setSearchHoSoParams((curr) => ({ ...curr }))
                setLoadingPhieu(false)
                handleCancel()
                //Lưu phiếu mới vào tbl Giấy tờ hồ sơ

            }else{
                setLoadingPhieu(false)
                toast.error('Có lỗi trong quá trình thực hiện!')
            }
        } else
            setLoadingPhieu(false)
    }

    const xuatPhieu = async () => {
        if (!form.getFieldValue('lyDoTuChoi')) {
            toast.error("Vui lòng nhập lý do!")
        }
        else {
            setXuatPhieuModal(true)
            if (lyDoTuChoi != form.getFieldValue('lyDoTuChoi')) {
                setLoadingPhieu(true)
                setOnChangeLyDo(true)
                setLyDoTuChoi(form.getFieldValue('lyDoTuChoi'))
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
        <AntdModal title={`TỪ CHỐI TIẾP NHẬN HỒ SƠ: ${hoSo?.maHoSo}`} visible={true} handlerCancel={handleCancel} width={1000}
            footer={
                <AntdSpace direction="horizontal">
                    {onChangeLyDo ? <AntdButton key={3} loading={loadingPhieu} onClick={xuatPhieu}>Xuất phiếu</AntdButton> : null}
                    <AntdButton key={2} loading={loadingPhieu} onClick={onOk}>Xác nhận từ chối</AntdButton>
                    <AntdButton key={1} onClick={handleCancel}>Đóng</AntdButton>
                </AntdSpace>
            }>
            <Spin spinning={loadingPhieu}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form form={form} layout="vertical" name="YeuCauMotCuaBoSung" >
                    <Form.Item name="thanhPhanBoSung" hidden><Input></Input></Form.Item>
                    <Row gutter={[16, 8]}>
                        <Col span={8}>
                            <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
                            <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
                        </Col>
                        <Col span={16}>
                            <Form.Item<IHoSo> name="lyDoTuChoi" label="Lý do từ chối" required>
                                <Input.TextArea rows={4} maxLength={2000} showCount onChange={handleLyDoTuChoiChange} />
                            </Form.Item>
                            <Form.Item<IHoSo> name="dinhKemTuChoi" label="Nội dung từ chối"  required={requireDinhKem}>
                                {hoSo?.maHoSo ? <RegularUpload
                                    onChange={handleFileChange}
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemTuChoi"}
                                    folderName={hoSo.maHoSo}
                                    kySoToken
                                    maxCount={1}
                                    form={form} /> : null}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </AntdModal>
        <XuatPhieuModal visible={xuatPhieuModal} handlerClose={() => setXuatPhieuModal(false)}
            lyDoTuChoi={lyDoTuChoi} setNewFile={setNewFile}
            onChangeLyDo={onChangeLyDo} setOnChangeLyDo={setOnChangeLyDo}
            maGiayToHoSo={maGiayToHoSo} setMaGiayToHoSo={setMaGiayToHoSo}
            urlPhieu={urlPhieu} setUrlPhieu={setUrlPhieu}
            loadingPhieu={loadingPhieu} setLoadingPhieu={setLoadingPhieu}
            form={form}
        />
    </>
}

export default TuChoiTiepNhanHoSoTrucTuyenModal