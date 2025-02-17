import { Spin } from 'antd'
import { SoLieuBaoCaoProvider, useSoLieuBaoCaoContext } from '../contexts'
import BanDoTheCheSearch from './BanDoTheCheSearch'
import './index.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { SoLieuBaoCaoApi } from '../service'
import { toast } from 'react-toastify'
import ThongKeTongHop766 from './ThongKeTongHop/Diem766'
import DichVuTrucTuyen from './ThongKeTongHop/DvcTrucTuyen'
import KetQuaXuLyHoSo from './Common/KetQuaXuLyHoSo'
import AverageThongKeBlock from './Common/AverageThongKeBlock'
import ThongKeTongHopSwapper from './ThongKeTongHop/ThongKeTongHopSwapper'
import TienDoGiaiQuyetSwapper from './TienDoGiaiQuyet/TienDoGiaiQuyetSwapper'
import DvcTrucTuyenSwapper from './DvcTrucTuyen/DvcTrucTuyenSwapper'
import ThanhToanTrucTuyenSwapper from './ThanhToanTrucTuyen/ThanhToanTrucTuyenSwapper'
import SoHoaHoSoSwapper from './SoHoaHoSo/SoHoaHoSoSwapper'
import CongKhaiMinhBachSwapper from './CongKhaiMinhBach/CongKhaiMinhBachSwapper'
import BanDoTheCheMap from './Map/Map'
import { QUAN_HUYEN, XA_PHUONG } from '../../DanhMucThuTuc/components/HeaderContainerTTHC'

