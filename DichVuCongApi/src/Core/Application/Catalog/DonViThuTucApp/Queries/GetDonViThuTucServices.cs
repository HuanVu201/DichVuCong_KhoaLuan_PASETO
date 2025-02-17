using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
public partial class GetDonViThuTucServices : IDonViThuTucServices
{
    private readonly string tableName = "Catalog.DonViThuTucs";
    private readonly string taiKhoanThuHuongTableName = "Catalog.TaiKhoanThuHuongs";
    private readonly IDapperRepository _dapperRepository;
    public GetDonViThuTucServices(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
   
    public async Task<DonViThuTucDetail> GetBy(string donViId, string maTTHC)
    {
        if (string.IsNullOrEmpty(donViId) | string.IsNullOrEmpty(maTTHC)) throw new ArgumentNullException(nameof(maTTHC) + nameof(donViId));
        string sql = $"SELECT {tableName}.*, " +
            $"{taiKhoanThuHuongTableName}.TKThuHuong, {taiKhoanThuHuongTableName}.MaNHThuHuong, {taiKhoanThuHuongTableName}.TenTKThuHuong " +
            $"FROM {tableName} " +
            $"INNER JOIN {taiKhoanThuHuongTableName} " +
            $"ON {tableName}.TaiKhoanThuHuongId = {taiKhoanThuHuongTableName}.Id " +
            $"WHERE {tableName}.DonViId = '{donViId}' AND {tableName}.MaTTHC ='{maTTHC}'";
        var res = await _dapperRepository.QueryAsync<DonViThuTucDetail>(sql);
        if (res == null) return null;
        return res.FirstOrDefault();
    }
}
