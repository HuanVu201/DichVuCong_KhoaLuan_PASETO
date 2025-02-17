import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { toast } from "react-toastify";
import './index.scss'
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LogoTTHCThanhHoa from "../../../../assets/images/logo-TTHC_ThanhHoa.svg"
import { danhGiaHaiLongServices } from "../../DanhGiaHaiLong/services/DanhGiaHaiLong";
import { GetUser } from "@/features/user/redux/Actions";
import { fileApi } from "@/features/file/services";
import { logout, resetData as resetUser } from "@/features/user/redux/Slice";
import { userService } from "@/features/user/services";
import { useNavigate } from "react-router-dom";
import { Service } from "@/services";

const DanhGiaHaiLongHccSwapper = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { data: auth } = useAppSelector((state) => state.auth);
    const { publicModule: config } = useAppSelector(state => state.config)
    const [loading, setLoading] = useState<boolean>(false);
    const [valueDanhGia, setValueDanhGia] = useState<string>()
    const { data: user } = useAppSelector(state => state.user)
    const [logined, setLogined] = useState<boolean>()
    const [locationOrigin, setLocationOrigin] = useState<string>();
    const [avataBlob, setAvataBlob] = useState<Blob>()


    useEffect(() => {
        const tokenStr = localStorage.getItem('persist:root');
        if (tokenStr) {
            dispatch(GetUser({ token: tokenStr }))
        }
    }, []);

    useEffect(() => {
        (async () => {
            if (user && user.typeUser == 'CanBo') {
                setLogined(true)
                if (user.imageUrl) {
                    const valueGetImage = await fileApi.GetFileByte({ path: user.imageUrl || '' })
                    if (valueGetImage.data) {
                        setAvataBlob(valueGetImage.data)

                    } else {
                        toast.error("Có lỗi khi đọc hình ảnh đại diện!")
                    }
                }
            } else {
                setLogined(false)
            }
        })()

    }, [user])

    useEffect(() => {
        if (!config)
            dispatch(SearchPublicConfig())
    }, [])

    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ten-mien-dvc') {
                setLocationOrigin(item.content)
            }
        })
    }, [config])


    useEffect(() => {
        const eleEMC: any = document.querySelector('#yhy-append')
        if (eleEMC)
            eleEMC.style.display = 'none'
    }, [])


    const submitHandler = async () => {
        if (!valueDanhGia) {
            toast.warning("Vui lòng chọn đánh giá!")
            return
        }
        setLoading(true)
        const res = await danhGiaHaiLongServices.DanhGiaHaiLongHCC({ danhGia: valueDanhGia })
        if (res.data.succeeded) {
            toast.success(res.data.message)
        } else {
            toast.warning(res.data.message)
        }
        setValueDanhGia(undefined)
        setLoading(false)
    }

    const logoutHandler = () => {
        if (top?.window) {
            if (auth?.token) {
                top.location = `/logout?accessToken=${auth.token}`;
            } else {
                dispatch(logout())
                navigate(Service.primaryRoutes.portaldvc.home)
            }
        }
    }


    return (<>

        <div className="DanhGiaHaiLongHcc ">
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className=" header" style={{ padding: 10 }}>
                    <div className="bannerTelevision">
                        <img
                            className="logo"
                            src={LogoTTHCThanhHoa}
                        />
                    </div>

                </div>
                <div className="commonBackgroundTrongDong" style={{ minHeight: '80vh' }}>
                    {logined
                        ?
                        <>
                            <div className="container-fluid body">
                                <div className="title">
                                    <p><b><center>CÔNG CHỨC THỰC HIỆN TIẾP NHẬN THỦ TỤC HÀNH CHÍNH
                                    </center></b></p>
                                </div>
                                <div className="infoUser row" >
                                    <div className="col-4 leftContent" style={{ padding: 0 }}>
                                        {avataBlob ?
                                            <img
                                                src={URL.createObjectURL(avataBlob as any || "")} alt="Ảnh đại diện"
                                                style={{ margin: 'auto', width: '100%', maxWidth: 200, objectFit: 'contain' }}
                                            />
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="col-8 rightContent" >
                                        <img src="/images/hccLogo.png" alt="HuongDanTraCuu" id="HuongDanTraCuu" />
                                        <div>
                                            <p className="fullName" style={{ color: 'yellow' }}>{user?.fullName.toLocaleUpperCase() || '...'}</p>
                                            <p className="positionName" style={{ color: '#fff', fontWeight: 400 }}>{user?.positionName || '...'}</p>
                                            <p className="officeName" style={{ color: '#fff', fontWeight: 800 }}>{user?.officeName || '...'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="formKhaoSat">
                                    <div className="titleForm">
                                        <p>Ông/Bà đánh giá như thế nào về thái độ công chức khi hướng dẫn và tiếp nhận giải quyết hồ sơ?</p>
                                    </div>
                                    <div className="checkBoxBlock">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="ratHaiLong"
                                                checked={valueDanhGia === "RẤT HÀI LÒNG"}
                                                onClick={() => setValueDanhGia("RẤT HÀI LÒNG")}
                                            />
                                            <label className="form-check-label" htmlFor="ratHaiLong">
                                                Rất hài lòng
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="haiLong"
                                                checked={valueDanhGia === "HÀI LÒNG"}
                                                onClick={() => setValueDanhGia("HÀI LÒNG")} />
                                            <label className="form-check-label" htmlFor="haiLong">
                                                Hài lòng
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="khongHaiLong"
                                                checked={valueDanhGia === "KHÔNG HÀI LÒNG"}
                                                onClick={() => setValueDanhGia("KHÔNG HÀI LÒNG")} />
                                            <label className="form-check-label" htmlFor="khongHaiLong">
                                                Chưa hài lòng
                                            </label>
                                        </div>
                                    </div>
                                    <div className="button buttonConfirm">
                                        <input type="button" value="GỬI ĐI" onClick={() => submitHandler()} />
                                    </div>
                                    {/* <div className="button buttonXemKetQua">
                                    <input type="button" value="XEM KẾT QUẢ" onClick={() => XemKetQua()} />
                                </div> */}
                                </div>
                            </div>
                            <div className="footer" style={{ margin: '0 50px 30px 50px', backgroundColor: '#ddf0fe', padding: 20, fontWeight: 600, borderRadius: 8 }}>
                                <p style={{ color: '#21669e' }}>Để nâng cao chất lượng phục vụ của các cơ quan hành chính nhà nước tỉnh Thanh Hóa, rất mong quý Ông/Bà dành thời gian đánh giá sự hài lòng về dịch vụ công mà quý Ông/Bà đã hoặc đang thực hiện tại Trung tâm. Sự góp ý của quý Ông/Bà sẽ giúp cho dịch vụ công tỉnh Thanh Hóa ngày càng hoàn thiện hơn.</p>
                                <br />
                                <p style={{ color: 'red' }}>Hướng dẫn đánh giá: Quý Ông/Bà được đánh giá 01 lần sau khi công chức của đơn vị hoàn thành việc tiếp nhận hồ sơ. Ngoài ra ​Quý Ông/Bà có thể đánh giá sự hài lòng hoặc phản ánh, kiến nghị về công chức tiếp nhận tại Website {locationOrigin}.</p>
                                <br /><br />
                                <p style={{ color: '#21669e' }}>Xin chân thành cảm ơn !</p>
                            </div>
                            <div style={{ marginTop: '80vh' }}>
                                <center>
                                    <a className="login_logout"
                                        onClick={async () => logoutHandler()}
                                    >Đăng xuất</a>
                                </center>
                            </div>

                        </>
                        : <><div className="waringTitle " style={{ marginTop: 20 }}>
                            <p>
                                <b>
                                    <center><h2>Vui lòng thực hiện đăng nhập!</h2>
                                        <center>
                                            <a className="login_logout" href="https://dangnhap.thanhhoa.gov.vn/login?service=https://motcua.thanhhoa.gov.vn/ssocas/callback?UrlRedirect=https://motcua.thanhhoa.gov.vn/portaldvc/guest/danh-gia-hai-long-hcc">Đăng nhập</a>
                                        </center>
                                    </center>
                                </b>
                            </p>
                        </div></>}
                </div>
            </Spin >
        </div>
    </>
    )
}
export default DanhGiaHaiLongHccSwapper