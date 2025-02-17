import { Form, Input, Button } from "antd";
import "./Search.scss";
import { ISearchHoSoPortal } from "../../TraCuu/models/HosoPortal";
import { ReCapChaProps, ReCapChaWrapper } from "@/lib/recapcha";
import { IHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTraCuuBienLaiDienTuContext } from "../context/TraCuuBienLaiDienTuProvider";
import { BienLaiDienTuPortalApi } from "../service";
import ContentTraCuuBienLaiDienTuPortal from "./ContentBienLaiDienTu";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import { toast } from "react-toastify";

export const SearchBienLaiDienTuPortal = () => {
  const [form] = Form.useForm<ReCapChaProps>();
  const traCuuBienLaiDienTuContext = useTraCuuBienLaiDienTuContext()
  const { data: user } = useAppSelector(state => state.user)

  useEffect(() => {
    (async () => {
      const maHoSo = traCuuBienLaiDienTuContext.searchParams.get("MaHoSo")
      const soDinhDanh = traCuuBienLaiDienTuContext.searchParams.get("SoDinhDanh")
      if (maHoSo && soDinhDanh) {
        const res = await BienLaiDienTuPortalApi.SearchBienLai({ MaHoSo: maHoSo.trim(), SoGiayToChuHoSo: soDinhDanh.trim() })
        traCuuBienLaiDienTuContext.setBienLai(res.data.data)
      }
    })()
  }, [traCuuBienLaiDienTuContext.searchParams])

  const onFinish = async () => {
   
    const maHoSo: string = form.getFieldValue("MaHoSo")
    const soDinhDanh: string = form.getFieldValue("SoDinhDanh")

    if (!maHoSo && soDinhDanh) {
      toast.info("Vui lòng nhập mã hồ sơ")
    }
    else if (maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ")
    } else if (!maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ và mã hồ sơ")
    }


    if (traCuuBienLaiDienTuContext.searchParams.get("MaHoSo") == maHoSo && traCuuBienLaiDienTuContext.searchParams.get("SoDinhDanh") == soDinhDanh) {
      const res = await BienLaiDienTuPortalApi.SearchBienLai({ MaHoSo: maHoSo.trim(), SoGiayToChuHoSo: soDinhDanh.trim()})
      traCuuBienLaiDienTuContext.setBienLai(res.data.data)
      
    } else {
      
      traCuuBienLaiDienTuContext.handleUrlQueryStringChange({ MaHoSo: maHoSo, SoDinhDanh: soDinhDanh })
    }
  };
  
  useEffect(() => {
    if (user?.soDinhDanh) {
      traCuuBienLaiDienTuContext.handleUrlQueryStringChange({ SoDinhDanh: user.soDinhDanh })
    }
  }, [user])

  
  useEffect(() => {
    const maHoSo = traCuuBienLaiDienTuContext.searchParams.get("MaHoSo")
    const soDinhDanh = traCuuBienLaiDienTuContext.searchParams.get("SoDinhDanh")
    if (maHoSo) {
      form.setFieldValue("MaHoSo", maHoSo)
    }
    if (soDinhDanh) {
      form.setFieldValue("SoDinhDanh", soDinhDanh)
    }
  }, [traCuuBienLaiDienTuContext.searchParams])

  return (

    <>
      <Form form={form} onFinish={onFinish}>
        <div className="search-bienlai w-100">
          <div className="searchBlock  form-left">
            <div className="tracuu-title">
              <h3 className="text-center">TRA CỨU BIÊN LAI ĐIỆN TỬ</h3>
              <p className="text-center">Nhập thông tin vào cửa sổ tìm kiếm:</p>
            </div>
            <div className="formSerach">
              <AntdSpace direction="horizontal" style={{ justifyContent: "center", display: 'flex' }} >
                <Form.Item name="MaHoSo">
                  <Input
                    placeholder="Nhập mã hồ sơ"
                  />
                </Form.Item>
                <Form.Item name="SoDinhDanh">
                  <Input
                    placeholder="Nhập CCCD/CMND/MST"
                  />
                </Form.Item>
              </AntdSpace>
              <Form.Item name="MaCaptCha" hidden>
              </Form.Item>

            </div>

            <div className="traCuu-footer d-flex justify-content-center align-items-center">
              <Button className="form-control btnTimKiemHoSo" onClick={onFinish}>Tra cứu</Button>
            </div>
          </div>
          <div className="expand ">
            <span>
              * Để biết thông tin về biên lai điện tử,
              vui lòng nhập mã hồ sơ tiếp nhận và số định danh chủ hồ sơ.
            </span>
          </div>
          <div className="whiteBg"></div>
        </div>
      </Form>
      <div className="mt-3">
        <ContentTraCuuBienLaiDienTuPortal form={form} />
      </div>
    </>
  );
};