const BanDoTheCheLayout = () => {
    const soLieuContext = useSoLieuBaoCaoContext()

    useEffect(() => {
        (async () => {
            if (soLieuContext.searchParams?.nam && soLieuContext.searchParams?.ky != null) {

                soLieuContext.setLoading1(true)

                const resSoLieuTheoKy = await SoLieuBaoCaoApi.SearchSoLieuBaoCaoTheoKy({
                    ...soLieuContext.searchParams,
                    loaiThongKe: soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh',
                })

                if (resSoLieuTheoKy.data.data)
                    soLieuContext.setSoLieuTheoKy(resSoLieuTheoKy.data.data)
                else
                    toast.error("Không có số liệu thống kê theo kỳ!")

                soLieuContext.setLoading1(false)
            }

        })()
    }, [soLieuContext.searchParams])

    useEffect(() => {
        (async () => {
            if (soLieuContext.searchParams?.nam) {
                soLieuContext.setLoading2(true)
                const resSoLieuTheoKyToanTinh = await SoLieuBaoCaoApi.SearchSoLieuBaoCaoTheoKy({
                    ...soLieuContext.searchParams,
                    loaiThongKe: soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh',
                    loaiThoiGian: "Tháng",
                    getAllMonth: true,
                    nam: soLieuContext.searchParams.nam,
                    ky: undefined
                })

                if (resSoLieuTheoKyToanTinh.data.data)
                    soLieuContext.setSoLieu12Thang(resSoLieuTheoKyToanTinh.data.data)
                else
                    toast.error("Không có số liệu thống kê 12 tháng của toàn tỉnh!")
                soLieuContext.setLoading2(false)
            }
        })()
    }, [soLieuContext.searchParams?.nam, soLieuContext.searchParams?.maDinhDanh])



    useEffect(() => {
        (async () => {
            soLieuContext.setLoading3(true)
            const resSoLieuHienTai = await SoLieuBaoCaoApi.SearchSoLieuBaoCaoHienTai({
                ...soLieuContext.searchParams,
                loaiThongKe: soLieuContext.searchParams && soLieuContext.searchParams.maDinhDanh ? 'DonVi' : 'ToanTinh'
            })
            if (resSoLieuHienTai.data.data)
                soLieuContext.setSoLieuHienTai(resSoLieuHienTai.data.data)
            else
                toast.error("Không có số liệu thống kê hiện tại!")

            soLieuContext.setLoading3(false)


        })()
    }, [soLieuContext.searchParams?.maDinhDanh])

    useEffect(() => {
        (async () => {
            if (soLieuContext.searchParams?.loaiThoiGian &&
                soLieuContext.searchParams?.ky != null && soLieuContext.searchParams?.nam) {

                soLieuContext.setLoading4(true)
                const resCoordinateHuyens = await SoLieuBaoCaoApi.GetCoordinates({
                    loaiThoiGian: soLieuContext.searchParams.loaiThoiGian,
                    ky: soLieuContext.searchParams.ky,
                    nam: soLieuContext.searchParams.nam
                })
                if (resCoordinateHuyens.data)
                    soLieuContext.setCoordinateHuyens(resCoordinateHuyens.data as any)
                else
                    toast.error("Không có dữ liệu các huyện!")
                soLieuContext.setLoading4(false)
            }
        })()
    }, [soLieuContext.searchParams?.loaiThoiGian, soLieuContext.searchParams?.ky, soLieuContext.searchParams?.nam])

    useEffect(() => {
        (async () => {
            if (soLieuContext.searchParams?.maDinhDanh && soLieuContext.searchParams?.loaiThoiGian &&
                soLieuContext.searchParams?.ky != null && soLieuContext.searchParams?.nam &&
                (soLieuContext.searchParams.catalog == QUAN_HUYEN || soLieuContext.searchParams.catalog == XA_PHUONG)
            ) {
                soLieuContext.setLoading5(true)
                const maDinhDanhRequest = soLieuContext.searchParams.catalog == XA_PHUONG
                    ? soLieuContext.searchParams.maDinhDanh.substring(0, soLieuContext.searchParams.maDinhDanh.lastIndexOf('.'))
                    : soLieuContext.searchParams.maDinhDanh

                const resCoordinateHuyens = await SoLieuBaoCaoApi.GetCoordinates({
                    maDinhDanh: maDinhDanhRequest,
                    getChild: true,
                    loaiThoiGian: soLieuContext.searchParams.loaiThoiGian,
                    ky: soLieuContext.searchParams.ky,
                    nam: soLieuContext.searchParams.nam,
                })
                if (resCoordinateHuyens.data)
                    soLieuContext.setCoordinateHuyens(resCoordinateHuyens.data as any)
                else
                    toast.error("Không có dữ liệu các xã!")
                soLieuContext.setLoading5(false)
            }

            if (soLieuContext.searchParams && soLieuContext.searchParams.catalog !== QUAN_HUYEN && soLieuContext.searchParams.catalog !== XA_PHUONG) {
                soLieuContext.setCoordinateXas(undefined)
            }
        })()
    }, [soLieuContext.searchParams?.maDinhDanh, soLieuContext.searchParams?.loaiThoiGian, soLieuContext.searchParams?.ky, soLieuContext.searchParams?.nam])



    return (
        <div className='commonBackgroundTrongDong'>
            <Spin spinning={soLieuContext.loading || soLieuContext.loading1 || soLieuContext.loading2 || soLieuContext.loading3 ||
                soLieuContext.loading4 || soLieuContext.loading5
            }
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className="dashboardContainer ">
                    <BanDoTheCheSearch />
                    <div className=" listThongKeBlock" style={{ justifyContent: 'space-between' }}>
                        <div className=" thongKeBlock" style={{ gridColumn: '1 / 3', gridRow: '1 / 4', padding: 0 }} >
                            {/* <Map targetLocation={{type: "commune", id: "VNM.57.2.1_1"}}/> */}
                            <BanDoTheCheMap targetLocation={{ type: "Province" }} />
                        </div>
                        {soLieuContext.nhomChiTieu == 'tongHop'
                            ? <ThongKeTongHopSwapper />
                            : null
                        }
                        {soLieuContext.nhomChiTieu == 'congKhaiMinhBach'
                            ? <CongKhaiMinhBachSwapper />
                            : null
                        }
                        {soLieuContext.nhomChiTieu == 'tienDoGiaiQuyet'
                            ? <TienDoGiaiQuyetSwapper />
                            : null
                        }
                        {soLieuContext.nhomChiTieu == 'dvcTrucTuyen'
                            ? <DvcTrucTuyenSwapper />
                            : null
                        }
                        {soLieuContext.nhomChiTieu == 'thanhToanTrucTuyen'
                            ? <ThanhToanTrucTuyenSwapper />
                            : null
                        }
                        {soLieuContext.nhomChiTieu == 'soHoaHoSo'
                            ? <SoHoaHoSoSwapper />
                            : null
                        }
                    </div>
                </div>
            </Spin>
        </div>

    )
}

const BanDoTheCheSwapper = () => (
    <SoLieuBaoCaoProvider>
        <BanDoTheCheLayout />
    </SoLieuBaoCaoProvider>
);


export default BanDoTheCheSwapper