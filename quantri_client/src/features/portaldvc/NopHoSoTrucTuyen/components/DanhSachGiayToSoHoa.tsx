import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { useGiayToSoHoaColumn } from "@/features/hoso/hooks/useGiayToSoHoaColumn"
import { AntdButton, AntdModal, AntdSpace, AntdTab, AntdTable, IAntdTabsProps } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useState } from "react"
import { ID_SEPARATE } from "@/data"
import { form } from "@formio/react"
import { FormInstance } from "antd"
import { IHoSo } from "@/features/hoso/models"
import { TaiLieuDienTuDetail } from "@/features/hoso/components/actions/themMoiHoSo/TaiLieuDienTuDetail"
import { CaretDownOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { GetDanhSachKetQuaCanBoRequest, GetDanhSachKetQuaCaNhanRequest, GetDanhSachKetQuaResponse, GetKetQuaByURLRequest, giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { useGiayToSoHoaDVCQGColumn } from "@/features/hoso/hooks/useGiayToSoHoaDVCQGColumn"

export const DanhSachGiayToSoHoaModal = ({ form }: { form: FormInstance<IHoSo> }) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()

    const handleCancel = () => {
        tiepNhanHoSoContext.setDanhSachGiayToSoHoaModalVisible(false)
        tiepNhanHoSoContext.setKhoSoHoaData(undefined)
    }
    
    
    const KhoDVCTab: IAntdTabsProps["items"] = [

        {
            label: "Kho giấy tờ Cổng DVC Quốc gia",
            key: "kho-dvcqg",
            tabKey: '1',
            children: <DanhSachKhoSoHoaDVCQG form={form} handleCancel={handleCancel}/>
        },
        {
            label: "Kho giấy tờ Cổng DVC Tỉnh",
            key: 'kho-tinh',
            tabKey: '2',
            children: <DanhSachKhoSoHoaTinh form={form} handleCancel={handleCancel}/>
        },
    ];
    return <>
        <AntdModal title="Chọn giấy tờ số hóa" visible={true} handlerCancel={handleCancel} footer={null} width={1500}>
            <>
                <AntdTab
                    size="small"
                    type="line"
                    items={KhoDVCTab}
                    moreIcon={<CaretDownOutlined />}
                    defaultValue={2}
                    defaultActiveKey="kho-tinh"
                />
            </>
        </AntdModal>
    </>

}

const DanhSachKhoSoHoaTinh = ({ form, handleCancel }: { form: FormInstance<IHoSo>; handleCancel: () => void}) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const { datas: giayToSoHoas, count } = useAppSelector(state => state.giaytosohoa)
    const [selectedGiayToSoHoas, setSelectedGiayToSoHoas] = useState<string[]>([])
    const onOk = () => {
        if(giayToSoHoas === undefined){
            toast.info("Không có giấy tờ số hóa")
            return;
        }
        if(!selectedGiayToSoHoas.length){
            toast.info("Vui lòng chọn giấy tờ số hóa")
            return;
        }
        if (giayToSoHoas) {
            const dinhKems = giayToSoHoas.filter(giayTo => selectedGiayToSoHoas.includes(giayTo.id)).map(x => x.dinhKem).join(ID_SEPARATE)
            tiepNhanHoSoContext.khoSoHoaData?.onOk(dinhKems, "")
            handleCancel()
        }
    }
    const [taiLieuDienTuId, setTaiLieuDienTuId] = useState<string>()
    const [visibleTaiLieuDienTu, setViSibleTaiLieuDienTu] = useState(false)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 10, reFetch: true, maDinhDanh: form.getFieldValue("soGiayToChuHoSo") })
    const columns = useGiayToSoHoaColumn({
        setTaiLieuDienTuModalVisible: (id) => {
            setTaiLieuDienTuId(id)
            setViSibleTaiLieuDienTu(true)
        }
    })
    
    const rowSelection = useMemo(() => ({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedGiayToSoHoas(selectedRowKeys.map(x => x as string))
        },
    }), [])
    return <>
        {searchParams.maDinhDanh ?
          <AntdTable
          columns={columns}
          dataSource={giayToSoHoas}
          pagination={{
              total: count
          }}
          rowSelection={{
              ...rowSelection,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchGiayToSoHoa(params))}
        />
        : null}
        <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"end"}}> 
            <AntdButton key={1} onClick={handleCancel}> Đóng </AntdButton>
            <AntdButton key={2} onClick={onOk} type="primary"> Xác nhận </AntdButton>
        </AntdSpace>
    {visibleTaiLieuDienTu ? <TaiLieuDienTuDetail setId={setTaiLieuDienTuId} id={taiLieuDienTuId} visibleModal={visibleTaiLieuDienTu} setVisibleModal={setViSibleTaiLieuDienTu} /> : null}

    </>
}

