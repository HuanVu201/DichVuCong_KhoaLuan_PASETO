import { IHoSo } from "@/features/hoso/models";
import { useTraCuuHccContext } from "../contexts";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from 'dayjs'
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { EyeOutlined } from "@ant-design/icons";
function DanhSachHoSoTraCuu() {
    const traCuuContext = useTraCuuHccContext()
    const viewDetail = (maHoSo: string) => {
        if (traCuuContext.datas && traCuuContext.datas.length > 0) {
            const hoSo = traCuuContext.datas.filter((x: any) => x.maHoSo = maHoSo)[0]
            traCuuContext.setData(hoSo)
        }
    }
    return (<div className="DanhSachHoSoTraCuu">
        <div className="title">
            <b>DANH SÁCH HỒ SƠ</b>
        </div>
        <div className="content-danh-sach-ho-so">
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th><b><center>STT</center></b></th>
                        <th><b><center>Mã hồ sơ</center></b></th>
                        <th><b><center>Tên thủ tục</center></b></th>
                        <th><b><center>Chủ hồ sơ</center></b></th>
                        <th><b><center>Tình trạng</center></b></th>
                        <th><b><center>Ngày tiếp nhận</center></b></th>
                        <th><b><center>Ngày hẹn trả</center></b></th>
                        <th><b><center>Chi tiết</center></b></th>
                    </tr>
                </thead>
                <tbody>
                    {traCuuContext.datas?.map((item: IHoSo, index: number) => (
                        <tr key={index} className={index % 2 ? "rowChan" : "rowLe"}> 
                            <td><center>{index + 1}</center></td>
                            <td><center>{item.maHoSo}</center></td>
                            <td><center>{item.tenTTHC}</center></td>
                            <td><center>{item.chuHoSo}</center></td>
                            <td><center>{TRANGTHAIHOSO[item.trangThaiHoSoId]}</center></td>
                            <td><center> {item.ngayTiepNhan ? dayjs(item.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</center></td>
                            <td><center> {item.ngayHenTra ? dayjs(item.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</center></td>
                            <td onClick={() => { viewDetail(item.maHoSo) }}><center><EyeOutlined /></center></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div >);
}

export default DanhSachHoSoTraCuu;