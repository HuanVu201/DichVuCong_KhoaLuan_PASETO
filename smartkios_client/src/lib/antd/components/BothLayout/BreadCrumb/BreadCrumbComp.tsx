import { Link, useLocation } from "react-router-dom"
import './BreadCrum.scss'
import { IMenuPortal } from "../Models/KenhTin"

export const BreadcrumbComp = ({ selectedItem }: { selectedItem: IMenuPortal | null }) => {
    const location = useLocation()


    return (
        <div className="container mt-2" >
            <nav className="bread-wrapper" style={{ marginLeft: '100px' }}>
                <Link to="/portaldvc/home"
                    className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    Trang chủ
                </Link>
                <span className="breadcrumb-arrow">&gt;</span>
                {selectedItem ? <Link to={selectedItem.lienKetNgoai as any}
                    className={selectedItem.lienKetNgoai ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    {selectedItem.tenKenhTin}
                </Link> : <></>}


            </nav>
        </div>
    )
}