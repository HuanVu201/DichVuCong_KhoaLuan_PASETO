using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class CancelMultiBienLaiDienTusCommandHandler : ICommandHandler<CancelMultiBienLaiDienTusCommand, CancelMultiBienLaiDienTuResponse>
{
    private IMediator _mediator;
    private YeuCauThanhToanConstants _cauThanhToanConstants;
    private IBienLaiVNPTService _bienLaiVNPTServices;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    public CancelMultiBienLaiDienTusCommandHandler(IMediator mediator, IBienLaiVNPTService bienLaiVNPTServices, IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents)
    {
        _mediator = mediator;
        _cauThanhToanConstants = new YeuCauThanhToanConstants();
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _repositoryWithEvents = repositoryWithEvents;
    }
    public async Task<Result<CancelMultiBienLaiDienTuResponse>> Handle(CancelMultiBienLaiDienTusCommand request, CancellationToken cancellationToken)
    {
        CancelMultiBienLaiDienTuResponse res = new CancelMultiBienLaiDienTuResponse();
        res.results = new List<CancelMultiBienLaiDienTuElementResponse>();
        if (request == null) throw new ArgumentNullException(nameof(request));
        if(request.IdYeuCauThanhToans == null) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToans));
        if (request.IdYeuCauThanhToans.Count <= 0) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToans));
        foreach(var idYctt in request.IdYeuCauThanhToans)
        {
            Guid guid;
            var tryGuid = Guid.TryParse(idYctt,out guid);
            if (tryGuid == true)
            {
                var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(guid));
                if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {idYctt} không tồn tại.");
                YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
                var donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonVi));
                if (donViThuInfo.Data.LayCauHinhBienLaiTheoDonViThu == true)
                {
                    donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonViThu));
                }
                string ma = request.loaiPhi + "-" + yeuCauThanhToan.Ma;
                HuyBienLaiDienTuVNPTRequest vnptRequest = new HuyBienLaiDienTuVNPTRequest(ma, donViThuInfo.Data.CauHinhBienLaiThanhToan);
                var vnptRes = await _bienLaiVNPTServices.HuyBienLaiDienTu(vnptRequest);
                CancelMultiBienLaiDienTuElementResponse tmpRes = new CancelMultiBienLaiDienTuElementResponse();
                if (!string.IsNullOrEmpty(vnptRes))
                {
                    if (vnptRes.IndexOf("OK:") != -1)
                    {
                        var yeuCauThanhToanTmp = await _repositoryWithEvents.GetByIdAsync(idYctt, cancellationToken);
                        if(request.loaiPhi == "phi")
                        {
                            if (string.IsNullOrEmpty(yeuCauThanhToanTmp.SoBienLaiLePhi))
                            {
                                yeuCauThanhToanTmp.UpdateThongTinBienLai(string.Empty, string.Empty, null, request.loaiPhi == "phi" ? string.Empty : null, null);

                            }
                            else
                            {
                                yeuCauThanhToanTmp.UpdateThongTinBienLai(null, null, null, request.loaiPhi == "phi" ? string.Empty : null,  null);
                            }
                        }else if(request.loaiPhi == "lephi")
                        {
                            if (string.IsNullOrEmpty(yeuCauThanhToanTmp.SoBienLaiPhi))
                            {
                                yeuCauThanhToanTmp.UpdateThongTinBienLai(string.Empty, string.Empty, null,null, string.Empty);

                            }
                            else
                            {
                                yeuCauThanhToanTmp.UpdateThongTinBienLai(null,null, null, null, string.Empty);
                            }
                        }

                        await _repositoryWithEvents.UpdateAsync(yeuCauThanhToanTmp, cancellationToken);
                       
                    }

                }
                tmpRes.YeuCauThanhToanId = idYctt;
                tmpRes.MaLoi = vnptRes;
                res.results.Add(tmpRes);
            }
            else
            {
                CancelMultiBienLaiDienTuElementResponse tmpRes = new CancelMultiBienLaiDienTuElementResponse();
                tmpRes.YeuCauThanhToanId = idYctt;
                tmpRes.MaLoi = "error paser guid";
                res.results.Add(tmpRes);

            }


        }
            return Result<CancelMultiBienLaiDienTuResponse>.Success(res);
       

    }
}
