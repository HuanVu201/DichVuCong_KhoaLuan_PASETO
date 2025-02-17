using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class GetKetQuaXuLyExpandApiQueryHandler : ICommandHandler<GetKetQuaXuLyExpandApiQuery, GetKetQuaXuLyExpandApiDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public GetKetQuaXuLyExpandApiQueryHandler(IDapperRepository dapperRepository, IMediator mediator)
    {

        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }
    public async Task<Result<GetKetQuaXuLyExpandApiDto>> Handle(GetKetQuaXuLyExpandApiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<GetKetQuaXuLyExpandApiDto>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<GetKetQuaXuLyExpandApiDto>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");
        }

        string sql = $@"
                SELECT 
                  hs.Id as id, hs.maHoSo, hs.chuHoSo, hs.maTTHC, hs.TrichYeuKetQua, hs.coQuanBanHanhKetQua, 
                  hs.loaiVanBanKetQua, hs.ngayBanHanhKetQua, hs.nguoiKyKetQua, hs.soKyHieuKetQua, hs.ngayKyKetQua,hs.DinhKemKetQua,
                  kqlq.LoaiKetQua, kqlq.SoKyHieu, kqlq.TrichYeu, kqlq.NgayKy, kqlq.NguoiKy, kqlq.NgayCoHieuLuc, kqlq.NgayHetHieuLuc, kqlq.DinhKem, kqlq.CoQuanBanHanh
                FROM 
                  Business.HoSos hs 
                  INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC 
                  left join Business.TruongHopThuTucs thtt on thtt.Ma = hs.MaTruongHop 
                  left join Business.KetQuaLienQuans kqlq on kqlq.MaHoSo = hs.MaHoSo 
                WHERE 
                  hs.Id = @Id AND hs.DeletedOn is null";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GetKetQuaXuLyExpandApiDto>(sql, new { Id = request.Id });

        if (data == null)
            throw new Exception($"Hồ sơ với mã {request.Id} chưa được thêm vào hệ thống hoặc đã bị xóa!");
        return Result<GetKetQuaXuLyExpandApiDto>.Success(data); ;
    }
}
