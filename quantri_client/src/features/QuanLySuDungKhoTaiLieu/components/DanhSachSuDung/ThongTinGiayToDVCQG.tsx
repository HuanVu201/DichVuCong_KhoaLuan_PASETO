import { ID_SEPARATE } from "@/data"
import { resetDatas } from "@/features/linhvuc/redux/slice"
import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { GetDanhSachKetQuaCanBoRequest, GetDanhSachKetQuaCanBoWithoutDanhMucRequest, GetDanhSachKetQuaCaNhanWithoutDanhMucRequest, GetDanhSachKetQuaResponse, GetKetQuaByURLRequest, GetListKetQuaByUrlRequest, giayToSoHoaApi, UploadFileResult } from "@/features/giaytosohoa/services"
import { useGiayToSoHoaDVCQGColumn } from "@/features/hoso/hooks/useGiayToSoHoaDVCQGColumn"
import { ILinhVuc } from "@/features/linhvuc/models"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { IThuTuc } from "@/features/thutuc/models"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row, Tag, Typography } from "antd"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { thuTucApi } from "@/features/thutuc/services"
import { IResult } from "@/models"
import { AxiosError } from "axios"
import { khoTaiLieuCongDanApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { Nguon_DVCQG } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { ColumnsType } from "antd/es/table"

type SearchDataRef = {
    req?: GetDanhSachKetQuaCanBoWithoutDanhMucRequest,
    res?: GetDanhSachKetQuaResponse 
}

const ThongTinGiayToDVCQG = ({onOkHandler, onCloseModal, title = "Danh sách giấy tờ số hóa DVCQG", searchText = "Tìm kiếm tài liệu", syncAll = false} : {syncAll?: boolean; searchText?: string; title?: string; onOkHandler: (dinhKem: string, callBackDataOnSearch?: SearchDataRef) =>void, onCloseModal: () => void}) => {
    const [form] = Form.useForm()
    const [giayToSoHoaDVC, setGiayToSoHoaDVC] = useState<GetDanhSachKetQuaResponse[]>()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanh: form.getFieldValue("soGiayToChuHoSo") })
    const [selectedGiayToSoHoas, setSelectedGiayToSoHoas] = useState<string[]>([])
    const columns = useGiayToSoHoaDVCQGColumn({columnNameType : syncAll ? "ho-so" : "giay-to"})
    const {data: user} = useAppSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const {datas: linhVucs} = useAppSelector(state => state.linhvuc)
    const [thongTinDongBoModal, setThongTinDongBoModal] = useState<{
        visible: boolean;
        data?: UploadFileResult[];
    }>({
        visible: false,
        data: undefined
    })
    const [thuTucs, setThuTucs] = useState<IThuTuc[]>([])
    const searchDataRef = useRef<GetDanhSachKetQuaCanBoWithoutDanhMucRequest>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(linhVucs === undefined){
            dispatch(SearchLinhVuc({hasThuTuc: true, pageNumber: 1, pageSize: 1000}))
        }
    }, [linhVucs])

    const handleCancel = () => {
        dispatch(resetDatas())
        onCloseModal()
    }

    const onSearch = async () => {
        const body : GetDanhSachKetQuaCanBoWithoutDanhMucRequest = {
            MaThuTuc: form.getFieldValue("maTTHC"),// form.getFieldValue("maTTHC") , // "1.004616.000.00.00.H56"
            SoDinhDanhChuSoHuu: form.getFieldValue("soGiayToChuHoSo")
        }
        try{
            setLoading(true)
            searchDataRef.current = body
            if(user?.typeUser == "CongDan"){
                const res = await giayToSoHoaApi.KhoLuuTruDanhSachGiayToKhoQuocGiaCongDan(body)
                setGiayToSoHoaDVC(res.data.data)
            } else {
                const res = await giayToSoHoaApi.KhoLuuTruDanhSachGiayToKhoQuocGiaCanBo(body)
                setGiayToSoHoaDVC(res.data.data)
            }
            
            setLoading(false)
        } catch(err){
            console.log(err);
            setLoading(false)
        }
        
    }

    const rowSelection = useMemo(() => ({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedGiayToSoHoas(selectedRowKeys.map(x => x as string))
        },
    }), [])
    const onOk = async () => {
        setLoading(true)
        if(giayToSoHoaDVC === undefined){
            toast.info("Không có giấy tờ số hóa")
            return;
        }
        if(!selectedGiayToSoHoas.length && giayToSoHoaDVC.length> 0){
            toast.info("Vui lòng chọn giấy tờ số hóa")
            return;
        }
        if (giayToSoHoaDVC) {
            if(syncAll){
                if(!searchDataRef.current?.SoDinhDanhChuSoHuu){
                    toast.warn("Không có số giấy tờ")
                    return
                }
                const thanhPhans= giayToSoHoaDVC.filter(x => selectedGiayToSoHoas.includes(x.soKyHieu))
                const reqBody : GetListKetQuaByUrlRequest = {
                    DanhSachKetQuas: thanhPhans.map((thanhPhan, idx) : (GetKetQuaByURLRequest & {SoKyHieu: string; TenGiayTo: string}) => {
                        // if(idx == 0) {
                        //     return {
                        //         CoQuanChuQuan : thanhPhan.coQuanChuQuan,
                        //         DanhSachTepDinhKem: [{
                        //             duongDan: "/dichvucong/2024/12/6/QuanLyTaiNguyen/b96c6b9a-43fe-487f-a22d-faa2b73c6ea2/response223.pdf",
                        //             tenTep: "response223.pdf"
                        //         }],
                        //         SoKyHieu: thanhPhan.soKyHieu
                        //     }
                        // }
                        return {
                            CoQuanChuQuan : thanhPhan.coQuanChuQuan,
                            DanhSachTepDinhKem: thanhPhan.danhSachTepDinhKem,
                            SoKyHieu: thanhPhan.soKyHieu,
                            TenGiayTo: thanhPhan.tenGiayTo
                        }
                    }),
                    Nguon: Nguon_DVCQG,
                    SoGiayToChuHoSo: searchDataRef.current?.SoDinhDanhChuSoHuu
                }
                try {
                    const res = await giayToSoHoaApi.DongBoHoSoSoHoaDVCQG(reqBody)
                    setThongTinDongBoModal({
                        visible: true,
                        data: res.data.data
                    })
                    onOkHandler(""); // gọi lại setSearchParams
                    setLoading(false)
                } catch(err){
                    console.log(err);
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
                
                return;
            }
            const thanhPhan = giayToSoHoaDVC.find(x => selectedGiayToSoHoas.includes(x.soKyHieu))
            if(thanhPhan){
                const reqBody : GetKetQuaByURLRequest= {
                    CoQuanChuQuan: thanhPhan.coQuanChuQuan,
                    DanhSachTepDinhKem : thanhPhan.danhSachTepDinhKem
                }
                try {
                    const callBackData = {
                        req: searchDataRef.current,
                        res: thanhPhan
                    }
                    console.log({
                        req: searchDataRef.current,
                        res: thanhPhan
                    });
                    // onOkHandler(`/dichvucong/2024/12/3/QuanLyTaiNguyen/dad04994-eee8-44d8-98e7-ad0b0556d2bf/response4.pdf`, callBackData)
                    
                    const res = await giayToSoHoaApi.GiayToKhoQuocGia(reqBody)
                    if(res.data.succeeded && res.data.data){
                        onOkHandler(res.data.data.join(ID_SEPARATE), callBackData)
                        handleCancel()
                    }
                    setLoading(false)
                } catch (error) {
                    const message = (error as AxiosError<IResult<string>>)?.response?.data.message
                    toast.error(message)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
        }
        setLoading(false)
    }

    const onChangeLinhVuc = async (value: string) => {
        const res = await thuTucApi.Search({maLinhVucChinh: value})
        if(res.data.data){
            setThuTucs(res.data.data)
        }
    }

    return <AntdModal width={1280} title={title} confirmLoading={loading} visible={true} handlerCancel={handleCancel} onOk={onOk}
    okText={syncAll ? "Đồng bộ" : "Thêm tài liệu và đóng"}  cancelText={null} maskClosable={false} closable={!loading}>
        <Form form={form} name="dvcqg" layout="vertical">
            <Row gutter={8}>
                <Col span={24} md={user?.typeUser === "CongDan" ? 12: 8}>
                    <Form.Item name="linhVuc" label="Lĩnh vực">
                        <AntdSelect generateOptions={{label: "ten", model:linhVucs, value:"ma"}} onChange={onChangeLinhVuc}/>
                    </Form.Item>
                </Col>
                <Col span={24} md={user?.typeUser === "CongDan" ? 12: 8}>
                    <Form.Item name="maTTHC" label="Thủ tục" rules={[{required: true, message:"vui lòng chọn thủ tục"}]}>
                        <AntdSelect generateOptions={{label: "tenTTHC", model:thuTucs, value:"maTTHC"}} />
                    </Form.Item>
                </Col>
                {user?.typeUser === "CongDan" ? null : <Col span={24} md={8}>
                    <Form.Item name="soGiayToChuHoSo" label="Số giấy tờ (CCCD, CMND)" rules={[{required: true, message:"vui lòng nhập số giấy tờ (CCCD, CMND)"}]}>
                        <Input></Input>
                    </Form.Item>
                </Col>}
                <div style={{width:"100%", display: "flex", justifyContent: "space-around", marginBlock: 10}}>
                    <AntdButton key={2} onClick={onSearch} loading={loading} type="primary">{searchText}</AntdButton>
                </div>
            </Row>
        </Form>
        <AntdTable
        loading={loading}
        columns={columns as any}
        rowKey={"soKyHieu"}
        dataSource={giayToSoHoaDVC as any}
        pagination={{
            total: giayToSoHoaDVC?.length
        }}
        rowSelection={{
            type: syncAll ? "checkbox" : "radio",
            ...rowSelection,
        }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) => {}}
        />
        {thongTinDongBoModal.visible ? <ThongTinDongBoResponseModal data={thongTinDongBoModal.data} onClose={() => setThongTinDongBoModal((curr) => ({data: undefined, visible: false }))}/> : null}
    </AntdModal>
}

const ThongTinDongBoResponseModal = ({onClose, data}: {data: UploadFileResult[] | undefined; onClose: () => void}) => {
    const columnSucceed = useMemo(() : ColumnsType<UploadFileResult> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên giấy tờ",
                key: "fileName",
                dataIndex: "fileName",
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Cơ quan chủ quản",
                key: "coQuanChuQuan",
                dataIndex: "coQuanChuQuan",
            },
        ]
    }, [data])
    const columnError = useMemo(() : ColumnsType<UploadFileResult> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên giấy tờ",
                key: "fileName",
                dataIndex: "fileName",
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Cơ quan chủ quản",
                key: "coQuanChuQuan",
                dataIndex: "coQuanChuQuan",
            },
            {
                title: "Thông tin đồng bộ",
                key: "error",
                dataIndex: "error",
            },
        ]
    }, [data])
    return <AntdModal title="Kết quả đồng bộ" visible={true} handlerCancel={onClose} width={1280} footer={null}>
        <Typography.Title level={5}>Danh sách đồng bộ thành công</Typography.Title>
         <AntdTable
            columns={columnSucceed as any}
            rowKey={"fileName"}
            dataSource={data?.filter(x => x.isSucceed) as any}
            pagination={{
                total: data?.length
            }}
            searchParams={{}}
            setSearchParams={() => {}}
            onSearch={(params) => {}}
        />
        <Typography.Title level={5}>Danh sách đồng bộ thất bại</Typography.Title>
        <AntdTable
            columns={columnError as any}
            rowKey={"fileName"}
            dataSource={data?.filter(x => !x.isSucceed) as any}
            pagination={{
                total: data?.length
            }}
            searchParams={{}}
            setSearchParams={() => {}}
            onSearch={(params) => {}}
        />
    </AntdModal>
}

export default ThongTinGiayToDVCQG