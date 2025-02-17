import { RenderTitle } from "@/components/common"
import { IHoSo } from "@/features/hoso/models"
import { INPUT_RULES } from "@/features/screenaction/data"
import { IThuTuc } from "@/features/thutuc/models"
import { thuTucApi } from "@/features/thutuc/services"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, FormInstance, Input, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const ThongTinPhiLePhiThuTucTrucTuyen = ({form} : { form: FormInstance<IHoSo>}) => {
    const dispatch = useAppDispatch()
    const [searchQuerys, setSearchQuerys] = useSearchParams();
    const [thuTuc, setThuTuc] = useState<IThuTuc>()
    const [filteredCapThucHien, setFilteredCapThucHien] = useState([]);

    const maTTHC = searchQuerys.get("maTTHC")
    useEffect(() => {
        ; (async () => {
            if (maTTHC) {
                const {
                    data: { data: thuTuc },
                } = await thuTucApi.GetByMa(maTTHC)
                setThuTuc(thuTuc)
            }
        })()
    }, [maTTHC])



    // useEffect(() => {
    //     let goiTinThuTucQGData
    //     try {
    //         if(thuTuc)
    //             goiTinThuTucQGData = thuTuc.goiTinThuTucQG ? ()
            
    //     } catch (error) {
    //     }

        
    //     const goiTinThuTucQGParse = JSON.parse(thuTuc?.goiTinThuTucQG as any)
        
    //     const filteredData = goiTinThuTucQGParse.filter((item: any) => item.KENH === "2");
    //     setFilteredCapThucHien(filteredData);
    // }, [thuTuc]);

    // console.log(filteredCapThucHien);
    


    return (
        <Row gutter={8}>
            <Col span={24} >
                <Form.Item name="thoiHanGiaiQuyet" label="Thời hạn giải quyết:" >
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col span={24} >
                <Form.Item name="phiLePhi" label="Phí, lệ phí:" >
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col span={24} >
                <Form.Item name="moTa" label="Mô tả:" >
                    <Input disabled />
                </Form.Item>
            </Col>


        </Row>
    )
}