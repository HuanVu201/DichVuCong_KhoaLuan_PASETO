using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
using TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public class DuplicateTruongHopThuTucHandler : ICommandHandler<DuplicateTruongHopThuTuc>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IRepositoryWithEvents<TruongHopThuTuc> _repositoryTHTT;
    private readonly IRepositoryWithEvents<QuyTrinhXuLy> _repositoryQTXL;
    private readonly IRepositoryWithEvents<ThanhPhanThuTuc> _repositoryTPTT;
    public DuplicateTruongHopThuTucHandler(IDapperRepository dapperRepository, IMediator mediator, IRepositoryWithEvents<TruongHopThuTuc> repositoryTHTT, IRepositoryWithEvents<QuyTrinhXuLy> repositoryQTXL, IRepositoryWithEvents<ThanhPhanThuTuc> repositoryTPTT) {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _repositoryTHTT = repositoryTHTT;
        _repositoryQTXL= repositoryQTXL;
        _repositoryTPTT = repositoryTPTT;
    } 
    public async Task<Result> Handle(DuplicateTruongHopThuTuc request, CancellationToken cancellationToken)
    {
        DefaultIdType newIdTHTT = Guid.NewGuid();
        if(request.id == null) throw new ArgumentNullException(nameof(request.id));
        var existItem = await _mediator.Send(new GetTruongHopThuTucQuery(request.id), cancellationToken);
        if (existItem.Data == null) throw new Exception($"Không tồn tại trường hợp thủ tục id: {request.id}");
        var existTruongHopThuTuc = existItem.Data;
        SearchTruongHopThuTucQuery searchTruongHopThuTuc = new SearchTruongHopThuTucQuery();
        searchTruongHopThuTuc.ThuTucId = existTruongHopThuTuc.ThuTucId;
        searchTruongHopThuTuc.PageNumber = 1;
        searchTruongHopThuTuc.PageSize = 100;
        searchTruongHopThuTuc.Removed = null;
        var existTruongHopThuTucs = await _mediator.Send(searchTruongHopThuTuc, cancellationToken);
        string nodeQuyTrinh = existTruongHopThuTuc.NodeQuyTrinh;
        string edgeQuyTrinh = existTruongHopThuTuc.EdgeQuyTrinh;
        string newMa = existTruongHopThuTuc.ThuTucId + "_1";
        if (existTruongHopThuTucs.Data != null)
        {
            newMa = existTruongHopThuTuc.ThuTucId + "_" + (existTruongHopThuTucs.Data.Count +1);
        }
      
        // Duplicate QuyTrinhXuLys
        var searchQuyTrinhXuLyQuery = new SearchQuyTrinhXuLyQuery();
        searchQuyTrinhXuLyQuery.PageNumber = 1;
        searchQuyTrinhXuLyQuery.PageSize = 100;
        searchQuyTrinhXuLyQuery.TruongHopId = existTruongHopThuTuc.Id;
        var quyTrinhXuLys = await _mediator.Send(searchQuyTrinhXuLyQuery);
        if(quyTrinhXuLys.Data != null)
        {
            var addQuyTrinhXuLyCommand = new AddQuyTrinhXuLyCommand();
            addQuyTrinhXuLyCommand.QuyTrinhs = new List<QuyTrinhParams>();
            foreach(var quyTrinhXuLy in quyTrinhXuLys.Data)
            {
                var newId = Guid.NewGuid();
                var quyTrinhParams = new QuyTrinhParams(newId, newIdTHTT, quyTrinhXuLy.TenBuocXuLy,
                    quyTrinhXuLy.ThoiGianXuLy, quyTrinhXuLy.LoaiThoiGian, quyTrinhXuLy.LoaiBuoc, quyTrinhXuLy.TenNhomNguoiDung, quyTrinhXuLy.TenTrangThaiHoSo, quyTrinhXuLy.NhomNguoiDungId,
                    quyTrinhXuLy.MaTrangThaiHoSo, quyTrinhXuLy.YeuCauCoKetQuaBuocTruoc, quyTrinhXuLy.ChoPhepChuyenLaiBuocTruoc, quyTrinhXuLy.GuiLienThongQLVB, quyTrinhXuLy.GuiEmail, quyTrinhXuLy.BieuMauEmail,
                    quyTrinhXuLy.GuiSMS, quyTrinhXuLy.BieuMauSMS, quyTrinhXuLy.ThoiGianThucHienTrucTuyen);
                addQuyTrinhXuLyCommand.QuyTrinhs.Add(quyTrinhParams);
                nodeQuyTrinh= Regex.Replace(nodeQuyTrinh, quyTrinhXuLy.Id.ToString(), newId.ToString());
                edgeQuyTrinh = Regex.Replace(edgeQuyTrinh, quyTrinhXuLy.Id.ToString(), newId.ToString());
            }
            
            await _mediator.Send(addQuyTrinhXuLyCommand);
        }
        // Duplicate ThanhPhanThuTucs
        var searchThanhPhanThuTucs = new SearchThanhPhanThuTucQuery();
        searchThanhPhanThuTucs.TruongHopId = existTruongHopThuTuc.Ma;
        searchThanhPhanThuTucs.PageNumber = 1;
        searchThanhPhanThuTucs.PageSize = 100;
        var thanhPhanThuTucs = await _mediator.Send(searchThanhPhanThuTucs);
        if(thanhPhanThuTucs.Data != null)
        {
            List<ThanhPhanThuTuc> addThanhPhanThuTucs = new List<ThanhPhanThuTuc>();
            foreach(var tptt in thanhPhanThuTucs.Data)
            {
                var addTPTT = new ThanhPhanThuTuc(tptt.Ten, tptt.Ma, tptt.ThuTucId, newMa, tptt.MaGiayToKhoQuocGia, tptt.DinhKem, tptt.BatBuoc, tptt.SoBanChinh, tptt.SoBanSao, tptt.ChoPhepThemToKhai);
                addThanhPhanThuTucs.Add(addTPTT);
            }
            await _repositoryTPTT.AddRangeAsync(addThanhPhanThuTucs);
        }
        var truongHopThuTuc = TruongHopThuTuc.Create(newIdTHTT, existTruongHopThuTuc.Ten,
          newMa, existTruongHopThuTuc.ThuTucId, existTruongHopThuTuc.ThoiGianThucHien.Value,
          existTruongHopThuTuc.LoaiThoiGianThucHien,
          existTruongHopThuTuc.BatBuocDinhKemKetQua,
          existTruongHopThuTuc.YeuCauNopPhiTrucTuyen,
          existTruongHopThuTuc.DonViTiepNhanRieng,
          existTruongHopThuTuc.EForm,
          existTruongHopThuTuc.EFormTemplate,
          existTruongHopThuTuc.BatBuocKySoKetQua,
          existTruongHopThuTuc.AnThongTinLienHeNopTrucTuyen,
          existTruongHopThuTuc.KhongCoNgayHenTra,
          existTruongHopThuTuc.KhongThuBanGiay,
          existTruongHopThuTuc.ChoChuyenPhiDiaGioi,
          existTruongHopThuTuc.ThoiGianThucHienTrucTuyen,
         nodeQuyTrinh,
          edgeQuyTrinh,
          existTruongHopThuTuc.ChoPhepNopUyQuyen,
          existTruongHopThuTuc.MaSoBieuMau
          );

        var thtt = await _repositoryTHTT.AddAsync(truongHopThuTuc, cancellationToken);
        return Result<TruongHopThuTuc>.Success(thtt);
    }
}
