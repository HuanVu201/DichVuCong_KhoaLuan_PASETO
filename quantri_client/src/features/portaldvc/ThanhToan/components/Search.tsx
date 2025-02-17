import { Form, Input, Button } from "antd";
import "./Search.scss";
import { ISearchHoSoPortal } from "../models/HosoPortal";
import { useEffect, useState } from "react";
import {
  ISearchYeuCauThanhToan,
  IYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/models";
import { UseThanhToanContext } from "../context/UseThanhToanContext";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchYeuCauThanhToanPortal } from "../redux/action";
import { GetHoSo, GetHoSoByMa } from "@/features/hoso/redux/action";
import { toast } from "react-toastify";
import { IBaseExt } from "@/models";
import { IAction } from "@/features/action/models";
import { Rule } from "antd/es/form";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { AntdButton } from "@/lib/antd/components";

const INPUT_RULES = {
  SearchValue: [{ required: true, message: "Không được để trống!" }],
};
export const SearchHoSoPortal = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ISearchYeuCauThanhToan>();
  const thanhToanContext = UseThanhToanContext();
  const handleSearch = async (maHoSo: string) => {
    if (maHoSo) {
      var searchYeuCauThanhToanParams = {
        pageNumber: 1,
        pageSize: 10,
        trangThai: "Chờ thanh toán",
        maHoSo: maHoSo,
      };
      var yeuCauThanhToan = await dispatch(
        SearchYeuCauThanhToanPortal(searchYeuCauThanhToanParams)
      ).unwrap();
      if (!yeuCauThanhToan.data)
        toast.warning("Không có thông tin yêu cầu thanh toán hoặc Hồ sơ của Ông/bà đã được thu hồi, hệ thống đã huỷ yêu cầu thanh toán");

    } else {
      toast.error("Vui lòng nhập mã hồ sơ!");
    }
  };
  useEffect(() => {
    (async () => {
      var maHoSo = searchParams.get("maHoSo");

      if (maHoSo) {
        form.setFieldValue("maHoSo", maHoSo);
        var searchYeuCauThanhToanParams = {
          pageNumber: 1,
          pageSize: 10,
          trangThai: "Chờ thanh toán",
          maHoSo: maHoSo,
        };
        var yeuCauThanhToan = await dispatch(
          SearchYeuCauThanhToanPortal(searchYeuCauThanhToanParams)
        ).unwrap();
        if (!yeuCauThanhToan.data)
          toast.warning("Không có thông tin yêu cầu thanh toán hoặc Hồ sơ của Ông/bà đã được thu hồi, hệ thống đã huỷ yêu cầu thanh toán");

      }
    })();
  }, [searchParams]);
  const onFinish = (values: ISearchYeuCauThanhToan) => {
    if (values.maHoSo) {
      setSearchParams({ maHoSo: values.maHoSo });
    }
  };
  return (
    <>
      <Form form={form} name="FilterYeuCauThanhToan" onFinish={onFinish}>
        <div className="search-hoso w-100">
          <div className="searchBlock form-left">
            <div className="thanhToan-title">
              <h3 className="text-center">
                THANH TOÁN TRỰC TUYẾN PHÍ - LỆ PHÍ
              </h3>
              <p className="text-center">Ông bà nhập mã hồ sơ cần thanh toán:</p>
            </div>
            <div className="formSerach">
              <Form.Item name="maHoSo" rules={INPUT_RULES["SearchValue"]}>
                <Input placeholder="Nhập mã hồ sơ" id="inputValue" />
              </Form.Item>
              {/* <div id="statusLog" style={{color: 'red'}}>Vui lòng nhập mã hồ sơ: </div> */}
            </div>
            <div className="thanhToan-footer d-flex justify-content-center align-items-center">
              <Button htmlType="submit" className="form-control btnTimKiemHoSo">
                Thực hiện
              </Button>
            </div>
          </div>
          <div className="expand ">
            <span>
              * Để biết thông tin về yêu cầu thanh toán thủ tục hành chính, vui
              lòng nhập mã hồ sơ tiếp nhận
            </span>
          </div>
          <div className="whiteBg"></div>
        </div>
      </Form>
    </>
  );
};
