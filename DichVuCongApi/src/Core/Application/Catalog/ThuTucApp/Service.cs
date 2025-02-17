using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.CoQuanThucHienThuTuc;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp;

public class Service
{
    public class ImportThuTucServiceCommand : ICommand<Guid>, ITransientService
    {
        public string? message { get; set; }

        /*public string urlAPI_DanhSachTTHC { get; set; }
        public string urlAPI_ChiTietTTHC { get; set; }
        public string urlAPI_QuyetDinhCongBo { get; set; }*/

        public List<string>? lstMaTTTHC { get; set; }
        public bool? dongBoDonViThuTuc { get; set; }

        // public bool? dongBoLanDau { get; set; } = false;
        // urlAPI_DanhSachTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhSachTTHC
        // urlAPI_ChiTietTTHC: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayThuTuc?maTTHC=
        // urlAPI_QuyetDinhCongBo: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayQDCB?idQDCB=
    }

    public class ImportThuTucServiceCommandHandler : ICommandHandler<ImportThuTucServiceCommand, Guid>, ITransientService
    {
        private ICoQuanThucHienThuTuc _coQuanThucHienThuTuc;
        private IConfiguration _configuration;
        private IDapperRepository _dapperRepository;
        private ILogger<ThuTuc> _logger;
        private IMediator _mediator;
        public ImportThuTucServiceCommandHandler(IDapperRepository dapperRepository, ILogger<ThuTuc> logger, IMediator mediator, ICoQuanThucHienThuTuc coQuanThucHienThuTuc, IConfiguration configuration)
        {
            _configuration = configuration;
            _dapperRepository = dapperRepository;
            _logger = logger;
            _mediator = mediator;
            _coQuanThucHienThuTuc = coQuanThucHienThuTuc;
        }

        private string GetMaThuTucKhongSuDung(List<string> lstMaTTHCs)
        {
            string res = string.Empty;
            foreach (string ma in lstMaTTHCs)
            {
                res += $"'{ma}',";
            }

            if (!string.IsNullOrEmpty(res))
            {
                StringBuilder sb = new StringBuilder(res);
                sb.Remove(sb.Length - 1, 1);
                res = sb.ToString();
            }

            return res;
        }

