
import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toast } from "react-toastify";
import { useSoLieuBaoCaoContext } from '../../contexts';
import { getCurrencyThongKe } from '@/utils';
import { Badge, Tooltip as TooltipAntd } from 'antd';
import { QuestionCircleOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
ChartJS.register(ArcElement, Tooltip, Legend);

function TruyVanCSDLDanCu() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [data, setData] = useState<any>();

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const truyVanCSDLDanCu = JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).TruyVanCSDLDanCu ?? 0
            setData(truyVanCSDLDanCu)
        }

    }, [soLieuContext.soLieuTheoKy]);
    return (<>
        <p style={{ minHeight: 50 }}><b >SỐ LƯỢNG TÀI KHOẢN CỔNG DVCQG ĐƯỢC XÁC THỰC VỚI CSDL QUỐC GIA VỀ DÂN CƯ
            <TooltipAntd title="?">
                {' '}<QuestionCircleOutlined style={{ color: '#afbcc3', position: 'relative', bottom: 1 }} />
            </TooltipAntd>
        </b></p>
        {data
            ?
            <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#00A658', padding: 20 }} >
                <b>{getCurrencyThongKe(data)}</b>
            </p>
            : <></>
        }

    </>);
}

export default TruyVanCSDLDanCu;