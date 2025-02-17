import React from "react";
import { Button, Space, Layout, Menu, theme } from "antd";

import "./TinTuc.scss";
import { ITinBaiPortal } from "../models/TinBai";
import { Link } from "react-router-dom";
import { TinTucImages } from "./TinTucImages";

function TinTucContainer({ tinBais }: { tinBais?: ITinBaiPortal[] }) {
  return (
    <>
      {tinBais
        ? tinBais.map((item) => {
            return (
              <div className="media row">
                <div className="media-left col-3">
                  <Link to={`/portaldvc/tin-bai/${item.id}`}>
                   <TinTucImages item={item}></TinTucImages>
                  </Link>
                </div>
                <div className="media-body col-9">
                  <h4 className="media-heading">
                    <Link
                      className="media-content"
                      to={`/portaldvc/tin-bai/${item.id}`}
                    >
                      {item.tieuDe.length <= 200
                        ? item.tieuDe
                        : `${item.tieuDe.slice(0, 200)}...`}
                    </Link>
                  </h4>
                  <p className="media-shortContent">
                    {item.trichYeu.length <= 400
                      ? item.trichYeu
                      : `${item.trichYeu.slice(0, 400)}...`}
                  </p>
                </div>
              </div>
            );
          })
        : ""}
      {/* <div className="media row">
        <div className="media-left col-4">
          <a href="#" title="">
            <img
              src="https://dichvucong.thanhhoa.gov.vn/portaldvc/Photos/2023-09/8qA-PZq94kiR6T1M793b65c4cb28211dTAP%20HUAN%20THONG%20TIN-VH.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="media-body col-8">
          <h4 className="media-heading">
            <a className="media-content" href="#">
              UBND huyện Như Thanh, tổ chức hội nghị Tập huấn về Số hóa hồ sơ,
              và kết quả giải quyết thủ tục hành chính, trên hệ thống thông tin
              của tỉnh, cho cán bộ công chức viên chức cấp xã, cấp huyện năm
              2023.
            </a>
          </h4>
          <p className="media-shortContent">
            Ngày 26/8/2023, UBND huyện Như Thanh phối hợp với Trung tâm Phục vụ
            hành chính công tỉnh Thanh Hóa tổ chức hội nghị tập huấn về số hóa
            hồ sơ, kết quả giải quyết thủ tục hành chính trên Hệ thống thông tin
            một cửa điện tử của tỉnh cho cán bộ, công chức UBND cấp xã, cấp
            huyện năm 2023. Tới dự và phát biểu khai mạc lớp tập huấn có đồng
            chí Lê Ngọc Hoa, Ủy viên Ban Thường vụ Huyện ủy, Phó Chủ tịch UBND
            Huyện; các Ông/bà lãnh đạo và thành viên đoàn công tác, Trung tâm
            Phục vụ hành chính công tỉnh Thanh Hóa. Tham dự có Thủ trưởng các cơ
            quan đơn vị, Phó Chủ tịch UBND các xã thị trấn, cán bộ công chức
            viên chức cấp xã, cấp huyện, bộ phận tiếp nhận và trả kết quả giải
            quyết hồ sơ thủ tục hành chính
          </p>
        </div>
      </div> */}
    </>
  );
}

export default TinTucContainer;
