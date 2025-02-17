import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { ISearchQuanLyVanBan } from "@/features/portaldvc_admin/QuanLyVanBan/models"
import { GetQuanLyVanBan, SearchQuanLyVanBan } from "@/features/portaldvc_admin/QuanLyVanBan/redux/action"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { callApiAndDisplayFile, getFileName } from "@/utils"
import { Button, Col, Form, Input, Pagination, PaginationProps, Row } from "antd"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { DownloadOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { resetData } from "@/features/portaldvc_admin/QuanLyVanBan/redux/slice"
import Item from "antd/es/list/Item"

const PossitionPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const dispatch = useDispatch()
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        dispatch(SearchQuanLyVanBan({ pageSize: 50, pageNumber: page }) as any)
    };

    return <Pagination current={current} onChange={onChange} />;
};

export const TableQLVB = () => {
    const dispatch = useAppDispatch()
    const [searchparams] = useSearchParams()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchQuanLyVanBan) => {
        dispatch(SearchQuanLyVanBan({ ...values, reFetch: true }))
        navigate({
            pathname: location.pathname,
            search: `key=${values}`,
        }
        );
    }

    const { data: LinhVuc, datas: LinhVucs } = useAppSelector(state => state.linhvuc)
    const { data: QuanLyVanBan, datas: QuanLyVanBans } = useAppSelector(state => state.quanlyvanban)


    useEffect(() => {
        dispatch(SearchLinhVuc({}))
    }, [])
    useEffect(() => {
        if (searchparams.get('id')) {
            dispatch(GetQuanLyVanBan(searchparams.get('id') as any))
        }
        else {
            dispatch(resetData())
        }
    }, [searchparams.get('id')])
    useEffect(() => {
        dispatch(SearchQuanLyVanBan({ pageNumber: 1, pageSize: 50, congKhai: true }))
    }, [])
    const navigate = useNavigate();
    const location = useLocation();

    const goToPosts = (key: any) =>
        navigate({
            pathname: location.pathname,
            search: `id=${key}`,
        }
        );
    const tenLinhVuc = LinhVucs?.find(item => item.ma == QuanLyVanBan?.maLinhVuc)
    const handleDownload = (fileName: any) => {

        const link = document.createElement('a');
        link.href = fileName;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="wrapper-right">
            {/* Search */}
            <Form name='ThuTucSearch' layout="vertical" form={form} onFinish={onFinish}>
                <div className="row ">
                    <div className="col-md-5 col-6">
                        <Form.Item
                            name="maLinhVuc"
                        >
                            <AntdSelect placeholder='Chọn lĩnh vực' generateOptions={{ model: LinhVucs, label: 'ten', value: 'ma' }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-5 col-6">
                        <Form.Item
                            name="tuKhoa"
                        >
                            <Input placeholder='Nhập từ khóa' />
                        </Form.Item>
                    </div>
                    <div className="col-md-2 col-12">
                        <Form.Item style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', width: '100%' }} >
                            <AntdButton htmlType="submit" style={{width: '100%'}}>
                                Tìm kiếm
                            </AntdButton>
                        </Form.Item>

                    </div>

                </div>
            </Form>

            {/* Table */}
            {QuanLyVanBan ?
                <div className="tableSwapper" >
                    <table className="table table-hover table-bordered" style={{
                        borderCollapse: "collapse", width: "100%", alignItems: 'center', fontSize: "15px", fontWeight: '500'
                    }}>

                        <tbody>
                            <tr >
                                <td colSpan={2} style={{ color: 'white', backgroundColor: '#ce7a58', borderColor: '#bce8f1', padding: '10px 15px', textAlign: 'center', borderTopLeftRadius: '3px', borderTopRightRadius: '3px', fontWeight: 'bold' }}>
                                    Thông tin chi tiết văn bản
                                </td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Số ký hiệu</td>
                                <td scope="col">{QuanLyVanBan.soKyHieu}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '200px' }} scope="col">Ngày ban hành</td>
                                <td scope="col">{QuanLyVanBan.ngaybanHanh ? dayjs(QuanLyVanBan.ngaybanHanh).format(FORMAT_DATE_WITHOUT_TIME) : null as any}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Loại văn bản</td>
                                <td scope="col">{QuanLyVanBan.loaiVanBan == 'huyen-xa' ? 'Quyết định TTHC Cấp Huyện - Xã' : QuanLyVanBan.loaiVanBan == 'tinh' ? 'Quyết định TTHC Cấp Tỉnh' : QuanLyVanBan.loaiVanBan == 'lien-thong' ? 'Quyết định TTHC Liên thông' : ''}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Lĩnh vực</td>
                                <td scope="col">{tenLinhVuc?.ten}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Cơ quan ban hành</td>
                                <td scope="col">{QuanLyVanBan.coQuanBanHanh}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Trích yếu</td>
                                <td scope="col">{QuanLyVanBan.trichYeu}</td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tải về</td>
                                <td style={{ cursor: 'pointer' }}><a href={QuanLyVanBan.fileDinhKem} download>{getFileName(QuanLyVanBan.fileDinhKem) ? <DownloadOutlined></DownloadOutlined> : <></>}</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <div >
                        <AntdButton onClick={() => navigate(-1)}>Quay lại</AntdButton>
                    </div>
                </div>
                :
                <div className='mb-5 table tableSwapper'>
                    <table style={{
                        verticalAlign: "middle", borderCollapse: "collapse", width: "100%", alignItems: 'center', textAlign: "center"
                    }} className="table table-bordered align-middle custom-table-qlvb">
                        <thead className="custom-header-color">
                            <tr>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">STT</th>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">Số ký hiệu</th>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">Ngày ban hành</th>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">Loại văn bản</th>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">Trích yếu</th>
                                <th style={{ backgroundColor: '#ce7a58', color: 'white', textAlign: 'center', verticalAlign: 'middle' }} scope="col">Tải về</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QuanLyVanBans?.map((item, index) => (
                                <tr key={index}>
                                    <td scope='row'>{index + 1}</td>
                                    <td>{item.soKyHieu}</td>
                                    <td>{dayjs(item.ngaybanHanh).format(FORMAT_DATE_WITHOUT_TIME)}</td>
                                    <td>{item.loaiVanBan == 'huyen-xa' ? 'Quyết định TTHC Cấp Huyện - Xã' : item.loaiVanBan == 'tinh' ? 'Quyết định TTHC Cấp Tỉnh' : item.loaiVanBan == 'lien-thong' ? 'Quyết định TTHC Cấp Liên thông' : ''}</td>
                                    <td onClick={() => goToPosts(item.id)} style={{ color: '#0072BC', cursor: 'pointer' }}>{item.trichYeu}</td>
                                    <td style={{ cursor: 'pointer' }}><a href={item.fileDinhKem} download >{getFileName(item.fileDinhKem) ? <DownloadOutlined></DownloadOutlined> : <></>}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {QuanLyVanBans ?
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <PossitionPage />
                        </div>
                        : <></>}
                </div>

            }




        </div>
    )
}