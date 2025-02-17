import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdButton, AntdModal } from "../.."
import { useMemo } from "react";
import { CrudLocalStorage } from "@/services/localstorage";
import { IQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/models";
import { Link, useNavigate } from "react-router-dom";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";

const updateStateInUrl = (param: string, url: string) => {
  let urlObj = new URL(url);
  const href = window.location.origin + window.location.pathname
  const newState = btoa(href)
  if (urlObj.searchParams.has(param)) {
      urlObj.searchParams.set(param, newState);
  } else {
      urlObj.searchParams.append(param, newState);
  }
  return urlObj.toString();
}

export const ZaloQrLayout = ({ visible, typeLogin, handlerCancel }: { handlerCancel: () => void; visible: boolean; typeLogin: string }) => {
  const { publicModule } = useAppSelector(state => state.config)
  const zaloQrModal = useMemo((): { header: string; description: string; show: boolean } => {
    const config = publicModule?.find(x => x.code == "login_zalo_qr_modal")?.content

    return config ? JSON.parse(config) : ""
  }, [publicModule])
  const crudLocalStorage = new CrudLocalStorage();
  let quanlylienkets = crudLocalStorage.getWithExpriry('quanlylienket');
  const dispatch = useAppDispatch()

  const [imageQuanTamZalo, useImageQuanTamZalo, linkQuanTamZalo, useLinkQuanTamZalo, linkDangNhapCongDan, linkDangNhapVNeId] = useMemo(() => {
    let imageQuanTamZalo
    let useImageQuanTamZalo = false
    let linkQuanTamZalo
    let useLinkQuanTamZalo = false
    let linkDangNhapCongDan: string = ''
    let linkDangNhapVNeId: string = ""

    quanlylienkets?.data?.forEach((item: IQuanLyLienKet) => {
      if (item.ma === "image-quan-tam-zalo") {
        imageQuanTamZalo = item.linkLienKet;
        useImageQuanTamZalo = item.suDung
      }
      if (item.ma === "link-quan-tam-zalo") {
        linkQuanTamZalo = item.linkLienKet;
        useLinkQuanTamZalo = item.suDung
      }
      if (item.ma === "dang-nhap-cong-dan") {
        linkDangNhapCongDan = updateStateInUrl("state", item.linkLienKet);
      }
      if (item.ma === "dang-nhap-vneid") {
        linkDangNhapVNeId = updateStateInUrl("state", item.linkLienKet);
      }
    })
    return [imageQuanTamZalo, useImageQuanTamZalo, linkQuanTamZalo, useLinkQuanTamZalo, linkDangNhapCongDan, linkDangNhapVNeId]
  }, [quanlylienkets])



  return <AntdModal visible={visible} title={""} width={600} footer={null} handlerCancel={handlerCancel} bodyStyle={{ padding: "20px 10px" }}>
    <div style={{ textAlign: "center" }} >
      <h6 style={{ fontWeight: 700 }}>{zaloQrModal.header}</h6>
      {linkQuanTamZalo && useLinkQuanTamZalo && useImageQuanTamZalo
        ? <a href={linkQuanTamZalo} className="QR_Information" target="_blank">
          <img src={imageQuanTamZalo} className="qr-quantam text-center" style={{ maxWidth: 110, maxHeight: 110 }} />
        </a>
        : ""}
      <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 16 }}>{zaloQrModal.description}</p>
      <Link to={typeLogin == 'Đăng nhập với DVC Quốc gia' ? linkDangNhapCongDan : linkDangNhapVNeId}
        style={{ padding: "0.8rem 1.15rem", backgroundColor: "#286090", color: "#fff", borderRadius: 5 }}
      >
        {typeLogin}
      </Link>
    </div>
  </AntdModal>
}