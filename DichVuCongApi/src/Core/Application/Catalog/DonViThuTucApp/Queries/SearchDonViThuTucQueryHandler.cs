using Mapster;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;

public class SearchDonViThuTucQueryWhereBuilder
{
    public static string Build(SearchDonViThuTucQuery req)
    {
        string where = "CoCau.Type = N'don-vi'";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND DonVi.MaTTHC = @MaTTHC";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND ThuTuc.TenTTHC Like N'%' + @SearchKeys + '%'";
        if (req.TaiKhoanThuHuongId != null && req.TaiKhoanThuHuongId != default(DefaultIdType))
            where += " AND DonVi.TaiKhoanThuHuongId = @TaiKhoanThuHuongId";
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND DonVi.DonViId = @DonViId";
        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND ThuTuc.MaLinhVucChinh = @MaLinhVuc";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND CoCau.MaDinhDanh = @MaDinhDanh";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += " AND CoCau.MaDinhDanh LIKE @MaDinhDanhCha + '%'";
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND CoCau.Catalog = @Catalog ";
        if(req.SuDung == true)
        {
            where += " AND ThuTuc.SuDung = 1 ";
        }else if(req.SuDung == false)
        {
            where += " AND ThuTuc.SuDung = 0 ";
        }
        if (req.Removed == false)
            where += " AND DonVi.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DonVi.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchDonViThuTucQueryHandler : IRequestHandler<SearchDonViThuTucQuery, PaginationResponse<DonViThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDonViThuTucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DonViThuTucDto>> Handle(SearchDonViThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDonViThuTucQueryWhereBuilder.Build(request);

        // join đơn vị, thủ tục, vs bảng này để ra kq
        var sql = $@"Select DonVi.Id as Id,DonVi.MaTTHC,DonVi.DonViId,DonVi.NguoiTiepNhanId,DonVi.LastModifiedBy,DonVi.MucDo,DonVi.UrlRedirect,DonVi.MaSoThue,DonVi.DonViMaSoThue,
                    DonVi.TaiKhoanThuHuongId,CoCau.GroupName,TaiKhoanThuHuong.TKThuHuong,TaiKhoanThuHuong.MaNHThuHuong,TaiKhoanThuHuong.TenTKThuHuong, CoCau.Catalog,
                    u.Id as UserId, u.UserName,u.FullName, ThuTuc.TenTTHC as TenTTHC, MaLinhVucChinh, LinhVucChinh,ThuTuc.SuDung
                    from [Catalog].[DonViThuTucs] as DonVi
                    LEFT Join [Catalog].[ThuTucs] as ThuTuc on DonVi.MaTTHC = ThuTuc.MaTTHC
                    Left Join [Catalog].[Groups] as CoCau on DonVi.DonViId = CoCau.GroupCode
                    Left Join [Catalog].[TaiKhoanThuHuongs] as TaiKhoanThuHuong on DonVi.TaiKhoanThuHuongId = TaiKhoanThuHuong.Id
                    LEFT JOIN [Identity].[Users] as u ON  u.Id  IN (SELECT value FROM STRING_SPLIT(DonVi.NguoiTiepNhanId, '#'))
                        {where} AND CoCau.DeletedOn IS NULL AND TaiKhoanThuHuong.DeletedOn IS NULL ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DonViThuTucDto>(sql, request.PageSize, "DonViId", cancellationToken, request.PageNumber, request);
        if(data.Data == null)
        {
            return data;
        }

        var result = data.Data.GroupBy(x => x.Id).Select(key=> {  
            return new
            {
                Id = key.Key,
                Catalog = key.FirstOrDefault().Catalog,
                MaTTHC = key.FirstOrDefault()?.MaTTHC,
                TenTTHC = key.FirstOrDefault()?.TenTTHC,
                SuDung = key.FirstOrDefault()?.SuDung,
                DonViId = key.FirstOrDefault()?.DonViId,
                NguoiTiepNhanId = key.FirstOrDefault()?.NguoiTiepNhanId,
                MucDo = key.FirstOrDefault()?.MucDo,
                UrlRedirect = key.FirstOrDefault()?.UrlRedirect,
                MaSoThue = key.FirstOrDefault()?.MaSoThue,
                DonViMaSoThue = key.FirstOrDefault()?.DonViMaSoThue,
                TaiKhoanThuHuongId = key.FirstOrDefault()?.TaiKhoanThuHuongId,
                GroupName = key.FirstOrDefault()?.GroupName,
                TKThuHuong = key.FirstOrDefault()?.TKThuHuong,
                MaNHThuHuong = key.FirstOrDefault()?.MaNHThuHuong,
                TenTKThuHuong = key.FirstOrDefault()?.TenTKThuHuong,
                LastModifiedBy = key.FirstOrDefault()?.LastModifiedBy,
                LinhVucChinh = key.FirstOrDefault()?.LinhVucChinh,
                MaLinhVucChinh = key.FirstOrDefault()?.MaLinhVucChinh,
                NguoiTiepNhan = key.Select(x => new NguoiTiepNhanSelect
                {
                    Id = x.UserId,
                    UserName = x.UserName,
                    FullName = x.FullName,
                }).ToList()
            };
        }  
        ).ToList();
        data.Data = result.Adapt<List<DonViThuTucDto>>();
        return data;
    }
}
