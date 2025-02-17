using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;

public class GetYeuCauThanhToanByMaSpec : Specification<YeuCauThanhToan, YeuCauThanhToanDetailDto>, ISingleResultSpecification
{
    public GetYeuCauThanhToanByMaSpec(string ma)
    {
        Query.Where(x => x.Ma == ma);
    }
}

public class GetYeuCauThanhToanByMaQueryHandler : IQueryHandler<GetYeuCauThanhToanByMaQuery, YeuCauThanhToanDetailDto>
{
    private readonly string ycttTable = "[Business].[YeuCauThanhToans]";
    private readonly string hoSoTableName = "[Business].[HoSos]";
    private readonly IReadRepository<YeuCauThanhToan> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetYeuCauThanhToanByMaQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<YeuCauThanhToanDetailDto>> Handle(GetYeuCauThanhToanByMaQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT TOP (1) {ycttTable}.[Id]
          ,{ycttTable}.[MaHoSo]
          ,{ycttTable}.[Ma]
          ,{ycttTable}.[SoTien]
          ,{ycttTable}.[Phi]
          ,{ycttTable}.[LePhi]
          ,{ycttTable}.[TrangThai]
          ,{ycttTable}.[NgayYeuCau]
          ,{ycttTable}.[NguoiYeuCau]
          ,{ycttTable}.[DonViThu]
          ,{ycttTable}.[HinhThucThanhToan]
          ,{ycttTable}.[HinhThucThu]
          ,{ycttTable}.[ChiTiet]
          ,{ycttTable}.[GhiChuThanhToan]
          ,{ycttTable}.[MauSoBienLai]
          ,{ycttTable}.[KyHieuBienLai]
          ,{ycttTable}.[NguoiThuPhi]
          ,{ycttTable}.[NgayThuPhi]
          ,{ycttTable}.[DonViThuPhiMaSoThue]
          ,{ycttTable}.[DonViMaSoThue]
          ,{ycttTable}.[NgayHoanPhi]
          ,{ycttTable}.[NguoiHoanPhi]
          ,{ycttTable}.[LyDoHoanPhi]
          ,{ycttTable}.[NgayHuy]
          ,{ycttTable}.[NguoiHuy]
          ,{ycttTable}.[LyDoHuy]
          ,{ycttTable}.[CreatedBy]
          ,{ycttTable}.[CreatedOn]
          ,{ycttTable}.[LastModifiedBy]
          ,{ycttTable}.[LastModifiedOn]
          ,{ycttTable}.[DeletedOn]
          ,{ycttTable}.[DeletedBy]
          ,{ycttTable}.[DonVi]
          ,{ycttTable}.[DiaChiBienLai]
          ,{ycttTable}.[MaSoThueBienLai]
          ,{ycttTable}.[NguoiNopTienBienLai]
          ,{ycttTable}.[TenLePhiBienLai]
          ,{ycttTable}.[TenPhiBienLai]
          ,{ycttTable}.[DuongDanBienLai]
          ,{ycttTable}.[SoTaiKhoanHoanPhi]
          ,{ycttTable}.[TenNganHangHoanPhi]
          ,{ycttTable}.[TenTaiKhoanHoanPhi]
          ,{ycttTable}.[SoGiayToNguoiNopTienBienLai]
          ,{ycttTable}.[SoBienLai]
          ,{ycttTable}.[EmailNguoiNopTienBienLai]
          ,{ycttTable}.[SoBienLaiLePhi]
          ,{ycttTable}.[SoBienLaiPhi]
          ,{ycttTable}.[SoDienThoaiNguoiNopTienBienLai]
          ,{ycttTable}.[MaGiaoDich]
          ,{ycttTable}.[MaNganHangGiaoDich]
          ,{ycttTable}.TenLePhiBienLai
            ,{ycttTable}.TenPhiBienLai  
          ,{hoSoTableName}.Id HoSoId
            ,{hoSoTableName}.TrichYeuHoSo
            ,{hoSoTableName}.SoDienThoaiChuHoSo
        FROM {ycttTable}
        INNER JOIN {hoSoTableName} ON {ycttTable}.MaHoSo = {hoSoTableName}.MaHoSo
        WHERE {ycttTable}.Ma = @Ma ";
        var result = await _dapperRepository.QueryFirstOrDefaultAsync<YeuCauThanhToanDetailDto>(sql, request, null, cancellationToken);
        if (result == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.ma} chưa được thêm vào hệ thống");
        return Result<YeuCauThanhToanDetailDto>.Success(result);
    }
}