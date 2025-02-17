import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Pagination, Spin } from "antd";
import { IThuTuc } from "@/features/thutuc/models";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "@/services";
import { useDvcTrucTuyenPortalContext } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";
import { CardThuTucSmartKiosk } from "./CardThuTucSmartKiosk";

export const DanhSachThuTucsSmartKiosk = () => {
  const {
    datas: thuTucs,
    count,
    loading: loadingThuTucs,
    pageSize,
    currentPages,
  } = useAppSelector((state) => state.thutuc);
  const dichVuCongTrucTuyenContext = useDvcTrucTuyenPortalContext();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <Spin spinning={loadingThuTucs}>
        {count && count > 0 ? (
          <div>
            {/* <h3>Dịch vụ công trực tuyến của Sở Nội vụ</h3> */}
            {thuTucs?.map((thuTuc, index) => (
              <CardThuTucSmartKiosk thuTuc={thuTuc} key={index} />
            ))}
            <div className="d-flex justify-content-center align-items-center">
              <Pagination
                current={currentPages}
                pageSize={pageSize || 50}
                total={count}
                onChange={(page, pageSize) => {
                  dichVuCongTrucTuyenContext.handleUrlQueryStringChange(
                    { pageSize: `${pageSize || 50}`, pageNumber: `${page || 1}` },
                    { replace: true }
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div>Không có thủ tục</div>
        )}
      </Spin>
    </div>
  );
};
