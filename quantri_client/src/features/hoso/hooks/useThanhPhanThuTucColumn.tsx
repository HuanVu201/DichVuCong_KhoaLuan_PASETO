import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { IThanhPhanThuTuc } from '@/features/thanhphanthutuc/models'
import { Checkbox, Input, InputNumber, Popconfirm, Space, Tag } from 'antd'
import { ImportOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { AntdButton, UploadTable } from '@/lib/antd/components'
import { FormInstance } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { IThanhPhanThuTucWithSoHoa } from '../components/actions/themMoiHoSo/TepDinhKem'
import { toast } from 'react-toastify'
import { ITiepNhanHoSoContext, useTiepNhanHoSoContext } from '../../../pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '../data/formData'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { TrangThaiSoHoaTag } from '@/components/common'
import React from 'react'
import { validateDigitalSignatureFiles } from '../components/ultis/validate'
import { useAppSelector } from '@/lib/redux/Hooks'

const FOLDER_NAME = "ThanhPhanHoSo"

export const useThanhPhanThuTucColumn = ({ dataSource, setDataSource, form }: { dataSource: IThanhPhanThuTucWithSoHoa[], setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanThuTucWithSoHoa[]>>, form: FormInstance<IHoSo> }) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const [_, startTransition] = useTransition();
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const { onChangeDinhKemTable } = useUploadTable<IThanhPhanThuTucWithSoHoa>({ folderName: hoSo?.maHoSo || "TiepNhanHoSo", setDataSource, colDinhKemName: "dinhKem", rowNumber: -1 })
    const onSoHoa = useCallback(async (record: IThanhPhanThuTuc, index: number) => {
        if (!record.dinhKem) {
            toast.warn("Chưa có tệp đính kèm")
            return;
        }
        if(!form.getFieldValue("daDinhDanh")){
            toast.info("Vui lòng định danh hồ sơ trước")
            return;
        }
        const soGiayToChuHoSo = form.getFieldValue("soGiayToChuHoSo");
        const maTTHC = form.getFieldValue("maTTHC");
        if(!soGiayToChuHoSo || !maTTHC){
            toast.warn("Có lỗi xảy ra khi lấy số giấy tờ chủ hồ sơ và thủ tục")
            return;
        }
        const isValid = await validateDigitalSignatureFiles(record.dinhKem);
        if(!isValid){
                return;
        }
        const soHoaData: ITiepNhanHoSoContext["soHoaData"] = {
            ten: record.ten,
            maDinhDanh: soGiayToChuHoSo,
            maGiayTo: record.ma,
            ma: soGiayToChuHoSo + "." + maTTHC + "." + record.ma, // mã tptt
            dinhKem: record.dinhKem,
            onOk: (maGiayToSoHoa: string) => {
                onRowChange(TRANGTHAISOHOA["Được số hóa"], index, "trangThaiSoHoa")
                onRowChange(maGiayToSoHoa, index, "maGiayToSoHoa")
            },
            // thanhPhanHoSoId: record.id, // không cập nhật lại trạng thái số hóa hồ sơ do hiện tại chưa thêm thành phần hồ sơ
            loaiSoHoa: "0"
        }
        tiepNhanHoSoContext.setSoHoaData(soHoaData)
        tiepNhanHoSoContext.setGiayToSoHoaModalVisible(true)
        
    }, [hoSo])
    const onChonTuKhoSoHoa = useCallback((index: number, maKetQua: string) => {
        if (form.getFieldValue("daDinhDanh")) {
            tiepNhanHoSoContext.setKhoSoHoaData({
                onOk: (dinhKem: string, maGiayToKhoQuocGia: string) => {
                    onChangeDinhKemTable(dinhKem, undefined, "replace", index)
                    if(maGiayToKhoQuocGia){
                        onRowChange(maGiayToKhoQuocGia, index, "maGiayToKhoQuocGia")
                    }
                    // onRowChange(dinhKem, index, "fileSoHoa")
                    if (dinhKem) {
                        onRowChange(TRANGTHAISOHOA["Tái sử dụng"], index, "trangThaiSoHoa")
                    }
                }
            })
            form.setFieldValue("currentSelectedMaKetQuaTPTT", maKetQua)
            tiepNhanHoSoContext.setDanhSachGiayToSoHoaModalVisible(true)
        } else {
            toast.info("Vui lòng định danh hồ sơ trước")
        }
    }, [])

    const onRowChange = useCallback((value: any, index: number, colName: keyof IThanhPhanThuTucWithSoHoa) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index) {
                        return { ...item, [colName]: value }
                    }
                    return item
                })
            })
        })
    }, [])

    const columns = useMemo((): ColumnsType<IThanhPhanThuTucWithSoHoa> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                width: "40%",
                render: (_, record, idx) => {
                    return <Input.TextArea title={record.ten} cols={80} rows={3} defaultValue={record.ten} onChange={(e) => onRowChange(e.target.value, idx, "ten")} />
                }
            },
            {
                title: "Số bản chính",
                key: "soBanChinh",
                dataIndex: "soBanChinh",
                render: (_, record, idx) => {
                    return <InputNumber min={0} defaultValue={record.soBanChinh ?? 0} onChange={(e) => onRowChange(e, idx, "soBanChinh")} />
                }
            },
            {
                title: "Số bản sao",
                key: "soBanSao",
                dataIndex: "soBanSao",
                render: (_, record, idx) => {
                    return <InputNumber min={0} defaultValue={record.soBanSao ?? 0} onChange={(e) => onRowChange(e, idx, "soBanSao")} />
                }
            },
            {
                title: "Nhận bản giấy",
                key: "nhanBanGiay",
                dataIndex: "nhanBanGiay",
                render: (_, record, idx) => {
                    return <Checkbox onChange={(e) => onRowChange(e.target.checked, idx, "nhanBanGiay")} />
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    let hideKySoWith = undefined
                    if (record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"] || record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng"]) {
                        hideKySoWith = <TrangThaiSoHoaTag trangThai={record.trangThaiSoHoa} />
                    }
                    if (!record.dinhKem) {
                        hideKySoWith = undefined
                    }
                    return <>
                        <UploadTable
                            kySoToken
                            hideKySoWith={hideKySoWith}
                            onCleanSoHoa={() => {
                                if (record.trangThaiSoHoa != TRANGTHAISOHOA["Chưa số hóa"]) {
                                    onRowChange(TRANGTHAISOHOA["Chưa số hóa"], idx, "trangThaiSoHoa")
                                }
                            }}
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            folderName={hoSo?.maHoSo || "TiepNhanHoSo"}
                            colDinhKemName="dinhKem"
                            rowNumber={idx}
                            dinhKem={record.dinhKem}
                            scanPC={true}
                            extraElement={(loading) => (<>
                                <AntdButton loading={loading} icon={<ImportOutlined />} onClick={() => onChonTuKhoSoHoa(idx, record.ma)}>Chọn từ kho số hóa</AntdButton>
                            </>)}
                            onRemoveFile={(file: string) => {
                                const removeFiles: string[] = form.getFieldValue("removeFiles")
                                form.setFieldValue("removeFiles", [...removeFiles, file])
                            }}
                        />
                    </>
                }
            },
            {
                title: "Thao tác",
                width: "10%",
                align: 'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Space direction="horizontal">
                        {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"] ? <Tag color="geekblue">{TRANGTHAISOHOA_VALUE[record.trangThaiSoHoa]}</Tag> :
                            <AntdButton icon={<UploadOutlined />} title="Số hóa dữ liệu" onClick={() => onSoHoa(record, idx)}>Số hóa</AntdButton>

                        }
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                setDataSource((curr) => curr.filter(x => x.id !== record.id))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} title='Xóa dòng' onClick={() => { }} />
                        </Popconfirm>
                    </Space>
                )
            },
        ]
    }, [dataSource, hoSo, form])
    return columns
}