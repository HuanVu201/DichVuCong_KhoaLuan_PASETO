using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;

public class AddDonViThuTucCommandHandler : ICommandHandler<AddDonViThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;

    public AddDonViThuTucCommandHandler(IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;

    }
    public async Task<Result<DefaultIdType>> Handle(AddDonViThuTucCommand request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT * FROM [Catalog].[DonViThuTucs] where DonViId = @donViId and MaTTHC = @maTTHC and DeletedOn is null";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<DonViThuTucDto>(sql, new
        {
            donViId = request.DonViId,
            maTTHC = request.MaTTHC
        });

        if (data == null)
        {
            var donViThuTuc = DonViThuTuc.Create(request.MaTTHC, request.DonViId, request.NguoiTiepNhanId, request.MucDo, request.UrlRedirect, request.MaSoThue, request.DonViMaSoThue, request.TaiKhoanThuHuongId);
            await _repositoryWithEvents.AddAsync(donViThuTuc, cancellationToken);
            return Result<Guid>.Success(donViThuTuc.Id);
        }
        else
            return Result<Guid>.Fail("Đã tồn tại thủ tục trong đơn vị này");

    }
}
