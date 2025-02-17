using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;


public class QuyTrinhXuLyLowerCase
{
    public DefaultIdType id { get; set; }
    public DefaultIdType truongHopId { get; set; }
    public string tenBuocXuLy { get; set; }
    public double thoiGianXuLy { get; set; }
    public double? thoiGianThucHienTrucTuyen { get; set; }
    public string loaiThoiGian { get; set; }
    public string? loaiBuoc { get; set; }
    public string? tenNhomNguoiDung { get; set; }
    public DefaultIdType? nhomNguoiDungId { get; set; }
    public string? tenTrangThaiHoSo { get; set; }
    public string? maTrangThaiHoSo { get; set; }
    public bool? yeuCauCoKetQuaBuocTruoc { get; set; } = false;
    public bool? laBuocTuChuyen { get; set; } = false;
    public bool? choPhepChuyenLaiBuocTruoc { get; set; } = false;
    public bool? guiLienThongQLVB { get; set; }
    public bool? guiEmail { get; set; }
    public string? bieuMauEmail { get; set; }
    public bool? guiSMS { get; set; }
    public string? bieuMauSMS { get; set; }
    public string? loaiDuLieuKetNoi { get; set; }
    public string? trangThaiChiTiet { get; set; }
}
public class ReactFlowNodeQuyTrinhXuLy
{
    public QuyTrinhXuLyLowerCase data { get; set; }
    public ReactFlowNodeQuyTrinhXuLy_Position position { get; set; }
    public ReactFlowNodeQuyTrinhXuLy_Position positionAbsolute { get; set; }
    public string? type { get; set; }
    public string? id { get; set; }
    public bool deletable { get; set; }
    public int width { get; set; }
    public int height { get; set; }
    public bool selected { get; set; }
    public bool dragging { get; set; }
}
public class ReactFlowNodeQuyTrinhXuLy_Position
{
    public double x { get; set; }
    public double y { get; set; }
}

public class ReactFlowEdgeQuyTrinhXuLy
{
    public string? source { get; set; }
    public string? target { get; set; }
    public string? label { get; set; }


}

public class ThayDoiTruongHopThuTucHoSoCommandHandler : ICommandHandler<ThayDoiTruongHopThuTucHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepository<HoSo> _repositoryHoSo;

    public ThayDoiTruongHopThuTucHoSoCommandHandler(IInjectConfiguration iInjectConfiguration, IDapperRepository dapperRepository, ICurrentUser user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<NgayNghi> repositoryNgayNghi, IRepository<HoSo> repositoryHoSo)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _iInjectConfiguration = iInjectConfiguration;
    }

    public async Task<Result> Handle(ThayDoiTruongHopThuTucHoSoCommand request, CancellationToken cancellationToken)
    {
        var userFullName = _user.GetUserFullName();
        var userId = _user.GetUserId();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id, ThoiGianThucHienTrucTuyen FROM Business.TruongHopThuTucs WHERE Id = @TruongHopThuTucId";
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.HoSoId, cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.HoSoId} chưa được thêm vào hệ thống");
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, request);
        if (truongHopThuTuc == null)
        {
            throw new NotFoundException($"TruongHopThuTuc với mã: {request.TruongHopThuTucId} chưa được thêm vào hệ thống");
        }
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);

        var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
        var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
        var startNode = nodeQuyTrinhs.Find(node => node.type == "startNode");
        //var currentStartNodeEdge = edgeQuyTrinhs.FindAll(edge => edge.source == startNode.id).Select(x => x.target);

        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
        try
        {

            var caculateTime = new CaculateTime(_iInjectConfiguration);
            double soGioMacDinhBuocXuLy = caculateTime.GetThoiGianXuLy(truongHopThuTuc, hoSo.KenhThucHien);
            var ngayHetHanBuocXuLy = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, soGioMacDinhBuocXuLy, truongHopThuTuc.LoaiThoiGianThucHien);
            var updatedHoSo = new HoSo();
            if (truongHopThuTuc.KhongCoNgayHenTra == true)
            {
                updatedHoSo = hoSo.ThayDoiTruongHop(startNode.data.tenBuocXuLy, startNode.id, truongHopThuTuc.Ten, truongHopThuTuc.Ma, truongHopThuTuc.Id.ToString(), null, null, null);
            }
            else
            {
                updatedHoSo = hoSo.ThayDoiTruongHop(startNode.data.tenBuocXuLy, startNode.id, truongHopThuTuc.Ten, truongHopThuTuc.Ma, truongHopThuTuc.Id.ToString(), ngayHetHanBuocXuLy, truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
            }
            await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
            // startnode id ở đây lưu id của node chuyển tới
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, startNode.id, truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien, ngayHetHanBuocXuLy, userId.ToString(), userFullName, "", "", currentTime, thaoTac: "Thay đổi trường hợp thủ tục", trangThai: "2");
            quaTrinhXuLyHoSo.SoftDelete();
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            //transactionScope.Complete();
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        //}
    }
}
