import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Form, Input, Space, Tag } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { AntdButton, UploadTable } from '@/lib/antd/components'
import { FormInstance } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { IThanhPhanThuTucWithSoHoa } from '../components/actions/themMoiHoSo/TepDinhKem'
import { toast } from 'react-toastify'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '../data/formData'
import { IThanhPhanHoSoWithSoHoa } from '../components/actions/tiepNhanHoSoTrucTuyen/SoHoaThanhPhan'
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models'
import { ITiepNhanHoSoTrucTuyenContext, useTiepNhanHoSoTrucTuyenContext } from '@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext'
import { ITiepNhanHoSoContext } from '@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext'
import { validateDigitalSignatureFiles } from '../components/ultis/validate'
import { useAppSelector } from '@/lib/redux/Hooks'

export const useTiepNhanHoSoTrucTuyenColumn = ({dataSource, setDataSource, form}: { dataSource: IThanhPhanHoSoWithSoHoa[],setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSoWithSoHoa[]>>, form:FormInstance<IHoSo>}) => {
    const tiepNhanHoSoTrucTuyenContext = useTiepNhanHoSoTrucTuyenContext()
    const [_, startTransition] = useTransition();
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const soDinhDanh: string = Form.useWatch("soDinhDanh", form)
    const onSoHoa = useCallback(async (record: IThanhPhanHoSo, index: number) => {
        if(!record.dinhKem){
            toast.warn("Chưa có tệp đính kèm")
            return;
        }
        if(!soDinhDanh){
            toast.info("Vui lòng định danh hồ sơ trước")
            return;
        }
        const isValid = await validateDigitalSignatureFiles(record.dinhKem);
        if(!isValid){
                return;
        }
        
        const soHoaData : ITiepNhanHoSoTrucTuyenContext["soHoaData"] = {
            ten: record.ten,
            maDinhDanh: form.getFieldValue("soGiayToChuHoSo"),
            ma: form.getFieldValue("soGiayToChuHoSo") + "." + form.getFieldValue("maTTHC") + "." + record.maGiayTo,
            maGiayTo:record.maGiayTo,
            dinhKem: record.dinhKem,
            onOk: () => onRowChange(TRANGTHAISOHOA["Được số hóa"], index, "trangThaiSoHoa"),
            thanhPhanHoSoId: record.id,
            loaiSoHoa: "0"
        }
        tiepNhanHoSoTrucTuyenContext.setSoHoaData(soHoaData)
        tiepNhanHoSoTrucTuyenContext.setGiayToSoHoaModalVisible(true)
       
    }, [soDinhDanh])

    const onRowChange = useCallback((value: any, index: number, colName: keyof IThanhPhanThuTucWithSoHoa) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index){
                        return {...item, [colName]: value}
                    }
                    return item
                })
            })
        })
    },[])

    const columns = useMemo(() : ColumnsType<IThanhPhanHoSoWithSoHoa> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                width:"60%",
                render: (_, record, idx) => {
                    return <Input.TextArea title={record.ten} rows={3} defaultValue={record.ten} onChange={(e) => onRowChange(e.target.value, idx, "ten")}/>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    return <UploadTable 
                        kySoToken={soDinhDanh != undefined && soDinhDanh != ""}
                        hideUpload={true} 
                        dinhKem={record.dinhKem} 
                        folderName={hoSo?.maHoSo} 
                        colDinhKemName={"dinhKem"} 
                        rowNumber={idx} />
                }
            },
            {
                title: "Thao tác",
                width:"10%",
                align:'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Space direction="horizontal">
                        {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"]? <Tag color="geekblue">{(TRANGTHAISOHOA_VALUE as any)[record.trangThaiSoHoa] }</Tag> : 
                        <AntdButton icon={<UploadOutlined/>} title="Số hóa dữ liệu" onClick={() => onSoHoa(record, idx)}>Số hóa</AntdButton>
                        }
                    </Space>
                )
            },
        ]
    }, [dataSource, soDinhDanh, hoSo])
    return columns
}