using Mapster;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands.ChamSoHoa;
public class CapNhatThanhPhanHoSoCommandHandler : ICommandHandler<CapNhatThanhPhanHoSoCommand>
{
    private readonly IRepository<ThanhPhanHoSo> _thanhPhanHoSoRepo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<CapNhatThanhPhanHoSoCommandHandler> _logger;

    public CapNhatThanhPhanHoSoCommandHandler(
        IRepository<ThanhPhanHoSo> thanhPhanHoSoRepo,
        IDapperRepository dapperRepository,
        ILogger<CapNhatThanhPhanHoSoCommandHandler> logger)
    {
        _thanhPhanHoSoRepo = thanhPhanHoSoRepo;
        _dapperRepository = dapperRepository;
        _logger = logger;
    }
    public async Task UpdateTPCT(List<ThanhPhanHoSoUpdate> reqThanhPhanHoSos)
    {
        var ids = reqThanhPhanHoSos.Select(x => x.Id).ToList<Guid>();
        var thanhPhanHoSos = await _thanhPhanHoSoRepo.ListAsync(new GetThanhPhanHoSosSpec(ids));
        var thanhPhanNotInDbs = reqThanhPhanHoSos.Where(u => !thanhPhanHoSos.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString())).ToList();
        var newUpdateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        var newCreateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            var reqTPHS = reqThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);
            if (reqTPHS == null) continue;

            var tphs = thanhPhanHoSo.UpdateTiepNhan(reqTPHS.Ten, reqTPHS.DinhKem, reqTPHS.TrangThaiSoHoa);
            newUpdateThanhPhanHoSos.Add(tphs);
        }
        var thanhPhanNotInDbsAdapter = thanhPhanNotInDbs.Adapt<List<ThanhPhanHoSo>>();
        for (int i = 0; i < thanhPhanNotInDbs.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanNotInDbsAdapter[i];
            newCreateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        await _thanhPhanHoSoRepo.UpdateRangeAsync(newUpdateThanhPhanHoSos);
        await _thanhPhanHoSoRepo.AddRangeAsync(newCreateThanhPhanHoSos);
    }
    public async Task<Result> Handle(CapNhatThanhPhanHoSoCommand request, CancellationToken cancellationToken)
    {
        try
        {
            string sqlForward = $"UPDATE {SchemaNames.Business}.{TableNames.HoSos} SET {nameof(HoSo.TrangThaiSoHoa)} = @TrangThaiSoHoa WHERE Id = @Id";
            if (request.SaveAndForward == true)
            {
                await UpdateTPCT(request.ThanhPhanHoSos);
                await _dapperRepository.ExcuteAsync(sqlForward, new
                {
                    TrangThaiSoHoa = HoSo_TrangThaiSoHoa.DaSoHoa,
                    Id = request.Id
                });
            }
            else if (request.SaveAndForward == false)
            {
                await UpdateTPCT(request.ThanhPhanHoSos);
            }
            return (Result)Result.Success("Thao tác thành công");
        }
        catch (Exception ex)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                req = request,
                res = JsonConvert.SerializeObject(ex)
            }));
            return (Result)Result.Fail("Thao tác thất bại");
        }
    }
}
