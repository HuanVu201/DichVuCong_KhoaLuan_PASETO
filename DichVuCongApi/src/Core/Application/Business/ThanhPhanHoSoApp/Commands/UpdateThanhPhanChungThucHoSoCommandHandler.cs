using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;

public class GetThanhPhanHoSoChungThucSpec : Specification<ThanhPhanHoSo>
{
    public GetThanhPhanHoSoChungThucSpec(List<Guid> Ids)
    {
        Query.Where(x => Ids.Contains(x.Id)).Where(x => x.DeletedOn == null);
    }
}

public class UpdateThanhPhanChungThucHoSoCommandHandler : ICommandHandler<UpdateThanhPhanChungThucHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    public UpdateThanhPhanChungThucHoSoCommandHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(UpdateThanhPhanChungThucHoSoCommand request, CancellationToken cancellationToken)
    {
        var sqlUpdateThanhPhanHoSo = HoSoChungThucCommonSql.KySoChungThucHoSo;
        var insertTempValues = request.ThanhPhanHoSos.Select(x => new { DinhKem = x.DinhKem, Id = x.Id.ToString(), TrangThaiDuyet = x.TrangThaiDuyet }).ToList();
        int updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);

        if (updatedThanhPhanHoSoRows == 0)
        {
            return (Result)Result.Fail("Cập nhật thành phần hồ sơ thất bại");
        }
        return (Result)Result.Success("Cập nhật thành phần hồ sơ thành công");
    }
}
