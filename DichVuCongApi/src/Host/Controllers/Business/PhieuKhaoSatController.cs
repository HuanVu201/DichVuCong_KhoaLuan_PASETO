using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class PhieuKhaoSatController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một phiếu khảo sát ", "")]
    public async Task<ActionResult> Add(AddPhieuKhaoSatCommand req)
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
    [OpenApiOperation("Lấy dữ liệu phiếu khảo sát theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchPhieuKhaoSatQuery req)
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
    [HttpGet("ExportExcelBaoCao01")]
    [OpenApiOperation("Xuất file Excel báo cáo 01", "")]
    public async Task<ActionResult> ExportExcelBaoCao01([FromQuery] ExportExcelBaoCao01Querry req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return new FileStreamResult(res.StreamData,res.ContentType);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("baocao01")]
    [OpenApiOperation("Lấy dữ liệu mẫu báo cáo 01 theo bộ lọc", "")]
    public async Task<ActionResult> SearchBaoCao01([FromQuery] SearchBaoCao01Query req)
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
    [HttpGet("chitietbaocao1/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetBaoCao01Query(id));
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một đánh giá hài lòng ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeletePhieuKhaoSatCommand req, DefaultIdType id)
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
    [HttpPut]
    [OpenApiOperation("Sửa một đánh giá hài lòng theo mã hồ sơ", "")]
    public async Task<ActionResult> Update(UpdatePhieuKhaoSatCommand req, string maHoSo)
    {
        try
        {
            req.MaHoSo = maHoSo;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }



    [AllowAnonymous]
    [HttpGet("{maHoSo}")]
    [OpenApiOperation("Lấy dữ liệu phiesu khảo sát theo mã hồ sơ", "")]
    public async Task<ActionResult> GetPhieuKhaoSatByMHS(string maHoSo)
    {
        try
        {
            var res = await Mediator.Send(new GetPhieuKhaoSatByMHS(maHoSo));
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu phiesu khảo sát theo mã Id", "")]
    public async Task<ActionResult> GetPhieuKhaoSatDetail(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetPhieuKhaoSatQuery(id));
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

    /*  

    



       [Authorize]
       [HttpPatch("{id:guid}")]
       [OpenApiOperation("khôi phục một đánh giá hài lòng ", "")]
       public async Task<ActionResult> Restore(DefaultIdType id)
       {
           try
           {
               var res = await Mediator.Send(new RestorePhieuKhaoSatCommand(id));
               return Ok(res);
           }
           catch (Exception ex)
           {
               return StatusCode(500, ex.Message);
           }
       }*/
}
