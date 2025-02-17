import { useEffect, useRef, useState } from "react";
import { Button, Carousel, Form, RadioChangeEvent, Select } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import { ThongKeTable } from "./ThongKeTable";
import { YEAR, getMonths, getYearsFrom } from "@/data";
import { BarChartOutlined } from "@ant-design/icons";
import { getCurrency } from "@/utils";
import { useThongKe } from "../hooks/useThongKe";
import { THONG_KE_THEO_OPTIONS, TIEU_CHI_OPTIONS } from "../data/formSearchData";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "./ThongKe.scss"

export const ThongKe = () => {
    const { pieChartData, duLieuThongKes, carouselRef, onClickNext, onClickPrev, showSearch, form, onFinish, searchParams, onGoBack, tongSoHoSoTrongNamChart } = useThongKe()
    return (
        <div className="thongKe_header">
            {showSearch ?
                <div className="container my-4" >
                    <p className="text-center mb-4" style={{ color: "#d7764f", fontWeight: 700, fontSize: "1.125rem" }}>BẢNG TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH NĂM {YEAR}</p>
                    <Form form={form} name="ThongKeTheoKy" onFinish={onFinish} initialValues={{ tieuChi: "month", catalog: "so-ban-nganh" }}>
                        <div className="row row-cols-4">
                            <Form.Item name="catalog" label="Thống kê theo">
                                <Select options={THONG_KE_THEO_OPTIONS} />
                            </Form.Item>
                            <Form.Item name="tieuChi" label="Tiêu chí">
                                <Select options={TIEU_CHI_OPTIONS} />
                            </Form.Item>
                            <Form.Item name="nam" label="Năm">
                                <Select options={getYearsFrom(2022)} />
                            </Form.Item>
                            <Form.Item name="thang" label="Tháng">
                                <Select options={getMonths()} />
                            </Form.Item>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <AntdSpace direction="horizontal">
                                <AntdButton  htmlType="submit">Thống kê</AntdButton>
                                <AntdButton  onClick={onGoBack}>Trở lại</AntdButton>
                            </AntdSpace>
                        </div>
                    </Form>
                </div> :
                <div className="row my-3">
                    <div className="col-12 col-lg-3">
                        <div className="border rounded-top py-1 align-items-center text-center" style={{ backgroundColor: '#ce7a58' }}>
                            <span className="" style={{ color: '#333', fontWeight: 'bold' }}>TÌNH HÌNH XỬ LÝ HỒ SƠ NĂM {YEAR}</span>
                        </div>
                        <div className="border">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-3">
                                <div className="d-flex flex-column mb-2 ">
                                    <span style={{ fontWeight: '700' }}>Tổng tiếp nhận mới</span>
                                    <span style={{ fontWeight: '700', color: '#b00600', fontSize: '17px' }}>{getCurrency(pieChartData?.daTiepNhan || 0, ".")}</span>
                                </div>
                                <div className="d-flex flex-column mt-4">
                                    <span style={{ fontWeight: '700' }}>Đã xử lý</span>
                                    <span style={{ fontWeight: '700', color: '#b00600', fontSize: '17px' }}>{getCurrency(pieChartData?.daGiaiQuyet || 0, ".")}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={tongSoHoSoTrongNamChart} />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-lg-9 container">
                        <div className="border rounded-top py-1 align-items-center text-center" style={{ backgroundColor: '#ce7a58' }}>
                            <span style={{ color: '#333', fontWeight: 'bold' }}>TÌNH HÌNH XỬ LÝ HỒ SƠ THEO THÁNG</span>
                        </div>
                        <div className="border">
                            <div className=" mt-3" >
                                <Carousel dotPosition="bottom" dots={false} arrows ref={carouselRef} >

                                    {duLieuThongKes?.map((chunkData, index) => (
                                        <div key={index} className="d-flex justify-content-around">
                                            {chunkData.map((duLieuThongKe, index2) => (
                                                <div key={index2}>
                                                    <div className="text-center fw-bold fs-6 pb-2" style={{ borderBottom: "1px dashed #ccc", color: "#b00600" }}>
                                                        <BarChartOutlined /> {duLieuThongKe.thang} / {duLieuThongKe.nam}
                                                    </div>
                                                    <div className="mt-1">
                                                        <span style={{ fontWeight: '700', fontSize: '15px' }}>Tổng hồ sơ: </span>
                                                        <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(duLieuThongKe.tongSoHoSo, ".")}</span>
                                                    </div>
                                                    <div className="mt-1">
                                                        <span style={{ fontWeight: '500', fontSize: '15px' }}>- Kỳ trước chuyển sang: </span>
                                                        <span style={{ fontWeight: '600', fontSize: '15px' }}>{getCurrency(duLieuThongKe.hoSoTuKyTruoc, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500', fontSize: '15px' }}>- Tiếp nhận mới: </span>
                                                        <span style={{ fontWeight: '600', fontSize: '15px' }}>{getCurrency(duLieuThongKe.hoSoMoiTiepNhan, ".")}</span>
                                                    </div>
                                                    <div className="my-1">
                                                        <span style={{ fontWeight: '700', fontSize: '15px' }}>Hồ sơ đã xử lý: </span>
                                                        <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(duLieuThongKe.tongSoHoSoDaXuLy, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500', fontSize: '15px' }}>- Đúng hạn: </span>
                                                        <span style={{ fontWeight: '600', fontSize: '15px' }}>{getCurrency(duLieuThongKe.hoSoDaXuLyDungHan, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500', fontSize: '15px' }}>- Quá hạn: </span>
                                                        <span style={{ fontWeight: '600', fontSize: '15px' }}>{getCurrency(duLieuThongKe.hoSoDaXuLyQuaHan, ".")}</span>
                                                    </div>
                                                    <div className="my-3" style={{ width: '100%', height: '30px', backgroundColor: '#ddd', borderRadius: '8px', position: 'relative' }}>
                                                        <div style={{ position: 'absolute', borderRadius: '8px', backgroundColor: '#4CAF50', height: '100%', width: `${(duLieuThongKe.hoSoDaXuLyDungHan / ((duLieuThongKe.hoSoDaXuLyQuaHan + duLieuThongKe.hoSoDaXuLyDungHan) || 1)) * 100}%` }}>
                                                        </div>
                                                        <div style={{ textAlign: 'center', width: "100%", lineHeight: '30px', fontWeight: 'normal', position: "absolute" }}>{((duLieuThongKe.hoSoDaXuLyDungHan / ((duLieuThongKe.hoSoDaXuLyQuaHan + duLieuThongKe.hoSoDaXuLyDungHan) || 1)) * 100).toFixed(2)}% đúng hạn</div>
                                                    </div>
                                                    <Link to={`?thang=${duLieuThongKe.thang}&nam=${duLieuThongKe.nam}`} className="d-flex justify-content-center ">Xem chi tiết</Link>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </Carousel>
                                <div className="d-flex justify-content-center my-3">
                                    <div onClick={onClickPrev} className="mx-3">
                                        <Button className="buttonSearchPortal">Trước</Button>
                                    </div>
                                    <div onClick={onClickNext}>
                                        <Button className="buttonSearchPortal">Tiếp</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            {/* <MapThongKeThanhHoa /> */}
            <ThongKeTable searchQuery={searchParams}></ThongKeTable>

        </div>
    )
}