using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;

public class GetDonViThuTucByIdSpec : Specification<DonViThuTuc>, ISingleResultSpecification
{
    public GetDonViThuTucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class NguoiTiepNhanSelect
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
}

public class GetDonViThuTucQueryHandler : IQueryHandler<GetDonViThuTucQuery, DonViThuTucDetailDto>
{
    private readonly IReadRepository<DonViThuTuc> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetDonViThuTucQueryHandler(IReadRepository<DonViThuTuc> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<DonViThuTucDetailDto>> Handle(GetDonViThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDonViThuTucByIdSpec(request.Id), cancellationToken);
        string sqlGetDonViThuTuc = @"SELECT dvtt.maTTHC, dvtt.DonViId, dvtt.NguoiTiepNhanId, dvtt.MucDo, dvtt.UrlRedirect, dvtt.MaSoThue, dvtt.DonViMaSoThue,
                                    dvtt.TaiKhoanThuHuongId, dvtt.Id as Id FROM Catalog.DonViThuTucs dvtt WHERE dvtt.Id = @Id ";
        string sqlGetNguoiTiepNhan = "SELECT Id, UserName FROM [Identity].[Users] WHERE @NguoiTiepNhan LIKE '%' + Id + '%'";
        var donViThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<DonViThuTucDetailDto>(sqlGetDonViThuTuc, request);
        if (donViThuTuc == null)
            throw new NotFoundException($"DonViThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");

        var nguoiTiepNhan = await _dapperRepository.QueryAsync<NguoiTiepNhanSelect>(sqlGetNguoiTiepNhan, new
        {
            NguoiTiepNhan = donViThuTuc.NguoiTiepNhanId
        });
        donViThuTuc.NguoiTiepNhan = nguoiTiepNhan;


        return Result<DonViThuTucDetailDto>.Success(donViThuTuc);
    }
}
