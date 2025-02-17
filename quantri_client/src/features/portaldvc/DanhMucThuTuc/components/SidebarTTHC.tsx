import "bootstrap/dist/css/bootstrap.css";
import "./SidebarTTHC.scss";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { DanhMucThuTucPortalService } from "../services/DanhMucThuTucPortal";
import { useDanhMucThuTucPortalContext } from "../context/DanhMucThuTucPortalContext";
import { QUAN_HUYEN, SO_BAN_NGANH, XA_PHUONG } from "./HeaderContainerTTHC";

interface IMenu {
  key: string;
  label: string;
  soLuongThuTucTheoCap?: number;
  children: Array<{
    key: string;
    label: string;
    soLuongTheoNganh?: number;
    children: Array<{
      key: string;
      label: string;
      soLuongThuTuc: number;
    }>;
  }>;
}

export interface IFilterThuTuc {
  tenLinhVuc: string;
  maLinhVuc: string;
  maLinhVucChinh?: string;
  maNganh: string;
  tenNganh: string;
  capThucHien: string;
  soLuongThuTucTheoCap: number;
  soLuongThuTucTheoNganh: number;
  soLuongThuTuc: string;
}

const SidebarDanhMucThuTuc: React.FC = () => {
  const menuCapThucHien = [
    {
      key: "CapTinh",
      label: "Cấp tỉnh",
      children: [],
    },
    {
      key: "CapHuyen",
      label: "Cấp huyện",
      children: [],
    },
    {
      key: "CapXa",
      label: "Cấp xã",
      children: [],
    },
  ];


  const thuTucContext = useDanhMucThuTucPortalContext();
  const thuTucPortalService = new DanhMucThuTucPortalService();
  const [thuTuc, setThuTuc] = useState<IFilterThuTuc[]>([]);
  const [menu, setMenu] = useState<IMenu[]>([]);

  let maLinhVucURL = ''
  let capThucHienURL = ''
  if (thuTucContext.searchParams.has('MaLinhVuc')) {
    maLinhVucURL += thuTucContext.searchParams.get('MaLinhVuc')
  }
  if (thuTucContext.searchParams.has('CapThucHien')) {
    capThucHienURL += thuTucContext.searchParams.get('CapThucHien')
  }

  useEffect(() => {
    (async () => {
      const resThuTuc = await thuTucPortalService.SearchSideBar({
        pageSize: 10000,
      });
      if (resThuTuc?.data?.data) {
        setThuTuc(resThuTuc?.data?.data);
      }
    })();
  }, []);

  useEffect(() => {
    const tmpMenu = menuCapThucHien.map((item1) => {
      const children = [
        ...new Map(
          thuTuc
            .filter((x) => x.capThucHien === item1?.key)
            .map((item) => {
              const linhVucChildren = [
                ...new Map(
                  thuTuc
                    .filter(
                      (x) =>
                        x.maNganh === item.maNganh &&
                        x.capThucHien === item1.key
                    )
                    .map((linhVuc) => [
                      linhVuc.maLinhVuc,
                      {
                        key: linhVuc.maLinhVuc,
                        label: linhVuc.tenLinhVuc,
                        soLuongThuTuc: parseInt(
                          linhVuc.soLuongThuTuc,
                          10
                        ),
                      },
                    ])
                ).values(),
              ];

              const soLuongTheoNganh = linhVucChildren.reduce(
                (total, linhVuc) => total + linhVuc.soLuongThuTuc,
                0
              );

              return [
                item.maNganh,
                {
                  key: item.maNganh,
                  label: item.tenNganh,
                  soLuongTheoNganh: soLuongTheoNganh,
                  children: linhVucChildren,
                },
              ];
            })
        ).values(),
      ];

      const soLuongThuTucTheoCap = children.reduce(
        (total, nganh) => total + nganh.soLuongTheoNganh,
        0
      );

      return {
        ...item1,
        soLuongThuTucTheoCap: soLuongThuTucTheoCap,
        children,
      };
    }) as IMenu[];

    setMenu(tmpMenu);
    document.querySelector('#menuCapTinhBlock')?.classList.add('selected');

  }, [thuTuc]);


  const toggleCacCap = (keyCap: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      const currentSelectedElement = document.getElementById(`menu${keyCap}Block`)

      if (currentSelectedElement?.classList.contains('selected')) {
        currentSelectedElement.classList.remove('selected')
      } else {
        document.querySelectorAll('.menuCacCapBlock').forEach(element => {
          if (element.classList.contains('selected')) {
            element.classList.remove('selected')
          }
        })
        currentSelectedElement?.classList.add('selected');
      }
    }
  }

  const toggleNganh = (keyCap: string, keyNganh: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      const currentSelectedElement = document.getElementById(`${keyCap}-${keyNganh}`)

      if (currentSelectedElement?.classList.contains('selected')) {
        currentSelectedElement.classList.remove('selected')
      } else {
        document.querySelectorAll(`.${keyCap}`).forEach(element => {
          element.classList.remove('selected')
        })
        currentSelectedElement?.classList.add('selected')
      }
    }
  }


  const handlerSearchLinhVuc = (keyCap: string, keyNganh: string, keyLinhVuc: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();

      document.querySelectorAll('.itemLinhVuc').forEach(item => item.classList.remove('actived'))
      document.getElementById(`${keyCap}-${keyLinhVuc}`)?.classList.add('actived')

      thuTucContext.handleUrlQueryStringChange({
        MaLinhVuc: keyLinhVuc,
        CapThucHien: keyCap == 'CapTinh' ? SO_BAN_NGANH : keyCap == 'CapHuyen' ? QUAN_HUYEN : keyCap == 'CapXa' ? XA_PHUONG : '',
        TuKhoa: '',
        MaThuTuc: '',
        MucDo: '',
        DoiTuongThucHien: ''

      })
      thuTucContext.setThuTucId(null)
    }
  }

  return (
    <div className="sidebar">
      {menu.map((itemCap, indexCap) => {
        return (
          <div className="menuCacCapBlock" id={`menu${itemCap?.key}Block`} key={indexCap}>
            <div className="titleCap" id={`${itemCap?.key}`} onClick={toggleCacCap(itemCap.key)}>
              <div className="tenCap">{itemCap.label.toLocaleUpperCase()} ({itemCap.soLuongThuTucTheoCap || 0})</div>
            </div>
            <div className="listNganh" id={`listNganh${itemCap.key}`}>
              {
                itemCap.children.map((itemNganh, indexNganh) => {
                  return (
                    <div className={`${itemCap.key} itemNganh`}
                      id={`${itemCap.key}-${itemNganh.key}`}
                      key={`${indexCap}-${indexNganh}`}
                    >
                      <div className="tenNganh" onClick={toggleNganh(itemCap.key, itemNganh.key)}>{itemNganh.label} ({itemNganh.soLuongTheoNganh || 0})</div>
                      <div className="listItemsLinhVuc">
                        {itemNganh.children.map((itemLinhVuc, indexLinhVuc) => {

                          return (
                            <div className={maLinhVucURL == itemLinhVuc.key && capThucHienURL == itemCap.key ? 'itemLinhVuc actived' : 'itemLinhVuc'}
                              id={`${itemCap.key}-${itemLinhVuc.key}`}
                              key={`${indexCap}-${indexNganh}-${indexLinhVuc}`}
                              onClick={handlerSearchLinhVuc(itemCap.key, itemNganh.key, itemLinhVuc.key)}
                            >
                              <i>{itemLinhVuc.label} ({itemLinhVuc.soLuongThuTuc} thủ tục)</i>
                            </div>
                          )


                        })}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default SidebarDanhMucThuTuc;
