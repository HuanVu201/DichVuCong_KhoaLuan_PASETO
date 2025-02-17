using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class ThongKeTheoDoiTrangThaiXuLyHoSoDto : IDto
{
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public int ChoTiepNhanTrucTuyen { get; set; }
    public int ChoTiepNhan { get; set; }
    public int ChoTiepNhanQuaBCCI { get; set; }
    public int DuDieuKienDaNopPhiChoTiepNhan { get; set; }
    public int DuDieuKienChuaNopPhiChoTiepNhan { get; set; }
    public int MoiTiepNhan { get; set; }
    public int MoiTiepNhanQuaMang { get; set; }
    public int MoiTiepNhanQuaBCCI { get; set; }
    public int MoiTiepNhanTrucTuyen { get; set; }
    public int DangXuLy { get; set; }
    public int DungXuLy { get; set; }
    public int ChoThucHienNghiaVuTaiChinh { get; set; }
    public int ChoBoSung { get; set; }
    public int ChoXacNhanKetQua { get; set; }
    public int ChoXacNhanBoSung { get; set; }
    public int ChoXacNhanTraLai { get; set; }
    public int ChoTra { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
