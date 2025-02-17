using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Domain.Catalog;
using System.Runtime.CompilerServices;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;

public class Service
{
    public class ImportTruongHopThuTucServiceCommand : ICommand<Guid>
    {
        public string message { get; set; }
        public string urlAPI_DanhSachTTHC { get; set; }
        public string urlAPI_ChiTietTTHC { get; set; }

        //urlAPI_DanhSachTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhSachTTHC
        //urlAPI_ChiTietTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayThuTuc?maTTHC=

    }

    public class ImportTruongHopThuTucServiceCommandHandler : ICommandHandler<ImportTruongHopThuTucServiceCommand, Guid>
    {
        private readonly ICacheService _cacheService;
        private readonly int _cacheTime = 2;
        private readonly IDapperRepository _dapperRepository;

        public ImportTruongHopThuTucServiceCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

        public async Task<Result<DefaultIdType>> Handle(ImportTruongHopThuTucServiceCommand request, CancellationToken cancellationToken)
        {

            using (var httpClient = new HttpClient())
            {
                try
                {
                    //1. Call API 1 => get list MaTTHC
                    HttpResponseMessage responseTT = await httpClient.GetAsync(request.urlAPI_DanhSachTTHC);
                    string jsonContentTT = await responseTT.Content.ReadAsStringAsync();
                    var resultsTT = JsonConvert.DeserializeObject<ImportTruongHopThuTucServiceCommand>(jsonContentTT);
                    JObject jsonObjectTT = JObject.Parse(resultsTT.message);
                    JArray arrTT = (JArray)jsonObjectTT["result"];
                    List<string> listMaTTHC = new List<string>();

                    foreach (var item in arrTT)
                    {
                        listMaTTHC.Add(item["MATTHC"].ToString());
                    }

                    int dem = 0;
                    //2. Map List MaTTHC => call API 2, lấy ra từng dữ liệu cần thiết
                    foreach (string maTTHC in listMaTTHC)
                    {
                        dem++;
                        Guid Id = Guid.NewGuid();
                        string Ten = string.Empty;
                        string Ma = maTTHC + "_1";
                        string ThuTucId = maTTHC;
                        int ThoiGianThucHien = 0;
                        string LoaiThoiGianThucHien = string.Empty;
                        bool BatBuocDinhKemKetQua = false;
                        bool YeuCauNopPhiTrucTuyen = false;
                        string DonViTiepNhanRieng = string.Empty;
                        string EForm = string.Empty;
                        string EFormTemplate = string.Empty;
                        string NodeQuyTrinh = string.Empty;
                        string EdgeQuyTrinh = string.Empty;

                        HttpResponseMessage responseCTTT = await httpClient.GetAsync(request.urlAPI_ChiTietTTHC + maTTHC);
                        string jsonContentCTTT = await responseCTTT.Content.ReadAsStringAsync();
                        var resultsCTTT = JsonConvert.DeserializeObject<ImportTruongHopThuTucServiceCommand>(jsonContentCTTT);
                        JObject jsonObjectCTTT = JObject.Parse(resultsCTTT.message);
                        JArray arrCTTT = (JArray)jsonObjectCTTT["result"];

                        foreach (var item in arrCTTT)
                        {
                            foreach (var i in item["CACHTHUCTHUCHIEN"])
                            {
                                if (i["KENH"].ToString() == "1")
                                {
                                    foreach (var j in i["THOIGIAN"])
                                    {
                                        LoaiThoiGianThucHien = j["DONVITINH"].ToString().Trim();
                                        if (LoaiThoiGianThucHien == "Ngày làm việc")
                                        {
                                            ThoiGianThucHien = Convert.ToInt32(j["THOIGIANGIAIQUYET"].ToString()) * 8;
                                        }
                                        else if (LoaiThoiGianThucHien == "Ngày")
                                        {
                                            ThoiGianThucHien = Convert.ToInt32(j["THOIGIANGIAIQUYET"].ToString()) * 24;
                                        }
                                        else
                                        {
                                            ThoiGianThucHien = 0;
                                        }
                                    }

                                    Console.WriteLine("Running: " + dem + "/" + listMaTTHC.Count() + " - " + maTTHC);
                                    string sql = GetQueryInsertOrUpdateSQL(Id, Ten, Ma, ThuTucId, ThoiGianThucHien, LoaiThoiGianThucHien, BatBuocDinhKemKetQua,
                                        YeuCauNopPhiTrucTuyen, DonViTiepNhanRieng, EForm, EFormTemplate, EdgeQuyTrinh, NodeQuyTrinh);
                                    await _dapperRepository.ExcuteAsync(sql);
                                }
                            }

                            break;
                        }
                    }

                    Console.WriteLine("\nImport and Update TruongHopThuTuc Success!");
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine("\n Exception Caught!");
                    Console.WriteLine("Message Import handle :{0} ", ex.Message);
                }
            }

            return null;
        }
    }

    private static string GetQueryInsertOrUpdateSQL(Guid? id, string? ten, string? ma, string? thuTucId, int? thoiGianThucHien,
            string? loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng,
            string? eForm, string? eFormTemplate, string? edgeQuyTrinh, string? nodeQuyTrinh)
    {
        return
            $"IF EXISTS (SELECT Ma FROM Business.TruongHopThuTucs WHERE Ma='{ma}') " +
                $"BEGIN UPDATE Business.TruongHopThuTucs " +
                $"SET " +
                $"Ten = N'{ten}', ThuTucId='{thuTucId}', ThoiGianThucHien = {thoiGianThucHien}, LoaiThoiGianThucHien = N'{loaiThoiGianThucHien}', " +
                $"BatBuocDinhKemKetQua = '{batBuocDinhKemKetQua}', YeuCauNopPhiTrucTuyen = '{yeuCauNopPhiTrucTuyen}', " +
                $"DonViTiepNhanRieng = N'{donViTiepNhanRieng}', EForm = N'{eForm}', EFormTemplate = N'{eFormTemplate}', " +
                $"EdgeQuyTrinh = N'{edgeQuyTrinh}', NodeQuyTrinh = N'{nodeQuyTrinh}'" +

                $"WHERE Ma='{ma}' " +
                $"END " +
            $"ELSE " +
                $"BEGIN " +
                $"INSERT INTO Business.TruongHopThuTucs " +
                    $"([Id], [Ten], [Ma], [ThuTucId], [ThoiGianThucHien], [LoaiThoiGianThucHien], [BatBuocDinhKemKetQua], " +
                    $"[YeuCauNopPhiTrucTuyen], [DonViTiepNhanRieng], [EForm], [EFormTemplate], [EdgeQuyTrinh], [NodeQuyTrinh]) " +
                $"VALUES " +
                    $"('{id}', N'{ten}', '{ma}', '{thuTucId}', '{thoiGianThucHien}', N'{loaiThoiGianThucHien}', '{batBuocDinhKemKetQua}', " +
                    $"'{yeuCauNopPhiTrucTuyen}', N'{donViTiepNhanRieng}', N'{eForm}', N'{eFormTemplate}', N'{edgeQuyTrinh}', N'{nodeQuyTrinh}') " +
                $"END; ";
    }
}

