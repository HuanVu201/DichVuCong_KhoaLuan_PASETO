
import "./ThongTinLienQuan.scss"
import { Row, Col } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect } from "react";
import { SearchPublicConfig } from "@/features/config/redux/action";


export const ThongTinLienQuan = () => {
    let imageThongTin
    let linkThongTin

    const { datas: quanlylienket } = useAppSelector(
        (state) => state.quanlylienket
    );

    quanlylienket?.map(item => {
        if (item.ma === "image-ddci" && item.suDung) {
            imageThongTin = item.linkLienKet;
        }
        if (item.ma === "link-khao-sat-ddci" && item.suDung) {
            linkThongTin = item.linkLienKet;
        }
    })


    return <div>
        {imageThongTin && linkThongTin
            ?
            <Row gutter={16}>
                <Col span={24} className="d-flex justify-content-center thongTinKhaoSat" style={{ display: 'flex', alignItems: 'center' }}>
                    {<a href={linkThongTin} className="QR_Information" target="_blank">
                        <div className="w-100 title_QuanTam" style={{ fontWeight: '600', color: '#ce7a58' }}>Khảo sát ý kiến đánh giá của DN/HTX/HKD</div>
                        <img src={imageThongTin} className="image_thongTinKhaoSat text-center" />
                        {/* <p style={{ fontWeight: '500' }}>Quét để quan tâm</p> */}

                    </a>

                    }
                </Col>
            </Row>
            : null}


    </div>
}