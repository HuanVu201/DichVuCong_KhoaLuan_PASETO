import { RenderTitle } from "@/components/common"
import { Col, Form } from "antd"
import { PhiLePhi } from "../../PhiLePhi"
import { ComponentProps, useMemo } from "react"
import { LOAIPHILEPHI_CHUNGTHUC_OPTIONS } from "@/features/hoso/data/formData"
import { IPhiLePhi } from "@/features/philephi/models"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"

const SOTIEN2TRANGDAU = 2000; 
const SOTIENTRANG3TRODI = 1000; 

export const PhiLePhiChungThuc = ({form, phiLePhis}: Pick<ComponentProps<typeof PhiLePhi>, "form" | "phiLePhis">) => {
    // const thanhPhanHoSos : IThanhPhanHoSo[] | undefined= Form.useWatch("thanhPhanHoSos", form)
    // const updateSoTien = (datas: IPhiLePhi[]) => {

    //     let tongPhi = 0
    //     let tongLePhi = 0
    //     datas.forEach(row => {
    //         if (row.loai == "Lệ phí") {
    //             tongLePhi += row.soTien
    //         } else if (row.loai == "Phí") {
    //             tongPhi += row.soTien
    //         }
    //     })
    //     form.setFieldValue("phiThu", tongPhi)
    //     form.setFieldValue("lePhiThu", tongLePhi)
    //     form.setFieldValue("tongTien", tongPhi + tongLePhi)
    // }

    // const caculatedDataSource = useMemo(() : IPhiLePhi[] => {
    //     const thanhPhanHoSoTotal = thanhPhanHoSos?.map((thanhPhanHoSo) : IPhiLePhi => {
    //         const soBanGiay = thanhPhanHoSo.soBanGiay ?? 0;
    //         const soTrang = thanhPhanHoSo.soTrang ?? 0;
    //         const soTien = soTrang >= 3 ? SOTIENTRANG3TRODI * soTrang 

    //         return {
    //             ten: "Phí thành phần: " + thanhPhanHoSo.ten,
    //             loai: "Phí",
    //             soTien: 
    //         }
    //     })
    // }, [thanhPhanHoSos])

    return <Col span={24}>
        <RenderTitle title="Thu phí, lệ phí"/>
        <PhiLePhi 
            defaultSelected='Thu sau' 
            hasCharge={["Thu sau"]} 
            form={form} 
            hinhThucThuOptions={LOAIPHILEPHI_CHUNGTHUC_OPTIONS} 
            phiLePhis={phiLePhis}
            />
    </Col>
}