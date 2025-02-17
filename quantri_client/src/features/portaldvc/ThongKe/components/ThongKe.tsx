import { useEffect, useRef, useState } from "react";
import { Button, Carousel, Col, DatePicker, Form, RadioChangeEvent, Row, Select } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import { ThongKeTable } from "./ThongKeTable";
import { YEAR, getMonths, getYearsFrom } from "@/data";
import { BarChartOutlined } from "@ant-design/icons";
import { getCurrency } from "@/utils";
import { DEFAULT_YEAR, useThongKe } from "../hooks/useThongKe";
import { THONG_KE_THEO_OPTIONS, TIEU_CHI_OPTIONS } from "../data/formSearchData";
import { AntdButton, AntdSelect, AntdSpace } from "@/lib/antd/components";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "./ThongKe.scss"
import { PieChartPortal } from "./ThongKeDetail/PieChartPortal";
import MapThongKeThanhHoa from "../../ThongKeMap/components/BanDoTheChe";

const thangs = [
    { label: "Tháng 1", value: "thang1" },
    { label: "Tháng 2", value: "thang2" },
    { label: "Tháng 3", value: "thang3" },
    { label: "Tháng 4", value: "thang4" },
    { label: "Tháng 5", value: "thang5" },
    { label: "Tháng 6", value: "thang6" },
    { label: "Tháng 7", value: "thang7" },
    { label: "Tháng 8", value: "thang8" },
    { label: "Tháng 9", value: "thang9" },
    { label: "Tháng 10", value: "thang10" },
    { label: "Tháng 11", value: "thang11" },
    { label: "Tháng 12", value: "thang12" },
];

const quys = [
    { label: "Quý 1", value: "quy1" },
    { label: "Quý 2", value: "quy2" },
    { label: "Quý 3", value: "quy3" },
    { label: "Quý 4", value: "quy4" },
];

