using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public class UpdateMucDoMultiThuTucHandler : ICommandHandler<UpdateMucDoMultiThuTuc>
{
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly IRepositoryWithEvents<ThuTuc> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<ThuTuc> _logger;
    public UpdateMucDoMultiThuTucHandler(IRepositoryWithEvents<ThuTuc> repositoryWithEvents, IDapperRepository dapperRepository, ILogger<ThuTuc> logger)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _logger = logger;
    }
    public async Task<Result> Handle(UpdateMucDoMultiThuTuc request, CancellationToken cancellationToken)
    {
        List<ThuTuc> updateData = new List<ThuTuc>();
        if (request.MaTTHCs == null) throw new ArgumentNullException(nameof(request.MaTTHCs));
        if (string.IsNullOrEmpty(request.MucDo)) throw new ArgumentNullException(nameof(request.MucDo));
        // ktra mức độ cao nhất tại bảng đơn vị thủ tục
        var thuTucIds = string.Join(",", request.MaTTHCs.Select(t => $"'{t}'"));
        string sqlDonViThuTucs = $"SELECT {donViThuTucTableName}.MaTTHC, {donViThuTucTableName}.MucDo FROM {donViThuTucTableName} WHERE {donViThuTucTableName}.DeletedOn is null AND {donViThuTucTableName}.MaTTHC IN ({thuTucIds}) ORDER BY {donViThuTucTableName}.MucDo DESC";
        string sqlQuery = $"SELECT {thuTucTableName}.* FROM {thuTucTableName} " +
           $"WHERE {thuTucTableName}.MaTTHC IN ({thuTucIds}) " +
           $"AND {thuTucTableName}.DeletedOn is null";
        var thuTucs = await _dapperRepository.QueryAsync<ThuTuc>(sqlQuery);
        var donViThuTucs = await _dapperRepository.QueryAsync<DonViThuTuc>(sqlDonViThuTucs);
        foreach (var thuTuc in thuTucs)
        {
            var mucDoThuTuc = donViThuTucs.Where(t => t.MaTTHC == thuTuc.MaTTHC).FirstOrDefault();

            ThuTuc tmp = thuTuc.Adapt<ThuTuc>();
            tmp.Update(mucDo:
               mucDoThuTuc != null && !string.IsNullOrEmpty(mucDoThuTuc.MucDo) ? mucDoThuTuc.MucDo:  request.MucDo
                );
            updateData.Add(tmp);
        }
        await _repositoryWithEvents.UpdateRangeAsync(updateData);
        return (Result)Result.Success();
    }
}
