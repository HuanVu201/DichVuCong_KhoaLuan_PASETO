using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucHoSoThongBaoKhuyenMaiQueryHandler : ICommandHandler<KetThucHoSoThongBaoKhuyenMaiCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly IRepository<GiayToHoSo> _repositoryGiayToHoSo;
    public KetThucHoSoThongBaoKhuyenMaiQueryHandler(ICurrentUser currUser, IRepository<HoSo> repositoryHoSo, IInjectConfiguration configuration, IDapperRepository dapperRepository, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IZaloService zaloService, IJobService jobService, IRepository<GiayToHoSo> repositoryGiayToHoSo)
    {
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _zaloService = zaloService;
        _jobService = jobService;
        _repositoryGiayToHoSo = repositoryGiayToHoSo;
    }
    public async Task<Result> Handle(KetThucHoSoThongBaoKhuyenMaiCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _currUser.GetUserFullName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _currUser.GetUserId();
        //var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var sqlExitst = "select top 1 * from Business.HoSos where Id = @Id and DeletedOn is null";
        var itemExitst = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlExitst, new
        {
            Id = request.Id,
        });
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var sql = "select top 1 MaGiayTo ,PDFPhieu,DocxPhieu from Business.GiayToHoSos gths where gths.MaHoSo = @MaHoSo and gths.DeletedOn is null and gths.SuDung = 1 and gths.LoaiGiayTo = 'PhieuTiepNhanVaHenTra'";
        var itemGiayToHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSo>(sql, new
        {
            MaHoSo = itemExitst.MaHoSo,
        });
        if (itemGiayToHoSo == null)
        {
            throw new NotFoundException($"Hồ sơ với mã hồ sơ {itemExitst.MaHoSo} không có giấy tiếp nhận, không thể kết thúc");
        }
        string dinhKemKetQua = null;
        if (itemExitst.DinhKemKetQua != null)
        {
            dinhKemKetQua = itemExitst.DinhKemKetQua;
        }
        else
        {
            if (!string.IsNullOrEmpty(itemGiayToHoSo.PDFPhieu) && !string.IsNullOrEmpty(itemGiayToHoSo.DocxPhieu))
            {
                dinhKemKetQua = $"{itemGiayToHoSo.PDFPhieu}##{itemGiayToHoSo.DocxPhieu}";
            }
            else if (!string.IsNullOrEmpty(itemGiayToHoSo.PDFPhieu))
            {
                dinhKemKetQua = itemGiayToHoSo.PDFPhieu;
            }
            else if (!string.IsNullOrEmpty(itemGiayToHoSo.DocxPhieu))
            {
                dinhKemKetQua = itemGiayToHoSo.DocxPhieu;
            }
            else
            {
                dinhKemKetQua = string.Empty;
            }
        }

        var ketThucHoSoThongBaoKhuyenMai = itemExitst.KetThucHoSoThuTucKhuyenMai(request.TrangThaiHoSoId, currentTime, currentTime, dinhKemKetQua);
        await _repositoryHoSo.UpdateAsync(ketThucHoSoThongBaoKhuyenMai, cancellationToken);
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, userId.ToString(), userFullName, null, null, currentTime, "10", "Kết thúc hồ sơ có thủ tục thông báo khuyến mãi", false);
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}