        public async Task<Result<DefaultIdType>> Handle(ImportThuTucServiceCommand request, CancellationToken cancellationToken)
        {
            Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + " : Start Import thu tuc");
            using (var httpClient = new HttpClient())
            {
                string maTTHC = string.Empty;
                try
                {
                    // 1. Call API 1 => get list MaTTHC
                    List<string>? listMaTTHC = new List<string>();
                    if (request.lstMaTTTHC == null || request.lstMaTTTHC.Count() == 0)
                    {
                        HttpResponseMessage responseTT = await httpClient.GetAsync(_configuration["DongBothuTuc:urlAPI_DanhSachTTHC"]);
                        string jsonContentTT = await responseTT.Content.ReadAsStringAsync();
                        var resultsTT = JsonConvert.DeserializeObject<ImportThuTucServiceCommand>(jsonContentTT);
                        JObject jsonObjectTT = JObject.Parse(resultsTT.message ?? string.Empty);
                        JArray arrTT = (JArray)(jsonObjectTT["result"] ?? "[]");
                        if (arrTT.Count > 0)
                        {
                            foreach (var item in arrTT)
                            {
                                listMaTTHC.Add(item["MATTHC"].ToString());
                            }
                            #region Kiểm tra thủ tục không có trên DVCQG để cập nhật SuDung = 0
                            var lstMaTTHC_Current_res = await _dapperRepository.QueryAsync<string>("SELECT tt.MaTTHC FROM Catalog.ThuTucs tt WHERE tt.SuDung = 1");
                            var lstMaTTHC_Current = lstMaTTHC_Current_res.ToList();
                            var lstMaTTHC_NotUse = lstMaTTHC_Current.FindAll(x => !listMaTTHC.Contains(x));
                            Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + $"ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC={maTTHC}__ThuTucKhongSuDung:" + lstMaTTHC_NotUse.Count);

                            if (lstMaTTHC_NotUse.Count > 0)
                            {
                                string queryUpdateSuDung = $"Update Catalog.ThuTucs set SuDung = 0, NgayCapNhat = GETDATE() Where MaTTHC in ({GetMaThuTucKhongSuDung(lstMaTTHC_NotUse)})";
                                await _dapperRepository.ExcuteAsync(queryUpdateSuDung);
                            }
                        }
                        #endregion
                    }
                    else
                    {
                        listMaTTHC = request.lstMaTTTHC;
                    }

                    _logger.LogInformation("ImportThuTuc_GetListMaTTHC:Count=" + listMaTTHC.Count);
                    Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_GetListMaTTHC:Count=" + listMaTTHC.Count);
                    int dem = 0;

                    // 2. Map ListMaTTHC => call API 2, lấy ra từng dữ liệu cần thiết
                    foreach (string maTT in listMaTTHC)
                    {
                        try
                        {
                            dem++;
                            Guid id = Guid.NewGuid();
                            string iDQG = string.Empty;
                            maTTHC = maTT;
                            string tenTTHC = string.Empty;
                            string goiTinThuTucQG = string.Empty;
                            string loaiTTHC = string.Empty;
                            string trangThai = string.Empty;
                            bool suDung = true;
                            string linhVucChinh = string.Empty;
                            string maLinhVucChinh = string.Empty;
                            string coQuanThucHienChinh = string.Empty;
                            string cacCapThucHien = string.Empty;
                            string maKetQuaChinh = string.Empty;
                            string tenKetQuaChinh = string.Empty;
                            string thoiGianGiaiQuyet = string.Empty;
                            string quyetDinhCongBo = string.Empty;
                            string ngayCapNhat = string.Empty;
                            Guid linhVucId = Guid.Empty;
                            bool trangThaiPhiLePhi = false;
                            string mucDo = string.Empty;
                            bool lienThong = false;
                            int hoSoPhatSinhTrongNam = 0;

                            _logger.LogInformation("ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT);
                            Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT);

                            // Lấy thủ thông tin thủ tục đã tồn tại
                            GetThuTucByMaQuery getThuTucByMaQuery = new GetThuTucByMaQuery(maTT);
                            var existTTHC = await _mediator.Send(getThuTucByMaQuery);

                            // Lấy chi tiết từng thủ tục
                            HttpResponseMessage responseCTTT = await httpClient.GetAsync(_configuration["DongBothuTuc:urlAPI_ChiTietTTHC"] + maTT);
                            string jsonContentCTTT = await responseCTTT.Content.ReadAsStringAsync();

                            var resultsCTTT = JsonConvert.DeserializeObject<ImportThuTucServiceCommand>(jsonContentCTTT);
                            JObject jsonObjectCTTT = JObject.Parse(resultsCTTT.message ?? string.Empty);
                            JArray arrCTTT = (JArray)(jsonObjectCTTT["result"] ?? "[]");
                            AddDonViThuTucTheoCapThucHien addDonViThuTucTheoCapThucHien = new AddDonViThuTucTheoCapThucHien();
                            foreach (var item in arrCTTT)
                            {
                                iDQG = item["ID"].ToString();
                                tenTTHC = item["TENTTHC"].ToString();
                                goiTinThuTucQG = JsonConvert.SerializeObject(item);
                                loaiTTHC = item["LOAITTHC"].ToString();
                                trangThai = item["TRANGTHAI"].ToString();
                                DateTime currentDate = DateTime.Today;
                                ngayCapNhat = currentDate.ToString("yyyy-MM-dd HH:mm:ss");
                                foreach (var i in item["LINHVUCTHUCHIEN"])
                                {
                                    linhVucChinh = i["TENLINHVUC"].ToString();
                                    maLinhVucChinh = i["MALINHVUC"].ToString();
                                }

                                Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + $"ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC={maTT}__MALINHVUC:{maLinhVucChinh}");

                                foreach (var i in item["COQUANTHUCHIEN"])
                                {
                                    coQuanThucHienChinh += i["TENDONVI"].ToString() + "; ";
                                }

                                Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + $"ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC={maTT}__CoQuanThucHienChinh:{coQuanThucHienChinh}");

                                foreach (var i in item["KETQUATHUCHIEN"])
                                {
                                    maKetQuaChinh = i["MAKETQUA"].ToString();
                                    tenKetQuaChinh = i["TENKETQUA"].ToString();
                                }

                                Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + $"ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC={maTT}__MaKetQuaChinh:{maKetQuaChinh}");

                                foreach (var i in item["CACHTHUCTHUCHIEN"])
                                {
                                    foreach (var j in i["THOIGIAN"])
                                    {
                                        thoiGianGiaiQuyet = j["THOIGIANGIAIQUYET"].ToString();
                                    }

                                    break;
                                }

                                #region Đồng bộ  TruongHopThuTuc và ThanhPhanThuTuc;
                                if (existTTHC.Data == null)
                                {
                                    Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + $"ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC={maTT}__ThuTucMoi");
                                    int thoiGianThucHien = 0;
                                    string loaiThoiGian = string.Empty;
                                    if (item["CACHTHUCTHUCHIEN"] != null)
                                    {
                                        try
                                        {
                                            foreach (var i in item["CACHTHUCTHUCHIEN"])
                                            {
                                                string kenh = i["KENH"] != null ? i["KENH"].ToString() : string.Empty;
                                                if (i["THOIGIAN"] != null)
                                                {
                                                    int tmpTg = i["THOIGIAN"][0]["THOIGIANGIAIQUYET"] != null ? int.Parse(i["THOIGIAN"][0]["THOIGIANGIAIQUYET"].ToString()) * 8 : 0;
                                                    string tmpLoaiTg = i["THOIGIAN"][0]["DONVITINH"] != null ? i["THOIGIAN"][0]["DONVITINH"].ToString() : string.Empty;
                                                    if (kenh == "1")
                                                    {
                                                        thoiGianThucHien = tmpTg;
                                                        loaiThoiGian = tmpLoaiTg;
                                                    }
                                                    else if (thoiGianThucHien == 0)
                                                    {
                                                        thoiGianThucHien = tmpTg;
                                                        loaiThoiGian = tmpLoaiTg;
                                                    }
                                                }

                                                if (i["PHILEPHI"] != null)
                                                {
                                                    string? soTien = i["PHILEPHI"][0]["SOTIEN"] != null ? i["PHILEPHI"][0]["SOTIEN"].ToString() : null;
                                                    if (!string.IsNullOrEmpty(soTien))
                                                        trangThaiPhiLePhi = true;
                                                }
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            AppendToFile("C:/Error_Convert_THOIGIANGIAIQUYET", maTT + Environment.NewLine + ex.Message);
                                        }
                                    }
                                    #region Trường hợp thủ tục, thành phần thủ tục
                                    if (item["THANHPHANHOSO"] != null)
                                    {
                                        foreach (var i in item["THANHPHANHOSO"])
                                        {
                                            string truongHop = i["TRUONGHOP"] != null ? i["TRUONGHOP"].ToString() : string.Empty;
                                            AddTruongHopThuTucCommand truongHopThuTucCommad = new AddTruongHopThuTucCommand();
                                            string ma = maTT + "_" + Guid.NewGuid().ToString().Substring(0, 5);
                                            truongHopThuTucCommad.Ma = ma;
                                            truongHopThuTucCommad.ThuTucId = maTT;
                                            truongHopThuTucCommad.Ten = truongHop;
                                            truongHopThuTucCommad.LoaiThoiGianThucHien = loaiThoiGian;
                                            truongHopThuTucCommad.ThoiGianThucHien = thoiGianThucHien;

                                            await _mediator.Send(truongHopThuTucCommad);

                                            if (i["GIAYTO"] != null)
                                            {
                                                AddMultiThanhPhanThuTucCommand addMultiThanhPhanThuTuc = new AddMultiThanhPhanThuTucCommand();
                                                foreach (var giayTo in i["GIAYTO"])
                                                {
                                                    string maGiayTo = giayTo["MAGIAYTO"] != null ? giayTo["MAGIAYTO"].ToString() : string.Empty;
                                                    string tenGiayTo = giayTo["TENGIAYTO"] != null ? giayTo["TENGIAYTO"].ToString() : string.Empty;
                                                    int? soBanSao = giayTo["SOBANSAO"] != null && giayTo["SOBANSAO"].ToString() != string.Empty ? int.Parse(giayTo["SOBANSAO"].ToString()) : null;
                                                    int? soBanChinh = giayTo["SOBANCHINH"] != null && giayTo["SOBANCHINH"].ToString() != string.Empty ? int.Parse(giayTo["SOBANCHINH"].ToString()) : null;
                                                    string? url = giayTo["Url"] != null && giayTo["Url"].ToString() != string.Empty ? giayTo["Url"].ToString() : null;
                                                    bool check = false;
                                                    for (int index = 0; index < addMultiThanhPhanThuTuc.data.Count; index++)
                                                    {
                                                        if (maGiayTo == addMultiThanhPhanThuTuc.data[index].Ma)
                                                        {
                                                            check = true;
                                                            string? dinhKemTpHs = !string.IsNullOrEmpty(addMultiThanhPhanThuTuc.data[index].DinhKem) ? addMultiThanhPhanThuTuc.data[index].DinhKem + $"##{url}" : url;
                                                            addMultiThanhPhanThuTuc.data[index] = addMultiThanhPhanThuTuc.data[index].Update(null, null, null, null, null, dinhKemTpHs, null, null, null, null, null);
                                                            break;
                                                        }
                                                    }

                                                    if (!check)
                                                    {
                                                        var thanhPhanThuTuc = ThanhPhanThuTuc.Create(tenGiayTo, maGiayTo, maTT, ma, null, url, false, soBanChinh, soBanSao, null);
                                                        addMultiThanhPhanThuTuc.data.Add(thanhPhanThuTuc);
                                                    }
                                                }

                                                await _mediator.Send(addMultiThanhPhanThuTuc);
                                            }
                                        }
                                    }
                                    #endregion

                                    #region Đơn vị thực hiện
                                    int soLanDongBoCapTinh = 0;
                                    foreach (var i in item["CAPTHUCHIEN"])
                                    {
                                        if (i["CAPTHUCHIEN"].ToString() == "0")
                                        {
                                            cacCapThucHien += "CapBo#";
                                        }

                                        if (i["CAPTHUCHIEN"].ToString() == "1")
                                        {
                                            cacCapThucHien += "CapTinh#";
                                        }

                                        if (i["CAPTHUCHIEN"].ToString() == "2")
                                        {
                                            cacCapThucHien += "CapHuyen#";
                                            AddDonViThuTucTheoCapThucHienElm tmp = new AddDonViThuTucTheoCapThucHienElm();
                                            tmp.MaTTHC = maTT;
                                            tmp.CapThucHien = GroupContants.QUAN_HUYEN;
                                            addDonViThuTucTheoCapThucHien.data.Add(tmp);
                                        }

                                        if (i["CAPTHUCHIEN"].ToString() == "3")
                                        {
                                            cacCapThucHien += "CapXa#";
                                            AddDonViThuTucTheoCapThucHienElm tmp = new AddDonViThuTucTheoCapThucHienElm();
                                            tmp.MaTTHC = maTT;
                                            tmp.CapThucHien = GroupContants.XA_PHUONG;
                                            addDonViThuTucTheoCapThucHien.data.Add(tmp);
                                        }

                                        // kiểm tra đơn vị thực hiện cấp tỉnh
                                        if (soLanDongBoCapTinh == 0)
                                        {
                                            var coQuanThucHienConfig = _coQuanThucHienThuTuc.getConfig();
                                            string moTaCoQuanThucHien = i["MOTACOQUANTHUCHIEN"] != null ? i["MOTACOQUANTHUCHIEN"].ToString() : string.Empty;
                                            string diaChiTiepNhan = i["DIACHITIEPNHAN"] != null ? i["DIACHITIEPNHAN"].ToString() : string.Empty;
                                            string tmpCoQuanThucHien = coQuanThucHienChinh + "," + moTaCoQuanThucHien + "," + diaChiTiepNhan;

                                            var coQuanThucHien = coQuanThucHienConfig.CoQuanThucHienConfigs.Where(t => tmpCoQuanThucHien.ToLower().Contains(t.name.ToLower())).FirstOrDefault();
                                            if (coQuanThucHien != null)
                                            {
                                                AddDonViThuTucTheoCapThucHienElm tmp = new AddDonViThuTucTheoCapThucHienElm();
                                                tmp.MaTTHC = maTT;
                                                tmp.DonViThucHienId = coQuanThucHien.code;
                                                addDonViThuTucTheoCapThucHien.data.Add(tmp);
                                            }

                                            soLanDongBoCapTinh += 1;
                                        }
                                    }

                                    if (cacCapThucHien.TrimEnd().EndsWith("#"))
                                        cacCapThucHien = cacCapThucHien.TrimEnd().Substring(0, cacCapThucHien.Length - 1);
                                    #endregion
                                }
                                #endregion

                                #region Gọi API lấy Quyết định công bố
                                Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_LayQuyetDinhCongBo:MaTTHC=" + maTT);
                                try
                                {
                                    HttpResponseMessage responseQDCB = await httpClient.GetAsync(_configuration["DongBothuTuc:urlAPI_QuyetDinhCongBo"] + item["IDQUYETDINHCONGBO"]);
                                    string jsonContentQDCB = await responseQDCB.Content.ReadAsStringAsync();
                                    var resultsQDCB = JsonConvert.DeserializeObject<ImportThuTucServiceCommand>(jsonContentQDCB);
                                    JObject jsonObjectQDCB = JObject.Parse(resultsQDCB.message ?? string.Empty);
                                    JArray? arrQDCB = jsonObjectQDCB["result"] != null ? (JArray)(jsonObjectQDCB["result"] ?? "[]") : null;
                                    foreach (var i in arrQDCB)
                                    {
                                        quyetDinhCongBo = JsonConvert.SerializeObject(i);
                                    }

                                    Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_LayQuyetDinhCongBo:MaTTHC=" + maTT + "_OK");
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_LayQuyetDinhCongBo:MaTTHC=" + maTT + "_Error" + ex.Message);
                                }
                                #endregion

                                string sqlImportThuTuc = GetQueryInsertOrUpdateSQL(id, iDQG, maTT, tenTTHC, loaiTTHC, goiTinThuTucQG.Replace("\'\"", "\'\'\""), trangThai, suDung, linhVucChinh, maLinhVucChinh, coQuanThucHienChinh, cacCapThucHien, maKetQuaChinh, tenKetQuaChinh, thoiGianGiaiQuyet, quyetDinhCongBo, ngayCapNhat, linhVucId, trangThaiPhiLePhi, mucDo, lienThong, hoSoPhatSinhTrongNam);

                                await _dapperRepository.ExcuteAsync(sqlImportThuTuc);

                                if (existTTHC.Data == null && request.dongBoDonViThuTuc == true)
                                {
                                    await _mediator.Send(addDonViThuTucTheoCapThucHien);
                                }

                                _logger.LogInformation("ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT + "_OK");
                                Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT + "_OK");
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT + "_Error: " + ex.Message);
                            _logger.LogInformation("ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTT + "_Error");
                            _logger.LogInformation("ImportThuTuc_Error" + ex.Message);
                        }
                    }

