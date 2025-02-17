using Ardalis.Specification;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.VariantTypes;
using Mapster;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Application.ChatBot.Command;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using static TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG.KhoSoHoaDVCQGParams;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.DVC.KhoSoHoaDVCQG;
public class KhoSoHoaDVCQGService : IKhoSoHoaDVCQGService
{
    private readonly KhoSoHoaDVCQGSettings _settings;
    private readonly IRepository<ThanhPhanThuTuc> _thanhPhanThuTucRepo;
    private readonly IReadRepository<ThuTuc> _thuTucRepo;
    private readonly ILogger<KhoSoHoaDVCQGService> _logger;
    private readonly ICurrentUser _currentUser;
    private readonly IMinioService _minioService;
    private readonly IMediator _mediator;

    public KhoSoHoaDVCQGService(
        IOptions<KhoSoHoaDVCQGSettings> options,
        ILogger<KhoSoHoaDVCQGService> logger,
        ICurrentUser currentUser,
        IMinioService minioService,
        IRepository<ThanhPhanThuTuc> thanhPhanThuTucRepo,
        IReadRepository<ThuTuc> thuTucRepo,
        IMediator mediator
    )
    {
        _settings = options.Value;
        _logger = logger;
        _currentUser = currentUser;
        _thanhPhanThuTucRepo = thanhPhanThuTucRepo;
        _minioService = minioService;
        _thuTucRepo = thuTucRepo;
        _mediator = mediator;
    }
    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string url)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }

    public async Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCongDan(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanRequest req)
    {
        var reqBody = new KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest();
        reqBody.KenhThucHien = "2";
        reqBody.SoDinhDanhChuSoHuu = _currentUser.GetUserName();
        reqBody.SoDinhDanhNguoiYeuCau = _currentUser.GetUserName();
        reqBody.HoTenNguoiYeuCau = _currentUser.GetUserFullName();
        reqBody.MaThuTuc = req.MaThuTuc;
        reqBody.DanhSachDanhMucKetQua = req.DanhSachDanhMucKetQua;
        var res = await RequestHandler<KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest, KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse>(reqBody, _settings.GetKetQuaGiayTo);
        if (res != null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Success(data: res.result.DanhSachGiayToKetQua);
        }
        throw new Exception("Không tìm thấy dữ liệu");
    }
    public async Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCanBo(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoRequest req)
    {
        var reqBody = new KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest();
        reqBody.KenhThucHien = "1";
        reqBody.SoDinhDanhChuSoHuu = req.SoDinhDanhChuSoHuu;
        reqBody.SoDinhDanhNguoiYeuCau = req.SoDinhDanhChuSoHuu;
        reqBody.HoTenNguoiYeuCau = _currentUser.GetUserFullName();
        reqBody.MaThuTuc = req.MaThuTuc;
        reqBody.DanhSachDanhMucKetQua = req.DanhSachDanhMucKetQua;
        var res = await RequestHandler<KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest, KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse>(reqBody, _settings.GetKetQuaGiayTo);
        if(res != null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Success(data: res.result.DanhSachGiayToKetQua);
        }
        throw new Exception("Không tìm thấy dữ liệu");
    }
    private class DanhMucKetQuaTPTT
    {
        public string Ma { get; set; }
    }
    private class DanhMucKetQuaThuTuc
    {
        public string GoiTinThuTucQG { get; set; }
        public string MaKetQuaChinh { get; set; }
    }
    private class GetDanhMucKetQuaTPTT : Specification<ThanhPhanThuTuc, DanhMucKetQuaTPTT>
    {
        public GetDanhMucKetQuaTPTT(string maTTHC)
        {
            Query.Where(x => x.ThuTucId == maTTHC).AsNoTracking();
        }
    }
    private class GetDanhMucKetQuaThuTuc : Specification<Domain.Catalog.ThuTuc, DanhMucKetQuaThuTuc>
    {
        public GetDanhMucKetQuaThuTuc(string maTTHC)
        {
            Query.Where(x => x.MaTTHC == maTTHC).AsNoTracking();
        }
    }

    public async Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCongDanWithoutDanhMucKQ(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanWithoutDanhMucRequest req)
    {
        var reqBody = new KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest();
        reqBody.KenhThucHien = "2";
        reqBody.SoDinhDanhChuSoHuu = _currentUser.GetUserName();
        reqBody.SoDinhDanhNguoiYeuCau = _currentUser.GetUserName();
        reqBody.HoTenNguoiYeuCau = _currentUser.GetUserFullName();
        reqBody.MaThuTuc = req.MaThuTuc;

        var danhMucKetQua = await _thuTucRepo.FirstOrDefaultAsync<DanhMucKetQuaThuTuc>(new GetDanhMucKetQuaThuTuc(req.MaThuTuc));
        if(danhMucKetQua == null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Fail("Thủ tục hiện tại không có danh mục mã kết quả cho thành phần");
        }
        try
        {
            var goiTin = JsonConvert.DeserializeObject<AddThuTucCommand>(danhMucKetQua.GoiTinThuTucQG);

            reqBody.DanhSachDanhMucKetQua = goiTin.KETQUATHUCHIEN.Select(x => new DanhSachDanhMucKetQuaData()
            {
                MaKetQua = x.MAKETQUA,
                SoKyHieu = string.Empty
            }).ToList();

        }
        catch (Exception ex)
        {
            reqBody.DanhSachDanhMucKetQua =
            [
                new DanhSachDanhMucKetQuaData()
                {
                    MaKetQua = danhMucKetQua.MaKetQuaChinh,
                    SoKyHieu = string.Empty
                },
            ];
        }
        
        var res = await RequestHandler<KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest, KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse>(reqBody, _settings.GetKetQuaGiayTo);
        if (res != null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Success(data: res.result.DanhSachGiayToKetQua);
        }
        throw new Exception("Không tìm thấy dữ liệu");
    }

    public async Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCanBoWithoutDanhMucKQ(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoWithoutDanhMucRequest req)
    {
        var reqBody = new KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest();
        reqBody.KenhThucHien = "2";
        reqBody.SoDinhDanhChuSoHuu = req.SoDinhDanhChuSoHuu;
        reqBody.SoDinhDanhNguoiYeuCau = req.SoDinhDanhChuSoHuu;
        reqBody.HoTenNguoiYeuCau = _currentUser.GetUserFullName();
        reqBody.MaThuTuc = req.MaThuTuc;

        var danhMucKetQua = await _thuTucRepo.FirstOrDefaultAsync<DanhMucKetQuaThuTuc>(new GetDanhMucKetQuaThuTuc(req.MaThuTuc));
        if (danhMucKetQua == null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Fail("Thủ tục hiện tại không có danh mục mã kết quả cho thành phần");
        }
        try
        {
            var goiTin = JsonConvert.DeserializeObject<AddThuTucCommand>(danhMucKetQua.GoiTinThuTucQG);

            reqBody.DanhSachDanhMucKetQua = goiTin.KETQUATHUCHIEN.Select(x => new DanhSachDanhMucKetQuaData()
            {
                MaKetQua = x.MAKETQUA,
                SoKyHieu = string.Empty
            }).ToList();

        }
        catch (Exception ex)
        {
            reqBody.DanhSachDanhMucKetQua =
            [
                new DanhSachDanhMucKetQuaData()
                {
                    MaKetQua = danhMucKetQua.MaKetQuaChinh,
                    SoKyHieu = string.Empty
                },
            ];
        }

        var res = await RequestHandler<KhoSoHoaDVCQGParams.GetDanhSachKetQuaRequest, KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse>(reqBody, _settings.GetKetQuaGiayTo);
        if (res != null)
        {
            return Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>.Success(data: res.result.DanhSachGiayToKetQua);
        }
        throw new Exception("Không tìm thấy dữ liệu");
    }

    private async Task<string> HandleUploadFile(GetKetQuaByURLRequestBodyDVCQGWithTenTep req)
    {
        var reqBody = req.Adapt<GetKetQuaByURLRequestBodyDVCQG>();
        var base64 = await RequestHandler<KhoSoHoaDVCQGParams.GetKetQuaByURLRequestBodyDVCQG, string>(reqBody, _settings.GetGiayToByUrl);
        if (string.IsNullOrEmpty(base64))
        {
            throw new Exception("Có lỗi xáy ra khi lấy tệp đính kèm từ DVCQG");
        }
        var dinhKem = await _minioService.UploadFileAsBase64Async(base64, req.TenTep, null, "KhoSoHoaDVCQG");
        return dinhKem;
    }
    public async Task<Result<List<string>>> GetKetQuaByUrl(KhoSoHoaDVCQGParams.GetKetQuaByURLRequest req)
    {
        if(req.DanhSachTepDinhKem == null || !req.DanhSachTepDinhKem.Any())
        {
            return Result<List<string>>.Fail("Danh sách đường dẫn file không hợp lệ.");
        }
        var tasks = req.DanhSachTepDinhKem.Select(data =>
        {
            var reqBody = new GetKetQuaByURLRequestBodyDVCQGWithTenTep()
            {
                DuongDan = data.DuongDan,
                CoQuanChuQuan = req.CoQuanChuQuan,
                TenTep = data.TenTep,
            };
            return HandleUploadFile(reqBody);
        }).ToList();

        var dinhKemMCDT = await Task.WhenAll(tasks);
        return Result<List<string>>.Success(dinhKemMCDT.ToList());
    }

    public async Task<Result<List<UploadResult>>> GetListKetQuaByUrl(GetListKetQuaByUrlRequest req)
    {
        if (req.DanhSachKetQuas == null || !req.DanhSachKetQuas.Any())
        {
            return Result<List<UploadResult>>.Fail("Vui lòng cung cấp danh sách kết quả");
        }

        var uploadResults = new List<UploadResult>();
        for (int i = 0; i < req.DanhSachKetQuas.Count; i++)
        {
            var ketQua = req.DanhSachKetQuas[i];
            if (ketQua.DanhSachTepDinhKem.Any())
            {
                for (int j = 0; j < ketQua.DanhSachTepDinhKem.Count; j++)
                {
                    var tepDinhKem = ketQua.DanhSachTepDinhKem[j];
                    
                    
                    try
                    {
                        var reqBody = new GetKetQuaByURLRequestBodyDVCQGWithTenTep
                        {
                            DuongDan = tepDinhKem.DuongDan,
                            CoQuanChuQuan = ketQua.CoQuanChuQuan,
                            TenTep = tepDinhKem.TenTep
                        };
                        var uploadedPath = await HandleUploadFile(reqBody);

                        var addTaiLieuCommand = new AdminAddTaiLieuKhoLuuTruCongDanCommand()
                        {
                            DuongDan = uploadedPath,
                            LoaiGiayToId = null,
                            SoGiayToChuHoSo = req.SoGiayToChuHoSo,
                            Nguon = req.Nguon,
                            TenGiayTo = ketQua.TenGiayTo
                        };
                        var addTaiLieuRes =await _mediator.Send(addTaiLieuCommand);
                        if (addTaiLieuRes.Succeeded)
                        {
                            uploadResults.Add(new UploadResult
                            {
                                CoQuanChuQuan = ketQua.CoQuanChuQuan,
                                FileName = tepDinhKem.TenTep,
                                Path = uploadedPath,
                                IsSucceed = true,
                                SoKyHieu = ketQua.SoKyHieu
                            });
                        } else
                        {
                            uploadResults.Add(new UploadResult
                            {
                                CoQuanChuQuan = ketQua.CoQuanChuQuan,
                                FileName = tepDinhKem.TenTep,
                                Error = addTaiLieuRes.Message,
                                SoKyHieu = ketQua.SoKyHieu,
                                IsSucceed = false
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        uploadResults.Add(new UploadResult
                        {
                            CoQuanChuQuan = ketQua.CoQuanChuQuan,
                            FileName = tepDinhKem.TenTep,
                            Error = ex.Message,
                            SoKyHieu = ketQua.SoKyHieu,
                            IsSucceed = false
                        });
                    }
                }
            }
        }

        return Result<List<UploadResult>>.Success(uploadResults);
    }
}
