import { useMemo, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { HoSoTheoDonViProvider } from "../contexts/HoSoTheoDonViContext";
import {
  HoSoTableActions,
  useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined, LoadingOutlined, RollbackOutlined } from "@ant-design/icons";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { setMaHoSoTheoDonViQuery } from "@/features/hoso/redux/slice";
import { DatLaiQuyTrinhXuLyModal } from "@/features/hoso/components/actions/datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import { Col, Form, Spin } from "antd";
import { filterOptions } from "@/utils";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { HoSoTheoDonViSearch } from "./HoSoTheoDonViSearch";
import { IUserRole } from "@/features/user/models";
import { userService } from "@/features/user/services";

const HoSoTheoDonViTable = () => {
  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: hoSos, count, maHoSo, loading: loadingHoSos } = useAppSelector((state) => state.hoso);
  const { btnElememts } = useButtonActions({
    maScreen: screenType["ho-so-theo-don-vi"],
  });
  const [userRoles, setUserRoles] = useState<IUserRole[]>([]);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [enableFilterDonVi, setEnableFilterDonVi] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    notInMaTrangThais : ['1','3'],
    coNgayTiepNhan : true,
    searchAllType : true
    // groupCode: user?.officeCode,
    // donViQuanLy: '000-00-23-H56',

  });

  useEffect(() => {
    if (auth) {
      (async () => {
        let getRoles = await userService.GetUserRoles(user?.id as any);
        if (getRoles?.data && getRoles?.data?.length > 0) {
          setUserRoles(getRoles.data)
          getRoles?.data.map((item: IUserRole) => {
            if ((item.roleName == 'Tra cứu hồ sơ toàn đơn vị' && item.enabled) || (item.roleName == 'Quản trị hệ thống' && item.enabled)) {
              setEnableFilterDonVi(false)
              // setSearchParams((curr) => ({ ...curr, donViQuanLy: user?.officeCode }))
            }
          });
        }
      })()
    }
  }, [auth]);

  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );
  const { columns } = useHoSoColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items,
    'ho-so-theo-don-vi'
  );

  useEffect(() => {
    if (maHoSo)
      setSearchParams((cur) => ({ ...cur, searchKeys: maHoSo || "" }));
    // return() => {
    //   dispatch(setMaHoSoTheoDonViQuery(undefined))
    // }
  }, [maHoSo]);
  useEffect(() => {
    return () => {
      dispatch(setMaHoSoTheoDonViQuery(undefined));
    };
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  };
  const [loading, setLoading] = useState<boolean>(false)
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])

  return (
    <LazyActions setSearchParams={setSearchParams}>
      <Spin spinning={loading || loadingHoSos}
        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
      >
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          {btnElememts}
          <HoSoTheoDonViSearch
            enableFilterDonVi={enableFilterDonVi}
            setSearchParams={setSearchParams}
            defaultVisible={true}
            defaultFormValue={{ searchKeys: maHoSo }}
            extraElement={(form) => (<>
              <Col span={24}>
                <Form.Item label="Đơn vị" name="groupCode2">
                  <AntdSelect
                    disabled={enableFilterDonVi}
                    defaultValue={user?.officeName}
                    generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                    onClick={() => {
                      if (donVis?.length == 0) {
                        (async () => {
                          setLoading(true)
                          const res = await dispatch(SearchCoCauToChuc({ pageSize: 1500, groupCode: user?.officeCode, getAllChildren: true, type: 'don-vi' })).unwrap()

                          if (res) {
                            var tmp = [{ groupCode: '', groupName: "Tất cả" }] as ICoCauToChuc[];
                            setDonVis([...tmp, ...res.data]);
                          } else {
                            toast.error("Lỗi lấy thông tin cơ cấu tổ chức!")
                          }
                          setLoading(false)
                        })()
                      }
                    }}
                  />
                </Form.Item>
              </Col>

            </>)}
          />
          {userRoles.length > 0 ?
            <AntdTable
              columns={columns}
              dataSource={hoSos}
              pagination={{
                total: count,
              }}
              rowSelection={rowSelection}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) => dispatch(SearchHoSo({ ...params, donViQuanLy: enableFilterDonVi == false ? user?.officeCode : undefined, groupCode: enableFilterDonVi == false ? undefined : user?.officeCode }))}
            /> : null
          }
        </AntdSpace>
        {buttonActionContext.datLaiQuyTrinhXuLyModalVisible ? (
          <DatLaiQuyTrinhXuLyModal
            refreshTable={() => dispatch(SearchHoSo(searchParams))}
          />
        ) : null}
      </Spin>

    </LazyActions>
  );
};
const HoSoTableWrapper = () => (
  <HoSoTheoDonViProvider>
    <ButtonActionProvider>
      <HoSoTheoDonViTable />
    </ButtonActionProvider>
  </HoSoTheoDonViProvider>
);
export default HoSoTableWrapper;
