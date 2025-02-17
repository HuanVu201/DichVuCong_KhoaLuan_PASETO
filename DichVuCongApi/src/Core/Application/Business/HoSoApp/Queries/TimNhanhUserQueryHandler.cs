using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class TimNhanhQueryHandler : IQueryHandler<TimNhanhUserQuery, UserCSDLResponse>
{
    private readonly IDapperRepository _dapperRepository;
    public TimNhanhQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<UserCSDLResponse>> Handle(TimNhanhUserQuery request, CancellationToken cancellationToken)
    {
        string sqlGetUser = "SELECT TOP 1 Id, Email, PhoneNumber, FullName, HoVaTen, GroupCode, Cha,ChuHo,DanToc,GioiTinh,Me,NamSinh,NgayThangNamSinh,NguoiDaiDien,NhomMau,NoiDangKyKhaiSinh,NoiOHienTai,QueQuan,QuocTich,SoCMND,SoDinhDanh,SoSoHoKhau,ThuongTru,TinhTrangHonNhan,TonGiao,VoChong FROM [Identity].[Users] WHERE UserName = @UserName";
        var userRes = await _dapperRepository.QueryFirstOrDefaultAsync<UserCSDLResponse>(sqlGetUser, new
        {
            UserName = request.SoDinhDanh
        });
        if(userRes == null)
        {
            throw new NotFoundException($"Số định danh: {request.SoDinhDanh} chưa tồn tại trên hệ thống.");
        }
        if(userRes.Email != null && userRes.Email.ToLower().EndsWith("@dichvucong.gov.vn"))
        {
            userRes.Email = "";
        }
        return Result<UserCSDLResponse>.Success(userRes);
    }
}
