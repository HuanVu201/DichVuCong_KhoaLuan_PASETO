using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Dtos;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Queries;


public class GetDuThaoXuLyHoSoByIdQueryHandler : IQueryHandler<GetDuThaoXuLyHoSoByIdQuery, DuThaoXuLyHoSoDto>
{
    private readonly IDapperRepository _dapperRepository;
    public GetDuThaoXuLyHoSoByIdQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<DuThaoXuLyHoSoDto>> Handle(GetDuThaoXuLyHoSoByIdQuery request, CancellationToken cancellationToken)
    {
        string sql = @$"SELECT hs.Id as HoSoId, dtxlhs.Id, ChuHoSo, SoDienThoaiChuHoSo, EmailChuHoSo, hs.TrangThaiHoSoId, NgayHenTra, hs.MaHoSo, KenhThucHien,
                        tt.TenTTHC, NgayNopHoSo, hs.SoGiayToChuHoSo, dtxlhs.NguoiXuLy, dtxlhs.TrangThai, dtxlhs.TrangThaiLienThongQLVB, dtxlhs.CreatedOn,
                        dtxlhs.Loai, dtxlhs.FileDinhKem, dtxlhs.TrichYeu, dtxlhs.taiKhoanLanhDaoKy, dtxlhs.TenLanhDaoKy, u1.FullName as TenNguoiXuLy, dtxlhs.NgayHenTraMoi
                        FROM 
                          Business.HoSos as hs 
                          INNER JOIN Business.DuThaoXuLyHoSos as dtxlhs ON hs.MaHoSo = dtxlhs.MaHoSo 
                          INNER JOIN Catalog.ThuTucs tt ON hs.MaTTHC = tt.MaTTHC 
                          INNER JOIN [Identity].Users as u1 ON u1.id = dtxlhs.NguoiXuLy
                        WHERE dtxlhs.Id = @Id";

        var data = await _dapperRepository.QueryFirstOrDefaultAsync<DuThaoXuLyHoSoDto>(sql, new { Id = request.Id });

        if (data == null)
            return Result<DuThaoXuLyHoSoDto>.Fail("Không có dữ liệu!");
        return Result<DuThaoXuLyHoSoDto>.Success(data);
    }
}