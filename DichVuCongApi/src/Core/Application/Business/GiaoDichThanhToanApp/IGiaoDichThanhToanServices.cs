

using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
public interface IGiaoDichThanhToanServices : ITransientService
{
    Task<AddGiaoDichThanhToanResponse> Create(AddGiaoDichThanhToanRequest request);


}
