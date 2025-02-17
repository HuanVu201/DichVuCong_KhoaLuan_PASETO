using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Catalog;
public class Notification : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public Guid HoSoId { get;private set; }
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Topic { get; private set; }
    [MaxLength(256)]
    public string? Title { get; private set; }
    [MaxLength(2000)]
    public string? Content { get; private set; }
    [MaxLength(500)]
    public string? Description { get;private set; }
    public string? Link { get; private set; }
    public string? FullPath { get; private set; }
    public string? Type { get;private set; }
    public bool? IsRead { get; private set; } = false;
    public string LoaiThongBao { get; private set; }
    public string Data { get; private set; }
    public DateTime? CreatedOn { get; private set; } = DateTime.Now;

    public Notification(DefaultIdType id, DefaultIdType hoSoId, string topic, string? title, string? content, string? description, bool? isRead, string loaiThongBao, string? link, string data, string? fullPath, string? type)
    {
        Id = id;
        HoSoId = hoSoId;
        Topic = topic;
        Title = title;
        Content = content;
        Description = description;
        IsRead = isRead;
        LoaiThongBao = loaiThongBao;
        Link = link;
        Data = data;
        FullPath = fullPath;
        Type = type;
    }

    public Notification Update(string? title, string? content, string? description, bool? isRead, string? link, string? data, string? fullPath, string? type)
    {
        if (title != null)
            Title = title;
        if (content != null)
            Content = content;
        if (description != null)
            Description = description;
        if (link != null)
            Link = link;
        if (data != null)
            Data = data;
        if (isRead != null)
            IsRead = isRead;
        if (fullPath != null)
            FullPath = fullPath;
        if (type != null)
            Type = type;
        return this;
    }
}

public class NotificationType
{
    public const string ThemMoiTrucTiep = nameof(ThemMoiTrucTiep);
    public const string TiepNhanTrucTuyen = nameof(TiepNhanTrucTuyen);
    public const string ChoTiepNhanTrucTuyen = nameof(ChoTiepNhanTrucTuyen);
    public const string DangXuLy = nameof(DangXuLy);
    public const string YeuCauThucHienNghiaVuTaiChinh = nameof(YeuCauThucHienNghiaVuTaiChinh);
    public const string YeuCauBoSung = nameof(YeuCauBoSung);
    public const string ChoBoSung = nameof(ChoBoSung);
    public const string ChoTraKetQua = nameof(ChoTraKetQua);
    public const string ChoXacNhanTraKetQua = nameof(ChoXacNhanTraKetQua);
    public const string ChoXacNhanTraKetQuaCoThuPhi = nameof(ChoXacNhanTraKetQuaCoThuPhi);
    public const string ChoThuPhi = nameof(ChoThuPhi);
    public const string DaTraKetQua = nameof(DaTraKetQua);
    public const string DaCoKetQua = nameof(DaCoKetQua);
    public const string DungXuLy = nameof(DungXuLy);
    public const string TuChoiTiepNhan = nameof(TuChoiTiepNhan);
    public const string ThanhToanThanhCong = nameof(ThanhToanThanhCong);
}

public class NotificationLoaiThongBao
{
    public const string CongDan = nameof(CongDan);
    public const string CanBo = nameof(CanBo);
}
