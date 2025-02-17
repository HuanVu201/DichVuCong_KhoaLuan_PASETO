import { Form, Input, Button, Spin } from "antd";
import "./Search.scss";
import { ISearchHoSoPortal } from "../models/HosoPortal";
import { ReCapChaProps, ReCapChaWrapper } from "@/lib/recapcha";
import { IHoSo } from "@/features/hoso/models";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTraCuuContext } from "../context/TraCuuProvider";
import { hoSoApi } from "@/features/hoso/services";
import ContentTraCuuPortal from "./Content";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

export const SearchHoSoPortal = () => {
  const [form] = Form.useForm<ReCapChaProps>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const traCuuContext = useTraCuuContext()
  const { data: user } = useAppSelector(state => state.user)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const maHoSo = traCuuContext.searchParams.get("MHS")
      const soDinhDanh = traCuuContext.searchParams.get("SGT")
      const maCaptcha = form.getFieldValue("MaCaptCha")

      if (maHoSo && soDinhDanh && maCaptcha) {
        const res = await hoSoApi.SearchHoSoTraCuu({ MaHoSo: maHoSo.trim(), SoDinhDanh: soDinhDanh.trim(), MaCaptCha: maCaptcha })
        setLoading(true)

        if (res.data.failed) {
          toast.error(res.data.message)
        }
        traCuuContext.setHoSo(res.data.data)

      }
      setLoading(false)
    })()
  }, [traCuuContext.searchParams])

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      toast.error("Mã Recaptcha không tồn tại!")
      console.log('Execute recaptcha not yet available');
      return;
    }
    const maHoSo: string = form.getFieldValue("MHS")
    const soDinhDanh: string = form.getFieldValue("SGT")

    const token = await executeRecaptcha('searchHoSo');
    if (!maHoSo && soDinhDanh) {
      toast.info("Vui lòng nhập mã hồ sơ")
    }
    else if (maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ hoặc người được ủy quyền")
    } else if (!maHoSo && !soDinhDanh) {
      toast.info("Vui lòng nhập số định danh chủ hồ sơ và mã hồ sơ")
    }
    if (traCuuContext.searchParams.get("MHS") == maHoSo && traCuuContext.searchParams.get("SGT") == soDinhDanh && !form.getFieldValue("MaCaptCha")) {
      const res = await hoSoApi.SearchHoSoTraCuu({ MaHoSo: maHoSo.trim(), SoDinhDanh: soDinhDanh.trim(), MaCaptCha: token })
      setLoading(true)

      traCuuContext.setHoSo(res.data.data)
      if (res.data.failed) {
        toast.error(res.data.message)
      }

      form.setFieldValue("MaCaptCha", token)
    } else {
      form.setFieldValue("MaCaptCha", token)
      traCuuContext.handleUrlQueryStringChange({ MHS: maHoSo, SGT: soDinhDanh })
    }
    setLoading(false)

  }, [executeRecaptcha, traCuuContext.searchParams]);

  useEffect(() => {
    if (user?.soDinhDanh) {
      traCuuContext.handleUrlQueryStringChange({ SGT: user.soDinhDanh })
    }
  }, [user])

  useEffect(() => {
    const maHoSo = traCuuContext.searchParams.get("MHS")
    const soDinhDanh = traCuuContext.searchParams.get("SGT")
    if (maHoSo) {
      form.setFieldValue("MHS", maHoSo)
    }
    if (soDinhDanh) {
      form.setFieldValue("SGT", soDinhDanh)
    }
  }, [traCuuContext.searchParams])

  return (

    <Spin spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
    >
      <Form form={form} onFinish={handleReCaptchaVerify}>
        <div className="search-hoso w-100">
          <div className="searchBlock  form-left">
            <div className="tracuu-title">
              <h3 className="text-center">TRA CỨU TIẾN ĐỘ HỒ SƠ</h3>
              <p className="text-center">Nhập thông tin vào cửa sổ tìm kiếm:</p>
            </div>
            <div className="formSerach">
              <AntdSpace direction="horizontal" style={{ justifyContent: "center", display: 'flex' }} >
                <Form.Item name="MHS">
                  <Input
                    placeholder="Nhập mã hồ sơ"
                  />
                </Form.Item>
                <Form.Item name="SGT">
                  <Input
                    placeholder="Nhập số CC/HC/MST"
                  />
                </Form.Item>
              </AntdSpace>
              <Form.Item name="MaCaptCha" hidden>
              </Form.Item>

            </div>

            <div className="traCuu-footer d-flex justify-content-center align-items-center">
              <Button className="form-control btnTimKiemHoSo" onClick={handleReCaptchaVerify}>Tra cứu</Button>
            </div>
          </div>
          <div className="expand ">
            <span>
              * Để biết thông tin về tình hình giải quyết thủ tục hành chính,
              vui lòng nhập mã hồ sơ tiếp nhận và số định danh chủ hồ sơ.
            </span>
          </div>
          <div className="whiteBg"></div>
        </div>
      </Form>
      <div className="mt-3">
        <ContentTraCuuPortal form={form} />
      </div>
    </Spin>

  );
};
