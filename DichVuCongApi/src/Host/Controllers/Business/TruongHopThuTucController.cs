using DocumentFormat.OpenXml.Office2010.Excel;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System.Transactions;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using static TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class TruongHopThuTucController : VersionedApiController
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<QuyTrinhXuLy> _quyTrinhXuLy;
    public TruongHopThuTucController(IDapperRepository dapperRepository, IRepositoryWithEvents<QuyTrinhXuLy> quyTrinhXuLy)
    {
        _dapperRepository = dapperRepository;
        _quyTrinhXuLy = quyTrinhXuLy;
    }

    [Authorize]
    [HttpPost]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Thêm một trường hợp thủ tục ", "")]
    public async Task<ActionResult> Add(AddTruongHopThuTucCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("capNhatQuyTrinh")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Cập nhật lại quy trình ", "")]
    public async Task<ActionResult> CapNhatQuyTrinh()
    {
        using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        {
            IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
            Timeout = TransactionManager.MaximumTimeout
        }, TransactionScopeAsyncFlowOption.Enabled))
        {
            try
            {
                var truongHopThuTucs = await _dapperRepository.QueryAsync<TruongHopThuTuc>("Select * from Business.TruongHopThuTucs WHERE DeletedOn is null");
                var sqlUpdateTruongHopThuTuc = "UPDATE Business.TruongHopThuTucs set NodeQuyTrinh = @NodeQuyTrinh, ThoiGianThucHienTrucTuyen = @ThoiGianThucHienTrucTuyen WHERE id = @Id";
                var sqlUpdateQuyTrinhXuLy = "UPDATE Business.QuyTrinhXuLys set ThoiGianThucHienTrucTuyen = @ThoiGianThucHienTrucTuyen WHERE id = @Id";
                var updateSucceedTHTTCount = 0;
                var updateSucceedQTXLCount = 0;
                var updateSucceedTHTTCountEmpty = 0;
                for (int i = 0; i < truongHopThuTucs.Count; i++)
                {
                    var truongHopThuTuc = truongHopThuTucs[i];
                    Console.WriteLine("truongHopThuTuc " + truongHopThuTuc.Id);
                    if (string.IsNullOrEmpty(truongHopThuTuc.NodeQuyTrinh))
                    {
                        updateSucceedTHTTCountEmpty += 1;
                        continue;
                    }
                    var data = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
                    string outputJson = string.Empty;
                    var newQuyTrinhXuLys = new List<ReactFlowNodeQuyTrinhXuLy>();
                    for (int j = 0; j < data.Count; j++)
                    {
                        var quyTrinhXuLy = data[j];
                        quyTrinhXuLy.data.thoiGianThucHienTrucTuyen = quyTrinhXuLy.data.thoiGianXuLy;
                        quyTrinhXuLy.deletable = (quyTrinhXuLy.data.maTrangThaiHoSo == "2" || quyTrinhXuLy.data.maTrangThaiHoSo == "9") ? false : true; 
                        newQuyTrinhXuLys.Add(quyTrinhXuLy);
                    }
                    outputJson = JsonConvert.SerializeObject(newQuyTrinhXuLys);
                    var res = await _dapperRepository.ExcuteAsync(sqlUpdateTruongHopThuTuc, new
                    {
                        NodeQuyTrinh = outputJson,
                        ThoiGianThucHienTrucTuyen = truongHopThuTuc.ThoiGianThucHien,
                        Id = truongHopThuTuc.Id,
                    });
                    updateSucceedTHTTCount += res;
                }
                if (updateSucceedTHTTCount + updateSucceedTHTTCountEmpty != truongHopThuTucs.Count)
                {
                    transactionScope.Dispose();
                }

                var quyTrinhXuLys = await _dapperRepository.QueryAsync<QuyTrinhXuLy>("Select * from Business.QuyTrinhXuLys WHERE DeletedOn is null");
                for (int i = 0; i < quyTrinhXuLys.Count; i++)
                {
                    var quyTrinhXuLy = quyTrinhXuLys[i];
                    Console.WriteLine("quyTrinhXuLy " + quyTrinhXuLy.Id);

                    var res = await _dapperRepository.ExcuteAsync(sqlUpdateQuyTrinhXuLy, new
                    {
                        ThoiGianThucHienTrucTuyen = quyTrinhXuLy.ThoiGianXuLy,
                        Id = quyTrinhXuLy.Id,
                    });
                    updateSucceedQTXLCount += res;
                }
                if (updateSucceedQTXLCount != quyTrinhXuLys.Count)
                {
                    transactionScope.Dispose();
                }
                transactionScope.Complete();
                return Ok(new
                {
                    updateSucceedTHTTCount = updateSucceedTHTTCount,
                    updateSucceedTHTTEmptyCount = updateSucceedTHTTCountEmpty,
                    totalTHTT = truongHopThuTucs.Count,
                    updateSucceedQTXLCount = updateSucceedQTXLCount,
                    totalQTXL = quyTrinhXuLys.Count,
                });
            } catch(Exception ex)
            {
                transactionScope.Dispose();
                return StatusCode(500, ex.Message);
            }

        }
    }

    [Authorize]
    [HttpPost("Duplicate")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Nhân bản một trường hợp thủ tục ", "")]
    public async Task<ActionResult> Copy(DuplicateTruongHopThuTuc req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("/api/importTruongHopThuTuc")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Insert/Update TruongHopThuTucs", "")]
    public async Task<ActionResult> ImportTruongHopThutucFromDVCQuocGia(ImportTruongHopThuTucServiceCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu trường hợp thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchTruongHopThuTucQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("SearchTheoDonVi")]
    [OpenApiOperation("Lấy dữ liệu trường hợp thủ tục theo đơn vị", "")]
    public async Task<ActionResult> SearchTheoDonVi([FromQuery] SearchTruongHopThuTucTheoDonViQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("DuLieuThemHoSo")]
    [OpenApiOperation("Lấy dữ liệu danh sách phí lệ phí, danh sách thành phần thủ tục, chi tiết trường hợp thủ tục theo mã trường hợp thủ tục", "")]
    public async Task<ActionResult> GetDuLieuThemHoSo(GetDuLieuThemHoSo req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    [OpenApiOperation("Lấy dữ liệu trường hợp thủ tục theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetTruongHopThuTucQuery(id));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("HoSo/{id}")]
    [OpenApiOperation("Lấy dữ liệu trường hợp thủ tục theo hồ sơ id", "")]
    public async Task<ActionResult> GetByHoSo(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetTruongHopThuTucByHoSoQuery(id));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("maTruongHop/{maTruongHop}")]
    [OpenApiOperation("Lấy dữ liệu trường hợp thủ tục theo mã trường hợp", "")]
    public async Task<ActionResult> GetTruongHopThuTucByMa(string maTruongHop)
    {
        try
        {
            var res = await Mediator.Send(new GetTruongHopThuTucByMaTruongHop(maTruongHop));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Sửa một trường hợp thủ tục", "")]
    public async Task<ActionResult> Update(UpdateTruongHopThuTucCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một trường hợp thủ tục ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTruongHopThuTucCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPatch("{id:guid}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("khôi phục một trường hợp thủ tục ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreTruongHopThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
