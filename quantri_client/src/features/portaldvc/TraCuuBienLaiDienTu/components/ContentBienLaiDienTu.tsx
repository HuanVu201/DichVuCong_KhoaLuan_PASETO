import {
  FORMAT_DATE,
  FORMAT_DATE_WITHOUT_TIME,
  FORMAT_DATE_WITHOUT_DATE,
} from "@/data";
import { useTraCuuBienLaiDienTuContext } from "../context/TraCuuBienLaiDienTuProvider";
import "./Content.scss";
import dayjs from "dayjs";
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchQuaTrinhXuLyHoSo } from "@/features/quatrinhxulyhoso/redux/action";
import { AntdButton } from "@/lib/antd/components";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormInstance } from "antd";
import { ReCapChaProps } from "@/lib/recapcha";
import { IBienLaiDienTuPortal } from "../model";
import { getCurrency } from "@/utils";
import { AuditOutlined, EyeOutlined } from "@ant-design/icons";
import { BienLaiDienTuPortalDetail } from "./BienLaiDienTuPortalDetail";
function ContentTraCuuBienLaiDienTuPortal({
  form,
}: {
  form: FormInstance<ReCapChaProps>;
}) {
  const traCuuBienLaiDienTuContext = useTraCuuBienLaiDienTuContext();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const dispatch = useAppDispatch();
  const { datas: quaTrinhXuLyHoSos } = useAppSelector(
    (state) => state.quatrinhxulyhoso
  );

  const onShowDetailHoSo = async (maHoSo: string) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("searchHoSo");
    form.setFieldValue("MaCaptCha", token);
    traCuuBienLaiDienTuContext.handleUrlQueryStringChange({ MaHoSo: maHoSo });
  };

  if (traCuuBienLaiDienTuContext.bienLai) {
    const bienLai: any = traCuuBienLaiDienTuContext.bienLai;
    const typeBienLai = bienLai[0].loaiBienLaiThanhToan
    return (
      <div className="contentTraCuu" key={"2"}>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="thongTinHoSo componentBlock">
              <div className="title">THÔNG TIN HỒ SƠ</div>
              <div className="panel-body">
                <table className="table table-hover">
                  <tbody>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Mã hồ sơ</td>
                      <td className="col-8 dataTable">{bienLai[0].maHoSo}</td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Chủ hồ sơ</td>
                      <td className="col-8 dataTable">{bienLai[0]?.chuHoSo}</td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">
                        Số CCCD/<br></br>Hộ chiếu
                      </td>
                      <td className="col-8 dataTable">
                        {bienLai[0]?.soGiayToChuHoSo}
                      </td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Địa chỉ</td>
                      <td className="col-8 dataTable">
                        {bienLai[0]?.diaChiChuHoSo}
                      </td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Tên thủ tục</td>
                      <td className="col-8 dataTable">
                        {bienLai[0]?.trichYeuHoSo}
                      </td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Ngày tiếp nhận</td>
                      <td className="col-8 dataTable">
                        {bienLai[0]?.ngayTiepNhan
                          ? dayjs(bienLai[0]?.ngayTiepNhan).format(
                            FORMAT_DATE_WITHOUT_TIME
                          )
                          : ""}
                      </td>
                    </tr>
                    <tr className="row-data">
                      <td className="col-4 titleTable">Ngày hẹn trả</td>
                      <td className="col-8 dataTable">
                        {bienLai[0]?.ngayHenTra
                          ? dayjs(bienLai[0]?.ngayHenTra).format(
                            FORMAT_DATE_WITHOUT_TIME
                          )
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="tinhTrangHoSo componentBlock">
              <div className="title">DANH SÁCH YÊU CẦU THU PHÍ, LỆ PHÍ</div>
              <div className="panel-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="titleTable">STT</th>
                      <th className="titleTable">Người yêu cầu</th>
                      <th className="titleTable">Đơn vị</th>
                      <th className="titleTable">Phí, lệ phí (VNĐ)</th>
                      <th className="titleTable">Ngày thu</th>
                      <th className="titleTable">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bienLai?.map((item: any, index: number) => (
                      <>
                        <tr key={index}>
                          <td className="dataTable">{index + 1}</td>
                          <td className="dataTable">{item.tenNguoiYeuCau}</td>
                          <td className="dataTable">{item.tenDonVi}</td>
                          <td className="dataTable">
                            <div>
                              <div style={{ fontWeight: "500" }}>
                                {" "}
                                - Phí: {getCurrency(item.phi ?? "0")} VNĐ
                              </div>
                              <div style={{ fontWeight: "500" }}>
                                {" "}
                                - Lệ phí: {getCurrency(item.lePhi ?? "0")} VNĐ
                              </div>
                            </div>
                          </td>
                          <td className="dataTable">
                            {item.ngayThuPhi
                              ? dayjs(item.ngayThuPhi).format(
                                FORMAT_DATE_WITHOUT_TIME
                              )
                              : ""}{" "}
                            <br></br>
                            {item.ngayThuPhi
                              ? dayjs(item.ngayThuPhi).format(
                                FORMAT_DATE_WITHOUT_DATE
                              )
                              : ""}
                          </td>
                          <td
                            className="dataTable"
                            style={{ textAlign: "left" }}
                          >
                            {typeBienLai == 'local'
                              ?
                              <AuditOutlined
                                title="Xem chi tiết biên lai phí, lệ phí"
                                style={{ margin: "0 3px" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  traCuuBienLaiDienTuContext.setViewBienLaiThanhToanVisible(
                                    true
                                  );
                                  traCuuBienLaiDienTuContext.setGetBienLaiParams({
                                    idYeuCauThanhToan: item.id,
                                    loaiPhi: "phiLephi",
                                  });
                                }}
                              />
                              :
                              <>
                                <AuditOutlined
                                  title="Xem chi tiết biên lai phí"
                                  style={{ margin: "0 3px" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    traCuuBienLaiDienTuContext.setViewBienLaiThanhToanVisible(
                                      true
                                    );
                                    traCuuBienLaiDienTuContext.setGetBienLaiParams({
                                      idYeuCauThanhToan: item.id,
                                      loaiPhi: "phi",
                                    });
                                  }}
                                />
                                <AuditOutlined
                                  title="Xem chi tiết biên lai lệ phí"
                                  style={{ margin: "0 3px" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    traCuuBienLaiDienTuContext.setViewBienLaiThanhToanVisible(
                                      true
                                    );
                                    traCuuBienLaiDienTuContext.setGetBienLaiParams({
                                      idYeuCauThanhToan: item.id,
                                      loaiPhi: "lephi",
                                    });
                                  }}
                                />
                              </>
                            }


                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {traCuuBienLaiDienTuContext.viewBienLaiThanhToanVisible ? (
          <BienLaiDienTuPortalDetail />
        ) : null}
      </div>
    );
  } else if (traCuuBienLaiDienTuContext.bienLai === null) {
    return <>Không có hồ sơ nào được tìm thấy!</>;
  }
}

export default ContentTraCuuBienLaiDienTuPortal;
