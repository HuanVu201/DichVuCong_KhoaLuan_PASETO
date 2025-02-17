using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using static TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp;

public class Service
{
    public class ImportPhiLePhiServiceCommand : ICommand<Guid>
    {
        public string message { get; set; }
        public string urlAPI_DanhSachTTHC { get; set; }
        public string urlAPI_ChiTietTTHC { get; set; }

        //urlAPI_DanhSachTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhSachTTHC
        //urlAPI_ChiTietTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayThuTuc?maTTHC=
    }

    public class ImportPhiLePhiServiceCommandHandler : ICommandHandler<ImportPhiLePhiServiceCommand, Guid>
    {
        private readonly ICacheService _cacheService;
        private readonly int _cacheTime = 2;
        private readonly IDapperRepository _dapperRepository;

        public ImportPhiLePhiServiceCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

        public async Task<Result<DefaultIdType>> Handle(ImportPhiLePhiServiceCommand request, CancellationToken cancellationToken)
        {
            using (var httpClient = new HttpClient())
            {
                try
                {
                    //1. Call API 1 => get list MaTTHC
                    HttpResponseMessage responseTT = await httpClient.GetAsync(request.urlAPI_DanhSachTTHC);
                    string jsonContentTT = await responseTT.Content.ReadAsStringAsync();
                    var resultsTT = JsonConvert.DeserializeObject<ImportPhiLePhiServiceCommand>(jsonContentTT);
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
                        Console.WriteLine("Running: " + dem + "/" + listMaTTHC.Count() + " - " + maTTHC);

                        Guid Id = Guid.Empty;
                        string Ten = string.Empty;
                        string Ma = string.Empty;
                        string ThuTucId = maTTHC;
                        string TruongHopId = maTTHC + "_1";
                        string Loai = string.Empty;
                        int SoTien = 0;
                        string DonVi = string.Empty;
                        string MoTa = string.Empty;
                        string DinhKem = string.Empty;

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
                                        foreach (var k in j["PHILEPHI"])
                                        {
                                            Id = Guid.NewGuid();

                                            Ma = k["MAPHILEPHI"].ToString();

                                            if (k["MAPHILEPHI"].ToString() == "1'")
                                            {
                                                Loai = "Phí";
                                            }
                                            else if (k["MAPHILEPHI"].ToString() == "2'")
                                            {
                                                Loai = "Lệ phí";
                                            }
                                            else
                                            {
                                                Loai = string.Empty;
                                            }

                                            if (!string.IsNullOrEmpty(k["SOTIEN"].ToString()))
                                            {
                                                if (k["SOTIEN"].ToString().Trim().ToLower() == "không")
                                                {
                                                    SoTien = 0;
                                                }
                                                else
                                                {
                                                    SoTien = Convert.ToInt32(k["SOTIEN"].ToString().Replace(".", ""));
                                                }
                                            }
                                            else
                                            {
                                                SoTien = 0;
                                            }

                                            if (!string.IsNullOrEmpty(k["DONVI"].ToString()))
                                            {
                                                DonVi = k["DONVI"].ToString();
                                            }
                                            else
                                            {
                                                DonVi = string.Empty;
                                            }

                                            if (!string.IsNullOrEmpty(k["MOTA"].ToString()))
                                            {
                                                MoTa = k["MOTA"].ToString();
                                            }
                                            else
                                            {
                                                MoTa = string.Empty;
                                            }

                                            if (!string.IsNullOrEmpty(k["URL"].ToString()))
                                            {
                                                DinhKem = k["URL"].ToString();
                                            }
                                            else
                                            {
                                                DinhKem = string.Empty;
                                            }

                                            string sql = GetQueryInsertOrUpdateSQL(Id, Ten, Ma + "'", ThuTucId, TruongHopId, Loai, SoTien, DonVi, MoTa, DinhKem);
                                            await _dapperRepository.ExcuteAsync(sql);
                                        }
                                    }
                                }
                            }
                        }
                    }

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

    private static string GetQueryInsertOrUpdateSQL(Guid? id, string? ten, string? ma, string? thuTucId, string? truongHopId, string? loai,
        int? soTien, string? donVi, string? moTa, string? dinhKem)
    {
        return
            $"IF EXISTS (SELECT Ma FROM Business.PhiLePhis WHERE Ma='{ma}' AND ThuTucId = '{thuTucId}' AND TruongHopId = '{truongHopId}') " +
                $"BEGIN UPDATE Business.PhiLePhis " +
                $"SET " +
                $"Ten = N'{ten}', ThuTucId= '{thuTucId}', TruongHopId= '{truongHopId}', Loai = N'{loai}', SoTien = '{soTien}', " +
                $"DonVi = N'{donVi}', MoTa = N'{moTa}', DinhKem = N'{dinhKem}'" +

                $"WHERE Ma='{ma}' AND ThuTucId = '{thuTucId}' AND TruongHopId = '{truongHopId}' " +
                $"END " +
            $"ELSE " +
                $"BEGIN " +
                $"INSERT INTO Business.PhiLePhis " +
                    $"([Id], [Ten], [Ma], [ThuTucId], [TruongHopId], [Loai], [SoTien], [DonVi], [MoTa], [DinhKem]) " +
                $"VALUES " +
                    $"('{id}', N'{ten}', '{ma}', '{thuTucId}', '{truongHopId}', N'{loai}', '{soTien}', N'{donVi}', N'{moTa}', N'{dinhKem}') " +
                $"END; ";
    }
}