export const ThongKe = () => {
    const tmpUseThongKe = useThongKe;
    const { pieChartData, duLieuThongKes, carouselRef, onClickNext, onClickPrev, showSearch, form, onFinish, searchParams, onGoBack, tongSoHoSoTrongNamChart, PickYearComp } = tmpUseThongKe()
    const currentMonth = new Date().getMonth() + 1;
    const [displayTQN, setDisplayTQN] = useState<string>("none");
    const [displayThang, setDisplayThang] = useState<string>("blcck");
    const [displayQuy, setDisplayQuy] = useState<string>("none");
    const [displayNam, setDisplayNam] = useState<string>("block");

    const onChangeTQN = (value: string) => {
        if (value == "month") {
            setDisplayThang("block");
            setDisplayQuy("none");
            setDisplayNam("block");

            form.setFieldValue("quy", undefined);
        }
        if (value == "quarter") {
            setDisplayThang("none");
            setDisplayQuy("block");
            setDisplayNam("block");

            form.setFieldValue("thang", undefined);
        }
        if (value == "year") {
            setDisplayThang("none");
            setDisplayQuy("none");
            setDisplayNam("block");

            form.setFieldValue("thang", undefined);
            form.setFieldValue("quy", undefined);
        }

    };

    return (<>
        <div className="thongKe_header">
            {showSearch ?
                <div className="container my-4" style={{ padding: 0 }}>
                    <p className="text-center mb-4" style={{ color: "#d7764f", fontWeight: 700, fontSize: "1.125rem" }}>BẢNG TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH NĂM {searchParams.get("nam") || YEAR}</p>
                    <Form form={form} name="ThongKeTheoKy" onFinish={onFinish} initialValues={{ tieuChi: "month", catalog: "so-ban-nganh", nam: searchParams.get("nam") || YEAR }}>
                        <Row gutter={[8, 8]} style={{ display: 'flex' }}>
                            {/* <Col style={{ flex: 1 }}>
                                <Form.Item name="catalog" label="Thống kê theo">
                                    <Select options={THONG_KE_THEO_OPTIONS} />
                                </Form.Item>
                            </Col> */}
                            {/* <Col style={{ flex: 1 }}>
                                <Form.Item name="thoigianthongketheo" label="Loại thời gian: ">
                                    <AntdSelect
                                        onChange={onChangeTQN}
                                        defaultValue={"month"}
                                        generateOptions={{
                                            model: TIEU_CHI_OPTIONS,
                                            value: "value",
                                            label: "label",
                                        }}
                                        allowClear
                                        placeholder="Tháng/Quý/Năm"
                                    />
                                </Form.Item>
                            </Col> */}
                            <Col style={{ display: displayThang, flex: 1 }}>
                                <Form.Item name="thang" label="Tháng">
                                    <Select options={getMonths()} />
                                </Form.Item>
                            </Col>
                            <Col style={{ display: displayQuy, flex: 1 }}>
                                <Form.Item name="quy" label="Quý: ">
                                    <AntdSelect
                                        generateOptions={{
                                            model: quys,
                                            value: "value",
                                            label: "label",
                                        }}
                                        allowClear
                                        placeholder="Chọn quý"
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{ display: displayNam, flex: 1 }}>
                                <Form.Item name="nam" label="Năm">
                                    <Select options={getYearsFrom(DEFAULT_YEAR)} />
                                </Form.Item>
                            </Col>

                        </Row>


                        <div className="d-flex justify-content-center align-items-center">
                            <AntdSpace direction="horizontal">
                                <AntdButton htmlType="submit">Thống kê</AntdButton>
                                <AntdButton onClick={onGoBack}>Trở lại</AntdButton>
                            </AntdSpace>
                        </div>
                    </Form>
                </div> :
                <div className="row my-3">
                    <div className="col-12 col-lg-4 bieuDoHeader">
                        <div className="border rounded-top py-1 align-items-center text-center" style={{ backgroundColor: '#ce7a58' }}>
                            <span className="titleThongKe" style={{ fontWeight: 'bold' }}>TÌNH HÌNH XỬ LÝ HỒ SƠ NĂM {PickYearComp}</span>
                        </div>
                        <div className="border">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-3">
                                <div className="d-flex flex-column mb-2 ">
                                    <span style={{ fontWeight: '700' }}>Tổng tiếp nhận mới</span>
                                    <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(pieChartData?.daTiepNhan || 0, ".")}</span>
                                </div>
                                <div className="d-flex flex-column mt-4">
                                    <span style={{ fontWeight: '700' }}>Đã xử lý</span>
                                    <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(pieChartData?.daGiaiQuyet || 0, ".")}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row" style={{ justifyContent: 'space-around', margin: '20px 0' }}>
                                <PieChartPortal pieChartData={pieChartData} tongSoHoSoTrongNamChart={tongSoHoSoTrongNamChart} />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-lg-8 soLieuHeader container">
                        <div className="border rounded-top py-1 align-items-center text-center" style={{ backgroundColor: '#ce7a58' }}>
                            <span className="titleThongKe" style={{ fontWeight: 'bold' }}>TÌNH HÌNH XỬ LÝ HỒ SƠ THEO THÁNG</span>
                        </div>
                        <div className="border">
                            <div className=" mt-3" >
                                <Carousel dotPosition="bottom" dots={false} arrows ref={carouselRef} >

                                    {duLieuThongKes?.map((chunkData, index) => (
                                        <div key={index} className="d-flex justify-content-around" style={{ flexWrap: 'wrap' }}>
                                            {chunkData.filter(x => x.thang <= currentMonth).map((duLieuThongKe, index2) => (
                                                <div key={index2}>
                                                    <div className="text-center fw-bold fs-6 pb-2" style={{ borderBottom: "1px dashed #ccc", color: "#b00600" }}>
                                                        <BarChartOutlined />Tháng {duLieuThongKe.thang}/{duLieuThongKe.nam}
                                                    </div>
                                                    <div className="mt-1">
                                                        <span style={{ fontWeight: '700' }}>Tổng hồ sơ: </span>
                                                        <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(duLieuThongKe.tongSoHoSo, ".")}</span>
                                                    </div>
                                                    <div className="mt-1">
                                                        <span style={{ fontWeight: '500' }}>- Kỳ trước chuyển sang: </span>
                                                        <span style={{ fontWeight: '600' }}>{getCurrency(duLieuThongKe.hoSoTuKyTruoc, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500' }}>- Tiếp nhận mới: </span>
                                                        <span style={{ fontWeight: '600' }}>{getCurrency(duLieuThongKe.hoSoMoiTiepNhan, ".")}</span>
                                                    </div>
                                                    <div className="my-1">
                                                        <span style={{ fontWeight: '700' }}>Hồ sơ đã xử lý: </span>
                                                        <span style={{ fontWeight: '700', color: '#b00600' }}>{getCurrency(duLieuThongKe.tongSoHoSoDaXuLy, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500' }}>- Đúng hạn: </span>
                                                        <span style={{ fontWeight: '600' }}>{getCurrency(duLieuThongKe.hoSoDaXuLyDungHan, ".")}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: '500' }}>- Quá hạn: </span>
                                                        <span style={{ fontWeight: '600' }}>{getCurrency(duLieuThongKe.hoSoDaXuLyQuaHan, ".")}</span>
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

        </div>
        <ThongKeTable searchQuery={searchParams} useThongKe={tmpUseThongKe}></ThongKeTable>
    </>
    )
}

