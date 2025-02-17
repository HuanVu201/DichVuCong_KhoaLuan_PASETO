var THU_TUC_CO_PHI_PHAT_SINH_HO_SO = "THU_TUC_CO_PHI_PHAT_SINH_HO_SO";
var THU_TUC_PHAT_SINH_THANH_TOAN = "THU_TUC_PHAT_SINH_THANH_TOAN";
var THU_TUC_PHAT_SINH_TTTT = "THU_TUC_PHAT_SINH_TTTT";
var HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT = "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT";
export const DiemToiDaConstant = {
  THU_TUC_CO_PHI_PHAT_SINH_HO_SO: 4,
  THU_TUC_PHAT_SINH_THANH_TOAN: 2,
  THU_TUC_PHAT_SINH_TTTT: 2,
  HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT: 6,
};
export const TinhDiemDVC = (
  tyLe: number,
  type: keyof typeof DiemToiDaConstant
): number => {
  if (!tyLe) return 0;
  switch (type) {
    case THU_TUC_PHAT_SINH_TTTT:
    case THU_TUC_PHAT_SINH_THANH_TOAN:
      if (tyLe >= 0.8) return DiemToiDaConstant[type];
      return Math.round((tyLe * DiemToiDaConstant[type] * 30) / 100);
    case HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT:
      if (tyLe >= 0.3) return DiemToiDaConstant[type];
      return Math.round((tyLe * DiemToiDaConstant[type] * 30) / 100);
  }

  return 0;
};
