import { hoSoApi, SearchTraCuuHccParams } from "@/features/hoso/services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTraCuuHccContext } from "../contexts";

function FormTraCuu() {
    const traCuuContext = useTraCuuHccContext()
    const [typeSearch, setTypeSearch] = useState<string>('MaHoSo')
    const [inputValue, setInputValue] = useState<string>();
    const [searchParams, setSearchParams] = useState<SearchTraCuuHccParams>()

    const traCuuHandler = () => {
        if (!typeSearch) {
            toast.error("Chọn hình thức tra cứu!")
            return
        }
        if (!inputValue) {
            toast.error("Nhập dữ liệu tìm kiếm!")
            return
        }
        traCuuContext.setData(undefined)
        traCuuContext.setDatas(undefined)
        if (typeSearch == 'MaHoSo') {
            setSearchParams({ MaHoSo: inputValue })
        } else if (typeSearch == 'Params') {
            setSearchParams({ Params: inputValue })
        }
    }

    useEffect(() => {
        (async () => {
            if (!searchParams)
                return
            traCuuContext.setLoading(true)
            const res = await hoSoApi.SearchTraCuuHcc(searchParams)
            if (res.data.data) {
                traCuuContext.setDatas(res.data.data)
                if (res.data.data.length == 1)
                    traCuuContext.setData(res.data.data[0])
            } else {
                toast.warning("Không có thông tin tra cứu!")
            }
            traCuuContext.setLoading(false)
        })()
    }, [searchParams])



    useEffect(() => {
        console.log(typeSearch)
    }, [typeSearch])

    return (
        <div className="FormTraCuu">
            <div className="formTitle">
                <b>TRA CỨU THEO</b>
            </div>
            <div className="formBody">
                <div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="maHoSo" defaultChecked
                            onClick={() => setTypeSearch("MaHoSo")}
                        />
                        <label className="form-check-label" htmlFor="maHoSo">
                            Mã hồ sơ
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="SoDienThoaiCCCD"
                            onClick={() => setTypeSearch("Params")} />
                        <label className="form-check-label" htmlFor="SoDienThoaiCCCD">
                            Số điện thoại/CCCD người nộp
                        </label>
                    </div>
                </div>
                <div className="inputValue form-group-div text-center">
                    <input type="text" className="form-control" placeholder="Nhập dữ liệu tra cứu"
                        onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div className="buttonConfirm">
                    <input type="button" value="TRA CỨU" onClick={() => traCuuHandler()} />
                </div>

                <ul style={{ padding: 0, color: '#084875' }}>
                    <li>
                        <p><b>- Bước 1: </b> Chọn <b>“MÃ HỒ SƠ”</b> HOẶC <b>“Số điện thoại/CCCD người nộp”</b> để lựa chọn phương thức tra cứu.</p>
                    </li>
                    <li>
                        <p><b>- Bước 2: </b>Nhập thông tin vào form và chọn <b>“TRA CỨU”</b>.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FormTraCuu;
