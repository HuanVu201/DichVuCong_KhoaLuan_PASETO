using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;

public class XuatPhieuHuongDanNopTrucTiepCommandHandler : IQueryHandler<XuatPhieuHuongDanNopTrucTiepCommand, object>
{

    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IQrCodeService _qrCodeService;
    private readonly ICurrentUser _currentUser;
    public XuatPhieuHuongDanNopTrucTiepCommandHandler(IDapperRepository dapperRepository, IMediator mediator, IQrCodeService qrCodeService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _qrCodeService = qrCodeService;
        _currentUser = currentUser;
    }
    public async Task<Result<object>> Handle(XuatPhieuHuongDanNopTrucTiepCommand request, CancellationToken cancellationToken)
    {

        var userId = _currentUser.GetUserId();
        var donViId = _currentUser.GetUserGroupCode();

        string sql = $@"SELECT g.Catalog, g.GroupName, g.SoDienThoai, g.MaTinh, g.SoDienThoai as SoDienThoaiDonVi, u.FullName, db.TenDiaBan AS TenTinh
                          FROM [Catalog].[Groups] g
                          INNER JOIN [Identity].[Users] u ON u.GroupCode = g.GroupCode
                          INNER JOIN [Catalog].[DiaBans] db ON db.MaDiaBan = g.MaTinh
                          WHERE u.id = @Id";

        var result = await _dapperRepository.QueryFirstOrDefaultAsync<XuatPhieuHuongDanNopTrucTiepDto>(sql, new { Id = userId });

        if (result is not null)
        {
            var urlPhoi = string.Empty;
            try
            {
                urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
                {
                    LoaiPhoi = request.LoaiPhoi,
                    Code = request.Code,
                    MaDonVi = donViId,
                    MaThuTuc = request.MaTTHC,
                    MaLinhVuc = request.MaLinhVuc
                });
                if (!string.IsNullOrEmpty(urlPhoi))
                {
                    result.UrlPhoi = urlPhoi;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Có lỗi trong quá trình lấy mẫu phôi.");
                Console.WriteLine(ex.Message);
            }

            return Result<object>.Success(result);
        }

        return Result<object>.Fail("Không có thông tin người dùng/cơ quan!");
    }

}
