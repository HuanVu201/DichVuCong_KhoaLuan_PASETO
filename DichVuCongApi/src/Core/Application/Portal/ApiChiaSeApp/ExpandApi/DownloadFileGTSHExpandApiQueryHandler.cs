using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Catalog.FileApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;

public class DownloadFileGTSHExpandApiQueryHandler : IRequestHandler<DownloadFileGTSHExpandApiQuery, Result<List<FileRes>>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IMinioService _minioService;

    public DownloadFileGTSHExpandApiQueryHandler(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService)
    {

        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _minioService = minioService;
    }
    public async Task<Result<List<FileRes>>> Handle(DownloadFileGTSHExpandApiQuery request, CancellationToken cancellationToken)
    {
        List<FileRes> fileStreams = new List<FileRes>();
        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<List<FileRes>>.Fail(res.Message);
            }

            try
            {
                string sqlQuery = @"SELECT DinhKem
                          FROM Business.GiayToSoHoas
                          where MaDinhDanh = @MaDinhDanh";
                var resGTSH = await _dapperRepository.QueryAsync<GiayToSoHoaDto>(sqlQuery, new { MaDinhDanh = request.MaDinhDanh });

                if (resGTSH.Count > 0)
                {
                    foreach (var item in resGTSH)
                    {
                        if (!string.IsNullOrEmpty(item.DinhKem))
                        {
                            if (item.DinhKem.Contains("##"))
                            {
                                var newArr = item.DinhKem.Split("##");
                                foreach (var dinhKem in newArr)
                                {
                                    var fileRes = await _minioService.GetFileByKey2Async("", dinhKem);

                                    if (fileRes != null)
                                    {
                                        fileStreams.Add(fileRes);
                                    }
                                }
                            }
                            else
                            {
                                var fileRes = await _minioService.GetFileByKey2Async("", item.DinhKem);

                                if (fileRes != null)
                                {
                                    fileStreams.Add(fileRes);
                                }

                            }
                        }
                    }
                }
                else
                {
                    return Result<List<FileRes>>.Fail("Không có file đính kèm nào!");
                }
            }
            catch (Exception ex)
            {
                return Result<List<FileRes>>.Fail("Lỗi xử lý tải đính kèm file: " + ex);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<List<FileRes>>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");

        }
        return Result<List<FileRes>>.Success(fileStreams);
    }
}
