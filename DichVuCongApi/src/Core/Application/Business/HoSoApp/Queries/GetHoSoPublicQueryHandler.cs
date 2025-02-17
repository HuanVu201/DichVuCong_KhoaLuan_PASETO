using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class GetHoSoPublicQueryWhereBuilder
{
    public static string Build(GetHoSoPublicQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo = @MaHoSo ";
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND (hs.SoGiayToChuHoSo = @SoDinhDanh OR hs.SoGiayToNguoiUyQuyen = @SoDinhDanh) ";
        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class GetHoSoPublicQueryHandler : ICommandHandler<GetHoSoPublicQuery, HoSoPublicDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetHoSoPublicQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<HoSoPublicDto>> Handle(GetHoSoPublicQuery request, CancellationToken cancellationToken)
    {
        var where = GetHoSoPublicQueryWhereBuilder.Build(request);
        var sqlCheck = @"SELECT TOP(1) SoGiayToChuHoSo, SoGiayToNguoiUyQuyen
                          FROM  Business.HoSos 
                          WHERE MaHoSo = @maHoSo";

        var sql = $@"SELECT TOP 1 hs.ID, ChuHoSo, tths.Ten as TrangThaiHoSo,TenTTHC as TenThuTuc,MaHoSo
		            ,NgayTiepNhan, NgayHenTra
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
					INNER JOIN Business.TrangThaiHoSos tths on hs.TrangThaiHoSoId = tths.Ma
                    {where}";
           
                var resCheck = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoDto>(sqlCheck, new
                {
                    MaHoSo = request.MaHoSo,
                });

                if (resCheck == null)
                {
                    return Result<HoSoPublicDto>.Fail("Mã hồ sơ không hợp lệ!");
                }
                else
                {

                    if (resCheck.SoGiayToChuHoSo == request.SoDinhDanh || resCheck.SoGiayToNguoiUyQuyen == request.SoDinhDanh)
                    {
                        var data = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoPublicDto>(sql, new
                        {
                            MaHoSo = request.MaHoSo,
                            SoDinhDanh = request.SoDinhDanh
                        }, null, cancellationToken);
                        return Result<HoSoPublicDto>.Success(data: data);
                    }
                    else
                    {
                        return Result<HoSoPublicDto>.Fail("Vui lòng nhập đúng số định danh chủ hồ sơ/người ủy quyền!");
                    }
                }
    }
}
