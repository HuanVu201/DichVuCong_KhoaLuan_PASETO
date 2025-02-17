import { Form, Input, Button } from "antd";
import "./SearchKiosk.scss";
import { ReCapChaProps, ReCapChaWrapper } from "@/lib/recapcha";
import { IHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hoSoApi } from "@/features/hoso/services";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import { toast } from "react-toastify";
import { useTraCuuContext } from "@/features/portaldvc/TraCuu/context/TraCuuProvider";
import ContentTraCuuKiosk from "./ContentKiosk";

export const SearchHoSoKiosk = () => {
  const [form] = Form.useForm<ReCapChaProps>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const traCuuContext = useTraCuuContext()
  const { data: user } = useAppSelector(state => state.user)

  useEffect(() => {
    (async () => {
      const maHoSo = traCuuContext.searchParams.get("MaHoSo")
      const soDinhDanh = traCuuContext.searchParams.get("SoDinhDanh")
      const maCaptcha = form.getFieldValue("MaCaptCha")

      if (maHoSo && soDinhDanh && maCaptcha) {
        const res = await hoSoApi.SearchHoSoTraCuu({ MaHoSo: maHoSo.trim(), SoDinhDanh: soDinhDanh.trim(), MaCaptCha: maCaptcha })
        traCuuContext.setHoSo(res.data.data)
      }
    })()
  }, [traCuuContext.searchParams])

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const maHoSo: string = form.getFieldValue("MaHoSo")
    const soDinhDanh: string = form.getFieldValue("SoDinhDanh")

    const token = await executeRecaptcha('searchHoSo');
    if (!maHoSo && soDinhDanh) {
      toast.info("Vui lòng nhập mã hồ sơ")
    }
    else if (maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ")
    } else if (!maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ và mã hồ sơ")
    }
    if (traCuuContext.searchParams.get("MaHoSo") == maHoSo && traCuuContext.searchParams.get("SoDinhDanh") == soDinhDanh && !form.getFieldValue("MaCaptCha")) {
      const res = await hoSoApi.SearchHoSoTraCuu({ MaHoSo: maHoSo.trim(), SoDinhDanh: soDinhDanh.trim(), MaCaptCha: token })
      traCuuContext.setHoSo(res.data.data)
      form.setFieldValue("MaCaptCha", token)
    } else {
      form.setFieldValue("MaCaptCha", token)
      traCuuContext.handleUrlQueryStringChange({ MaHoSo: maHoSo, SoDinhDanh: soDinhDanh })
    }
  }, [executeRecaptcha, traCuuContext.searchParams]);

  useEffect(() => {
    if (user?.soDinhDanh) {
      traCuuContext.handleUrlQueryStringChange({ SoDinhDanh: user.soDinhDanh })
    }
  }, [user])

  useEffect(() => {
    const maHoSo = traCuuContext.searchParams.get("MaHoSo")
    const soDinhDanh = traCuuContext.searchParams.get("SoDinhDanh")
    if (maHoSo) {
      form.setFieldValue("MaHoSo", maHoSo)
    }
    if (soDinhDanh) {
      form.setFieldValue("SoDinhDanh", soDinhDanh)
    }
  }, [traCuuContext.searchParams])

  return (

    <>
      <Form form={form} onFinish={handleReCaptchaVerify}>
        <div className="search-hoso w-100">
          <div className="searchBlock  form-left">
            <div className="tracuu-title">
              <h3 className="text-center">TRA CỨU TIẾN ĐỘ HỒ SƠ QUA WEBSITE</h3>
              <p className="text-center">Nhập thông tin vào cửa sổ tìm kiếm:</p>
            </div>
            <div className="formSerach">
              <AntdSpace direction="horizontal" style={{ justifyContent: "center", display: 'flex' }} >
                <Form.Item name="SoDinhDanh">
                  <Input
                    placeholder="Nhập CCCD/CMND/MST"
                  />
                </Form.Item>
                <Form.Item name="MaHoSo">
                  <Input
                    placeholder="Nhập mã hồ sơ"
                  />
                </Form.Item>
              </AntdSpace>
              <Form.Item name="MaCaptCha" hidden>
              </Form.Item>

            </div>

            <div className="traCuu-footer d-flex justify-content-center align-items-center">
              <Button className="form-control btnTimKiemHoSo" onClick={handleReCaptchaVerify}>Tìm kiếm</Button>
            </div>
          </div>
          <div className="expand ">
            <span>
              * Để biết thông tin về tình hình giải quyết thủ tục hành chính,
              vui lòng nhập số định danh chủ hồ sơ và mã hồ sơ tiếp nhận
            </span>
          </div>
          <div className="whiteBg"></div>
        </div>
      </Form>
      <div className="mt-3">
        <ContentTraCuuKiosk form={form} />
      </div>
    </>
  );
};
