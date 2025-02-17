import "./Navbar.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  HEADER_MENU,
  SIDER_MENU_ADMIN,
  SIDER_MENU_DVC,
} from "../../../../../data";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuProps } from "antd/es/menu";
import { Service } from "@/services";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchMenuPortal } from "../Redux/action";
import { IMenuPortal } from "../Models/KenhTin";
import { CaretDownOutlined, HomeOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { it } from "node:test";
import Item from "antd/es/list/Item";
import { FontSize } from "@ckeditor/ckeditor5-font";
import { keys } from "highcharts";

const { primaryRoutes } = Service;

interface IAntdLayoutProps {
  children: React.ReactElement;
  menuTheme?: MenuProps["theme"];
}

const SIDER_MENU = {
  [primaryRoutes.admin.root.replace(/\//g, "")]: SIDER_MENU_ADMIN,
  [primaryRoutes.dvc.root.replace(/\//g, "")]: SIDER_MENU_DVC,
};
const LOAIKENHTIN = {
  TRANG_WIKI: "Trang Wiki",
  DANH_SACH_TIN_BAI: "Danh sách tin bài",
  LIEN_KET_NGOAI: "Liên kết ngoài",
  DANH_SACH_KENH_CON: "Danh sách kênh con",
};
const convertKenhTinToMenu = (
  kenhTins: IMenuPortal[],
  parentId: string
): MenuProps["items"] => {
  const tmp = kenhTins
    .filter((x) => {
      if (parentId) {
        return x.maKenhTinCha == parentId;
      }
      return !x.maKenhTinCha;
    })
    .map((item) => {
      if (item.tenNoiDung == LOAIKENHTIN.LIEN_KET_NGOAI) {
        return {
          label: (
            <Link rel="noopener noreferrer" to={item.lienKetNgoai || "#"}>
              {item.tenKenhTin}
            </Link>
          ),
          key: item.id,
          // children: convertKenhTinToMenu(kenhTins, item.id),
        };
      } else if (item.tenNoiDung == LOAIKENHTIN.TRANG_WIKI) {
        return {
          label: (
            <Link to={`/portaldvc/trang-tin/${item.id}`}>
              {item.tenKenhTin}
            </Link>
          ),
          key: item.id,
          // children: convertKenhTinToMenu(kenhTins, item.id),
        };
      } else if (item.tenNoiDung == LOAIKENHTIN.DANH_SACH_TIN_BAI) {
        return {
          label: <Link to={`/portaldvc/tin-tuc`}>{item.tenKenhTin}</Link>,
          key: item.id,
          // children: convertKenhTinToMenu(kenhTins, item.id),
        };
      } else if (item.tenNoiDung == LOAIKENHTIN.DANH_SACH_KENH_CON) {
        return {
          label: <span>{item.tenKenhTin}</span>,
          key: item.id,
          children: convertKenhTinToMenu(kenhTins, item.id),
        };
      }

    });
  return tmp as MenuProps["items"];
};

const NavbarLayout = ({ setSelectedMenuItem }: { setSelectedMenuItem: React.Dispatch<React.SetStateAction<IMenuPortal | null>> }) => {
  const dispatch = useAppDispatch();
  const { datas } = useAppSelector((state) => state.portalmenu);
  const location = useLocation();

  const [menu, setMenu] = useState<MenuProps["items"]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);


  useEffect(() => {
    dispatch(SearchMenuPortal({ pageNumber: 1, pageSize: 20 }));
  }, []);


  let enableDatas: any = []
  useEffect(() => {
    if (datas) {
      datas?.filter((x: any) => x.hienThiMenuChinh)
        .sort((item1: any, item2: any) => item1.thuTu - item2.thuTu)
        .map(item => enableDatas.push(item));

      var tmp = convertKenhTinToMenu(enableDatas, "");
      if (tmp) {
        const tmpWithHomePage = [{ key: "home", label: <Link to={primaryRoutes.portaldvc.home} key={"homepage"} ><HomeOutlined style={{ fontSize: '18px' }} /></Link> } as ItemType, ...tmp]
        setMenu(tmpWithHomePage);

      }
    }
  }, [datas]);
  enableDatas?.map((item: any) => console.log(item.tenKenhTin + ':' + item.thuTu));

  const handleMenuSelect = ({ key }: { key: React.Key }) => {
    setSelectedKeys([key.toString()]);
    const selectedItem = datas?.find((item: IMenuPortal) => item.id === key);

    if (selectedItem) {      
      setSelectedMenuItem(selectedItem);
      localStorage.setItem('selectedMenuItem', JSON.stringify(selectedItem));
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKeys as any);
  }, [selectedKeys]);

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedKey');
    if (storedValue) {
      setSelectedKeys(storedValue as any);
    }
  }, []);

  return (
    <Layout className="main-layout_Navbar container-fluid" >
      <div className="container-menu">
        <Menu
          style={{ width: "100%", fontSize: 17.5, marginTop: '1px'}}
          mode="horizontal"
          className="container"
          selectedKeys={selectedKeys}
          items={menu}
          onSelect={handleMenuSelect}
          overflowedIndicator={<CaretDownOutlined />}

        />


      </div>
    </Layout>
  );
};

export default NavbarLayout;
