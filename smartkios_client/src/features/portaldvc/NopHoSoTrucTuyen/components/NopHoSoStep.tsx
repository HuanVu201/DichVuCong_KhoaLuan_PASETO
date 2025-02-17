import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";
import { AntdStep } from "@/lib/antd/components"
import { EnvironmentOutlined, FileAddOutlined, FileSearchOutlined, LoginOutlined, SelectOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Affix, Popover, StepProps, StepsProps, Typography } from "antd"
import { FormInstance } from "antd/lib";
import { useEffect, useMemo, useState } from "react";

export const ICON_STYLE_ACTIVE_COLOR = "#f0ad4e"
const STEP_DESCRIPTIONS = ["Nhập thông tin hồ sơ", "Biểu mẫu điện tử", "Đăng ký nhận kết quả", "Thành phần hồ sơ"]
export const STEP_ICONS = {
    "LoginOutlined" : ({style} : {style: React.CSSProperties}) => <LoginOutlined style={style}/>,
    "FileSearchOutlined": ({style} : {style: React.CSSProperties}) => <FileSearchOutlined style={style}/>,
    "SelectOutlined": ({style} : {style: React.CSSProperties}) => <SelectOutlined style={style}/>,
    "UserOutlined": ({style}: {style: React.CSSProperties}) => <UserOutlined style={style} />,
    "SolutionOutlined": ({style}: {style: React.CSSProperties}) => <SolutionOutlined style={style} />,
    "EnvironmentOutlined": ({style}: {style: React.CSSProperties}) => <EnvironmentOutlined style={style} />,
    "FileAddOutlined": ({style}: {style: React.CSSProperties}) => <FileAddOutlined style={style} />,
}

export const NopHoSoStep = ({ stepRef, anThongTinLienHeNopTrucTuyen, form }: { form: FormInstance<any>; stepRef: React.MutableRefObject<HTMLDivElement[]>; anThongTinLienHeNopTrucTuyen: boolean | undefined }) => {
    const idx = anThongTinLienHeNopTrucTuyen ? 1 : 0
    const steps = stepRef.current.filter((x, filterIdx) => anThongTinLienHeNopTrucTuyen ? filterIdx > 0 : true)
    const [currentStep, setCurrentStep] = useState<number>()
    const { isMobile } = useWindowSizeChange()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cIdx = steps.findIndex((x) => x == entry.target);
                    setCurrentStep(cIdx)
                } else {
                    const cIdx = steps.findIndex((x) => x == entry.target);
                    if (currentStep && currentStep > cIdx) {
                        setCurrentStep(cIdx)
                    }
                }
            });
        }, {
            rootMargin: "-300px"
        })
        if (steps) {
            steps.forEach(el => {
                observer.observe(el)
            })
        }
        return () => {
            if (steps) {
                steps.forEach(el => {
                    observer.unobserve(el);
                })
            }
        };
    }, [steps])

    const node = <div style={{ backgroundColor: "#fff", padding: "30px 0 20px 0" }}>
        <AntdStep  items={steps.map((step, index): StepProps => {
            const { icon, description, disabledstep, active } = step.dataset
            let color = index == currentStep || active ? ICON_STYLE_ACTIVE_COLOR : undefined
            if(active){
                color = "#ce7a58"
            }
            return {
                onClick: () => {
                    if(disabledstep){
                        return
                    }
                    setCurrentStep(index)
                    if (icon == "EnvironmentOutlined") {
                        form.setFieldValue("hinhThucTra", "1")
                    }
                    steps[index].scrollIntoView({ behavior: "smooth", block: "start" })
                },
                title: <Typography.Title level={4} >Bước {index + 1}</Typography.Title>,
                description,
                icon: icon && icon ? (STEP_ICONS as any)[icon]({style: {color}}) : ""
            }
        })}

            current={currentStep}
            onChange={(value) => { // thêm role = 'button'
            }}
        />
    </div>

    return isMobile ? node : <Affix >
        {node}
    </Affix>
}