const DanhSachKhoSoHoaDVCQG = ({ form, handleCancel}: { form: FormInstance<IHoSo>; handleCancel: () => void}) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const [giayToSoHoaDVC, setGiayToSoHoaDVC] = useState<GetDanhSachKetQuaResponse[]>()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 10, reFetch: true, maDinhDanh: form.getFieldValue("soGiayToChuHoSo") })
    const [selectedGiayToSoHoas, setSelectedGiayToSoHoas] = useState<string[]>([])
    const columns = useGiayToSoHoaDVCQGColumn({})
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        (async () => {
            const body : GetDanhSachKetQuaCaNhanRequest = {
                MaThuTuc: form.getFieldValue("maTTHC"),
                DanhSachDanhMucKetQua: [{
                    MaKetQua: form.getFieldValue("currentSelectedMaKetQuaTPTT"),
                    SoKyHieu:""
                }],
            }
            setLoading(true)
            const res = await giayToSoHoaApi.DanhSachGiayToKhoQuocGiaCaNhan(body)
            setLoading(false)
            setGiayToSoHoaDVC(res.data.data)
        })()
    }, [])
    const rowSelection = useMemo(() => ({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedGiayToSoHoas(selectedRowKeys.map(x => x as string))
        },
    }), [])
    const onOk = async () => {
        if(giayToSoHoaDVC === undefined){
            toast.info("Không có giấy tờ số hóa")
            return;
        }
        if(!selectedGiayToSoHoas.length){
            toast.info("Vui lòng chọn giấy tờ số hóa")
            return;
        }
        if (giayToSoHoaDVC) {
            const thanhPhan = giayToSoHoaDVC.find(x => selectedGiayToSoHoas.includes(x.soKyHieu))
            if(thanhPhan){
                const reqBody : GetKetQuaByURLRequest= {
                    CoQuanChuQuan: thanhPhan.coQuanChuQuan,
                    DanhSachTepDinhKem : thanhPhan.danhSachTepDinhKem
                }
                const res = await giayToSoHoaApi.GiayToKhoQuocGia(reqBody)
                if(res.data.data){
                    tiepNhanHoSoContext.khoSoHoaData?.onOk(res.data.data.join(ID_SEPARATE), thanhPhan.maKetQua)
                    handleCancel()   
                }
            }
        }
    }
    return <>
      <AntdTable
      loading={loading}
      columns={columns as any}
      rowKey={"soKyHieu"}
      dataSource={giayToSoHoaDVC as any}
      pagination={{
          total: giayToSoHoaDVC?.length
      }}
      rowSelection={{
          type: "radio",
          ...rowSelection,
      }}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      onSearch={(params) => {}}
    />
    <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"end"}}> 
        <AntdButton key={1} onClick={handleCancel}> Đóng </AntdButton>
        <AntdButton key={2} onClick={onOk} type="primary"> Xác nhận </AntdButton>
    </AntdSpace>
</>
}

export default DanhSachGiayToSoHoaModal