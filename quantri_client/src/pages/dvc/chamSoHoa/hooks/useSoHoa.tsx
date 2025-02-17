import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Form, Input, Space, Tag } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { AntdButton, UploadTable } from '@/lib/antd/components'
import { FormInstance } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { toast } from 'react-toastify'
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models'
import { ITiepNhanHoSoTrucTuyenContext, useTiepNhanHoSoTrucTuyenContext } from '@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext'
import { ITiepNhanHoSoContext } from '@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext'
import { useAppSelector } from '@/lib/redux/Hooks'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '@/features/hoso/data/formData'
import { IThanhPhanThuTucWithSoHoa } from '@/features/hoso/components/ReadOnlyTepDinhKem'
import { IThanhPhanHoSoWithSoHoa } from '@/features/hoso/components/actions/suaHoSo/TepDinhKemHoSo'
import { validateDigitalSignatureFiles } from '@/features/hoso/components/ultis/validate'
import { useTramSoHoaContext } from '../contexts/TramSoHoaContext'

export const useTramSoHoaThanhPhanHoSo = ({dataSource, setDataSource, form}: {dataSource: IThanhPhanHoSoWithSoHoa[],setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSoWithSoHoa[]>>, form:FormInstance<IHoSo>}) => {
    const tiepNhanHoSoTrucTuyenContext = useTramSoHoaContext()
    const [_, startTransition] = useTransition();
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const onSoHoa = useCallback(async (record: IThanhPhanHoSo, index: number) => {
        if(!record.dinhKem){
            toast.warn("Chưa có tệp đính kèm")
            return;
        }
        if(!hoSo?.soDinhDanh){
            toast.info("Vui lòng định danh hồ sơ trước")
            return;
        }
        if(!hoSo){
            return;
        }
        const isValid = await validateDigitalSignatureFiles(record.dinhKem);
        if(!isValid){
                return;
        }
        const soHoaData : ITiepNhanHoSoTrucTuyenContext["soHoaData"] = {
            ten: record.ten,
            maDinhDanh:  hoSo?.soGiayToChuHoSo,
            ma:  hoSo?.soGiayToChuHoSo + "." +  hoSo?.maTTHC + "." + record.maGiayTo,
            maGiayTo:record.maGiayTo,
            dinhKem: record.dinhKem,
            onOk: () => onRowChange(TRANGTHAISOHOA["Được số hóa"], index, "trangThaiSoHoa"),
            thanhPhanHoSoId: record.id,
            loaiSoHoa: "0"
        }
        tiepNhanHoSoTrucTuyenContext.setSoHoaData(soHoaData)
        tiepNhanHoSoTrucTuyenContext.setGiayToSoHoaModalVisible(true)
       
    }, [hoSo])

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
                        // kySoToken={soDinhDanh != undefined && soDinhDanh != ""}
                        kySoToken={true}
                        hideUpload={record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"]}
                        setDataSource={setDataSource}
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
                render: (_, record, idx) => {
                    return (
                        <Space direction="horizontal">
                            {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"]? <Tag color="geekblue">{(TRANGTHAISOHOA_VALUE as any)[record.trangThaiSoHoa] }</Tag> : 
                            <AntdButton icon={<UploadOutlined/>} title="Số hóa dữ liệu" onClick={() => onSoHoa(record, idx)}>Số hóa</AntdButton>
                            }
                        </Space>
                    )
                }
            },
        ]
    }, [dataSource, hoSo])
    return columns
}