                    await _dapperRepository.ExcuteAsync(QueryTinhSoLuongThuTucTungCapTheoLinhVuc());
                    await _dapperRepository.ExcuteAsync(QueryTinhTongSoThuTucTheoLinhVuc());
                    await _dapperRepository.ExcuteAsync(QueryCapNhatMucDoThuTucTheoDonViThuTuc());
                    Console.WriteLine("\nImport and Update ThuTuc Success!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(DateTime.Now.ToString("HH:mm:ss") + "ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTTHC + "_Error: " + ex.Message);
                    _logger.LogInformation("ImportThuTuc_GetChiTietThuTucTheoMaTTHC:MaTTHC=" + maTTHC + "_Error" + Environment.NewLine + ex.ToString());
                }
            }

            return new Result<Guid>();
        }
    }

    private static string GetQueryInsertOrUpdateSQL(Guid? id, string? iDQG, string? maTTHC, string? tenTTHC, string? loaiTTHC, string? goiTinThuTucQG, string? trangThai, bool? suDung, string? linhVucChinh, string? maLinhVucChinh, string? coQuanThucHienChinh, string? capThucHien, string? maKetQuaChinh, string? tenKetQuaChinh, string? thoiGianGiaiQuyet, string? quyetDinhCongBo, string? ngayCapNhat, Guid? linhVucId, bool? trangThaiPhiLePhi, string? mucDo, bool? lienThong, int? hoSoPhatSinhTrongNam)
    {
        return
            $"IF EXISTS (SELECT MaTTHC FROM Catalog.ThuTucs WHERE MaTTHC='{maTTHC}') " +
                $"BEGIN UPDATE Catalog.ThuTucs " +
                $"SET IDQG = '{iDQG}', TenTTHC = N'{tenTTHC}', LoaiTTHC = N'{loaiTTHC}', " +
                    $"GoiTinThuTucQG = N'{goiTinThuTucQG}', TrangThai = '{trangThai}', " +
                    $"LinhVucChinh = N'{linhVucChinh}', MaLinhVucChinh = N'{maLinhVucChinh}', " +
                    $"CoQuanThucHienChinh = N'{coQuanThucHienChinh}'," +
                    $"MaKetQuaChinh = N'{maKetQuaChinh}', " +
                    $"TenKetQuaChinh = N'{tenKetQuaChinh}', ThoiGianGiaiQuyet = N'{thoiGianGiaiQuyet}', " +
                    $"QuyetDinhCongBo = N'{quyetDinhCongBo}', NgayCapNhat = '{ngayCapNhat}', " +
                    $"LinhVucId = '{linhVucId}' " +
                $"WHERE MaTTHC='{maTTHC}' " +
                $"END " +
            $"ELSE " +
                $"BEGIN " +
                $"INSERT INTO Catalog.ThuTucs " +
                    $"([Id], [IDQG], [MaTTHC], [TenTTHC], [LoaiTTHC], [GoiTinThuTucQG], [TrangThai], [SuDung], " +
                    $"[LinhVucChinh], [MaLinhVucChinh], [CoQuanThucHienChinh], [CapThucHien], [MaKetQuaChinh], [TenKetQuaChinh], " +
                    $"[ThoiGianGiaiQuyet], [QuyetDinhCongBo], [NgayCapNhat], [LinhVucId], [TrangThaiPhiLePhi], " +
                    $"[MucDo], [LienThong], [HoSoPhatSinhTrongNam]) " +
                $"VALUES " +
                    $"('{id}', '{iDQG}', '{maTTHC}', N'{tenTTHC}', N'{loaiTTHC}', N'{goiTinThuTucQG}', '{trangThai}', " +
                    $"'{suDung}', N'{linhVucChinh}', N'{maLinhVucChinh}',  N'{coQuanThucHienChinh}', N'{capThucHien}', " +
                    $"N'{maKetQuaChinh}', N'{tenKetQuaChinh}', N'{thoiGianGiaiQuyet}', N'{quyetDinhCongBo}', " +
                    $"'{ngayCapNhat}', '{linhVucId}', '{trangThaiPhiLePhi}', N'{mucDo}', '{lienThong}', {hoSoPhatSinhTrongNam}); " +
                $"END; ";
    }

    private static string QueryTinhSoLuongThuTucTungCapTheoLinhVuc()
    {
        return
            @"UPDATE lv
                SET SoLuongThuTucCapTinh = temp2.CapTinh,
                 SoLuongThuTucCapHuyen = temp2.CapHuyen/2,
                 SoLuongThuTucCapXa = temp2.CapXa/3
                FROM Catalog.LinhVucs lv INNER JOIN 
                (SELECT MALINHVUC, 
                      SUM(CASE 
          	                WHEN CAPTHUCHIEN = '1' AND SuDung = 1 THEN CAPTHUCHIEN
          	                 ELSE 0
                          END) AS CapTinh,
                      SUM(CASE 
          	                WHEN CAPTHUCHIEN = '2' AND SuDung = 1 THEN CAPTHUCHIEN
          	                 ELSE 0
                          END) AS CapHuyen,
                      SUM(CASE 
          	                WHEN CAPTHUCHIEN = '3' AND SuDung = 1 THEN CAPTHUCHIEN
          	                 ELSE 0
                          END) AS CapXa
                FROM 
                (SELECT
                      LINHVUCTHUCHIENArr.MALINHVUC,
                      CAPTHUCHIENArr.CAPTHUCHIEN, SuDung
                    FROM Catalog.ThuTucs
                    CROSS APPLY OPENJSON(GoiTinThuTucQG, '$.CAPTHUCHIEN') 
                    WITH (
                      CAPTHUCHIEN VARCHAR(2) '$.CAPTHUCHIEN'  
                    ) AS CAPTHUCHIENArr
                    CROSS APPLY OPENJSON(GoiTinThuTucQG, '$.LINHVUCTHUCHIEN') 
                    WITH (
                      MALINHVUC NVARCHAR(50) '$.MALINHVUC'  
                    ) AS LINHVUCTHUCHIENArr                    
                    )  temp1
                GROUP BY MALINHVUC
                ) temp2 ON lv.Ma= temp2.MALINHVUC";
    }

    private static string QueryTinhTongSoThuTucTheoLinhVuc()
    {
        return
            @"UPDATE lv
                SET SoLuongThuTuc = SoLuongThuTucCapTinh + SoLuongThuTucCapHuyen + SoLuongThuTucCapXa 
                FROM Catalog.LinhVucs lv";
    }

    private static string QueryCapNhatMucDoThuTucTheoDonViThuTuc()
    {
        return """
                WITH MaxMucDoCTE AS (
                    SELECT MaTTHC, MAX(MucDo) AS MaxMucDo
                    FROM Catalog.DonViThuTucs
                    WHERE DeletedOn is null
                    GROUP BY MaTTHC
                )
                UPDATE tt
                SET tt.MucDo = MaxMucDoCTE.MaxMucDo
                FROM Catalog.ThuTucs tt
                JOIN MaxMucDoCTE ON tt.MaTTHC = MaxMucDoCTE.MaTTHC
                WHERE MaxMucDo is not null and tt.MucDo != MaxMucDoCTE.MaxMucDo
            """;
    }

    private static void AppendToFile(string filePath, string content)
    {
        // string filePath = "D:/ErrorMATTHC.txt";
        // Kiểm tra xem tệp có tồn tại hay không
        if (!System.IO.File.Exists(filePath))
        {
            // Tạo tệp mới nếu nó chưa tồn tại
            using (StreamWriter sw = System.IO.File.CreateText(filePath))
            {
                // Ghi nội dung vào tệp
                sw.WriteLine(content);
            }
        }
        else
        {
            // Ghi thêm nội dung vào cuối tệp
            using (StreamWriter sw = System.IO.File.AppendText(filePath))
            {
                // Ghi nội dung vào cuối tệp
                sw.WriteLine(content);
            }
        }
    }
}
