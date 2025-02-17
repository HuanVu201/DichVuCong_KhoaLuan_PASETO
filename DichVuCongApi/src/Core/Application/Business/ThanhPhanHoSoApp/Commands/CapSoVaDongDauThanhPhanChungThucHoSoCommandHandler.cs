using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
// k dùng
public class CapSoVaDongDauThanhPhanChungThucHoSoCommandHandler : ICommandHandler<CapSoVaDongDauThanhPhanChungThucHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepositoryWithEvents<SoChungThuc> _repositorySoChungThuc;
    private readonly ICurrentUser _currentUser;
    public CapSoVaDongDauThanhPhanChungThucHoSoCommandHandler(ICurrentUser currentUser, IDapperRepository dapperRepository, IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo, IRepositoryWithEvents<SoChungThuc> repositorySoChungThuc)
    {
        _dapperRepository = dapperRepository;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositorySoChungThuc = repositorySoChungThuc;
        _currentUser = currentUser;
    }
    private async Task<IReadOnlyList<SoChungThuc>> GetSoChungThucs(string donVi)
    {
        var request = new SearchSoChungThucQuery()
        {
            RequestTime = DateTime.Now,
            PageNumber = 1,
            PageSize = 2,
            TrangThai = true,
            Removed = false,
            DonVi = donVi
        };
        var where = SearchSoChungThucQueryWhereBuilder.Build(request);
        var currOpenSoChungThuc = await _dapperRepository.QueryAsync<SoChungThuc>($@"SELECT Id,DonVi,TenSo,SoBatDau,SoHienTai,NgayBatDau,NgayDongSo,TrangThai,Loai FROM Catalog.SoChungThucs {where}", request);
        return currOpenSoChungThuc;
    }
    public async Task<Result> Handle(CapSoVaDongDauThanhPhanChungThucHoSoCommand request, CancellationToken cancellationToken)
    {
        var userOfficeCode = _currentUser.GetUserOfficeCode();
        var soChungThucs = await GetSoChungThucs(userOfficeCode);
        var soChungThucDT = soChungThucs.FirstOrDefault(x => x.Loai == SoChungThucConstant.Loai_DienTu);
        var soChungThucG = soChungThucs.FirstOrDefault(x => x.Loai == SoChungThucConstant.Loai_Giay);
        var thanhPhanHoSo = await _repositoryThanhPhanHoSo.GetByIdAsync(request.Id);
        int currSoChungThucDT = soChungThucDT != null ? soChungThucDT.SoHienTai : -1;
        int currSoChungThucG = soChungThucG != null ? soChungThucG.SoHienTai : -1;
        if (thanhPhanHoSo == null)
        {
            return (Result)Result.Fail("Không tìm thấy các thành phần hồ sơ ");
        }
        if(thanhPhanHoSo.SoChungThucDT != null && thanhPhanHoSo.KyDienTuBanGiay == true && request.SoChungThucDT != default)
        {
            return (Result)Result.Fail("Đã có số chứng thực điện tử");
        }
        if (thanhPhanHoSo.SoBanGiay > 0 && thanhPhanHoSo.SoChungThucG != null && request.SoChungThucG != default)
        {
            return (Result)Result.Fail("Đã có số chứng thực giấy");
        }

        if (currSoChungThucDT > 0 && request.SoChungThucDT != default && request.SoChungThucDT == soChungThucDT.Id)// thành phần hồ sơ với sổ chứng thực điện tử
        {
            thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy, soChungThucDT.Id, currSoChungThucDT, null, null, null, null);
            currSoChungThucDT += 1;
        } else if(currSoChungThucG > 0 && request.SoChungThucG != default && request.SoChungThucG == soChungThucG.Id)// thành phần hồ sơ với sổ chứng thực giấy
        {
            thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy, null, null, soChungThucG.Id, currSoChungThucG, null, null);
            currSoChungThucG += 1;
        }
        await _repositoryThanhPhanHoSo.UpdateAsync(thanhPhanHoSo, cancellationToken);
        if(currSoChungThucDT != -1 && soChungThucDT.SoHienTai != currSoChungThucDT)
        {
            soChungThucDT.Update(null, null, null, currSoChungThucDT, null, null, null, null);
            await _repositorySoChungThuc.UpdateAsync(soChungThucDT);
        }
        if (currSoChungThucG != -1 && soChungThucG.SoHienTai != currSoChungThucG)
        {
            soChungThucG.Update(null, null, null, currSoChungThucG, null, null, null, null);
            await _repositorySoChungThuc.UpdateAsync(soChungThucG);
        }
        return (Result)Result.Success();
    }
}
