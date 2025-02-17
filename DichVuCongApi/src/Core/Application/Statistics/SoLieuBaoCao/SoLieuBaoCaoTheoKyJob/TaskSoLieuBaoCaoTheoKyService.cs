using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Domain.Portal;
using System;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
using TD.DichVuCongApi.Application.ChatBot.Command;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using System.Text.Json;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;

public class TaskSoLieuBaoCaoTheoKyService
{

    public class TaskSoLieuThongKeTheoKy : IRequest<Result<string>>, ITransientService
    {
    }

    public class TaskSoLieuThongKeTheoKyHandler : IRequestHandler<TaskSoLieuThongKeTheoKy, Result<string>>, ITransientService
    {
        private readonly IMediator _mediator;
        private readonly IDapperRepository _dapperRepository;
        private readonly ILogger<SoLieuBaoCaoTheoKy> _logger;

        public TaskSoLieuThongKeTheoKyHandler(IMediator mediator, IDapperRepository dapperRepository, ILogger<SoLieuBaoCaoTheoKy> logger)
        {
            _mediator = mediator;
            _dapperRepository = dapperRepository;
            _logger = logger;
        }

        public async Task<Result<string>> Handle(TaskSoLieuThongKeTheoKy request, CancellationToken cancellationToken)
        {
            try
            {
                var timeLines = GetThoiGian12ThangGanNhat();
                var groups = GetGroups().Result;
                TiepNhanHoSoTrucTuyenConstants groupConstants = new TiepNhanHoSoTrucTuyenConstants();

                List<SoLieuThongKeTheoDonViElement> soLieus = new List<SoLieuThongKeTheoDonViElement>();

                #region Loại thống kê: Đơn vị
                try
                {
                    foreach (var group in groups)
                    {
                        if (string.IsNullOrEmpty(group.MaDinhDanh))
                            continue;

                        foreach (var timeLine in timeLines)
                        {
                            var timeRequest = GetThoiGian(timeLine.LoaiThoiGian, timeLine.Ky, timeLine.Nam);
                            var resThongKe = await _mediator.Send(new SoLieuThongKeDonViTheoKyRequest()
                            {
                                MaDinhDanh = group.MaDinhDanh,
                                TuNgay = timeRequest.StartDate,
                                DenNgay = timeRequest.EndDate,
                            });

                            var result = resThongKe.Data;
                            result.MaDinhDanh = group.MaDinhDanh;
                            result.Catalog = group.Catalog;
                            result.LoaiThoiGian = timeLine.LoaiThoiGian;
                            result.Ky = timeLine.Ky;
                            result.Nam = timeLine.Nam;

                            soLieus.Add(result); // Thêm vào Arr để xử lý các Loại cấp lớn hơn

                            string sqlExcute = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "DonVi", group.MaDinhDanh, JsonSerializer.Serialize(resThongKe.Data), resThongKe.Data.TongDiem766);
                            await _dapperRepository.ExcuteAsync(sqlExcute);

                            _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke theo ky - Don vi {group.MaDinhDanh}: {timeLine.LoaiThoiGian} {timeLine.Ky} nam {timeLine.Nam}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi thống kê đơn vị: " + ex.Message);
                }
                #endregion

                #region Thống kê: Toàn tỉnh, Quận-huyện, Xã-phường, VPDKDD
                try
                {
                    foreach (var timeLine in timeLines)
                    {
                        SoLieuThongKeTheoDonViElement resultToanTinh = new SoLieuThongKeTheoDonViElement();
                        resultToanTinh.LoaiThoiGian = timeLine.LoaiThoiGian;
                        resultToanTinh.Ky = timeLine.Ky;
                        resultToanTinh.Nam = timeLine.Nam;
                        SoLieuThongKeTheoDonViElement resultSoBanNganh = new SoLieuThongKeTheoDonViElement();
                        resultSoBanNganh.Catalog = groupConstants.CATALOG.SO_BAN_NGANH;
                        resultSoBanNganh.LoaiThoiGian = timeLine.LoaiThoiGian;
                        resultSoBanNganh.Ky = timeLine.Ky;
                        resultSoBanNganh.Nam = timeLine.Nam;
                        SoLieuThongKeTheoDonViElement resultCnvpdk = new SoLieuThongKeTheoDonViElement();
                        resultCnvpdk.Catalog = groupConstants.CATALOG.CNVPDK;
                        resultCnvpdk.LoaiThoiGian = timeLine.LoaiThoiGian;
                        resultCnvpdk.Ky = timeLine.Ky;
                        resultCnvpdk.Nam = timeLine.Nam;
                        SoLieuThongKeTheoDonViElement resultQuanHuyen = new SoLieuThongKeTheoDonViElement();
                        resultQuanHuyen.Catalog = groupConstants.CATALOG.QUAN_HUYEN;
                        resultQuanHuyen.LoaiThoiGian = timeLine.LoaiThoiGian;
                        resultQuanHuyen.Ky = timeLine.Ky;
                        resultQuanHuyen.Nam = timeLine.Nam;
                        SoLieuThongKeTheoDonViElement resultXaPhuong = new SoLieuThongKeTheoDonViElement();
                        resultXaPhuong.Catalog = groupConstants.CATALOG.XA_PHUONG;
                        resultXaPhuong.LoaiThoiGian = timeLine.LoaiThoiGian;
                        resultXaPhuong.Ky = timeLine.Ky;
                        resultXaPhuong.Nam = timeLine.Nam;

                        foreach (var soLieu in soLieus)
                        {
                            if (timeLine.LoaiThoiGian == soLieu.LoaiThoiGian && timeLine.Nam == soLieu.Nam && timeLine.Ky == soLieu.Ky)
                            {
                                resultToanTinh = DataHandler(resultToanTinh, soLieu);

                                if (soLieu.Catalog == groupConstants.CATALOG.SO_BAN_NGANH)
                                    resultSoBanNganh = DataHandler(resultSoBanNganh, soLieu);

                                if (soLieu.Catalog == groupConstants.CATALOG.CNVPDK)
                                    resultCnvpdk = DataHandler(resultCnvpdk, soLieu);

                                if (soLieu.Catalog == groupConstants.CATALOG.QUAN_HUYEN)
                                    resultSoBanNganh = DataHandler(resultSoBanNganh, soLieu);

                                if (soLieu.Catalog == groupConstants.CATALOG.XA_PHUONG)
                                    resultSoBanNganh = DataHandler(resultSoBanNganh, soLieu);

                            }
                        }

                        #region Map Data Thủ tục
                        var timeRequest = GetThoiGian(timeLine.LoaiThoiGian, timeLine.Ky, timeLine.Nam);

                        var resThuTucToanTinh = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                        {
                            TuNgay = timeRequest.StartDate,
                            DenNgay = timeRequest.EndDate,
                        });
                        resultToanTinh = DataThuTucHandler(resultToanTinh, resThuTucToanTinh.Data);

                        var resThuTucSoBanNganh = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                        {
                            Catalogs = [groupConstants.CATALOG.SO_BAN_NGANH],
                            TuNgay = timeRequest.StartDate,
                            DenNgay = timeRequest.EndDate,
                        });
                        resultSoBanNganh = DataThuTucHandler(resultSoBanNganh, resThuTucSoBanNganh.Data);

                        var resThuTucCNVPDK = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                        {
                            Catalogs = [groupConstants.CATALOG.CNVPDK],
                            TuNgay = timeRequest.StartDate,
                            DenNgay = timeRequest.EndDate,
                        });
                        resultCnvpdk = DataThuTucHandler(resultCnvpdk, resThuTucCNVPDK.Data);

                        var resThuTucQuanHuyen = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                        {
                            Catalogs = [groupConstants.CATALOG.QUAN_HUYEN],
                            TuNgay = timeRequest.StartDate,
                            DenNgay = timeRequest.EndDate,
                        });
                        resultQuanHuyen = DataThuTucHandler(resultQuanHuyen, resThuTucQuanHuyen.Data);

                        var resThuTucXaPhuong = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                        {
                            Catalogs = [groupConstants.CATALOG.XA_PHUONG],
                            TuNgay = timeRequest.StartDate,
                            DenNgay = timeRequest.EndDate,
                        });
                        resultXaPhuong = DataThuTucHandler(resultXaPhuong, resThuTucXaPhuong.Data);
                        #endregion

                        #region Tính tỷ lệ và điểm 766
                        resultToanTinh = CalcTyLeAndDiem766(resultToanTinh);
                        resultSoBanNganh = CalcTyLeAndDiem766(resultSoBanNganh);
                        resultCnvpdk = CalcTyLeAndDiem766(resultCnvpdk);
                        resultQuanHuyen = CalcTyLeAndDiem766(resultQuanHuyen);
                        resultXaPhuong = CalcTyLeAndDiem766(resultXaPhuong);
                        #endregion

                        #region Lưu vào Database
                        string sqlExcuteToanTinh = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "ToanTinh", null, JsonSerializer.Serialize(resultToanTinh), resultToanTinh.TongDiem766);
                        string sqlExcuteSoBanNganh = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "SoBanNganh", null, JsonSerializer.Serialize(resultSoBanNganh), resultSoBanNganh.TongDiem766);
                        string sqlExcuteCNVPDK = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "ChiNhanhVPDK", null, JsonSerializer.Serialize(resultCnvpdk), resultCnvpdk.TongDiem766);
                        string sqlExcuteQuanHuyen = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "QuanHuyen", null, JsonSerializer.Serialize(resultQuanHuyen), resultQuanHuyen.TongDiem766);
                        string sqlExcuteXaPhuong = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "XaPhuong", null, JsonSerializer.Serialize(resultXaPhuong), resultXaPhuong.TongDiem766);

                        await _dapperRepository.ExcuteAsync(sqlExcuteToanTinh);
                        await _dapperRepository.ExcuteAsync(sqlExcuteSoBanNganh);
                        await _dapperRepository.ExcuteAsync(sqlExcuteCNVPDK);
                        await _dapperRepository.ExcuteAsync(sqlExcuteQuanHuyen);
                        await _dapperRepository.ExcuteAsync(sqlExcuteXaPhuong);
                        _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke theo ky - CacCap: {timeLine.LoaiThoiGian} {timeLine.Ky} nam {timeLine.Nam}");
                        #endregion

                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi thống kê Toàn tỉnh, cnvpdk, sở ban ngành, quận huyện, xã phường: " + ex.Message);
                }
                #endregion

                #region Thống kê: TongDonViCon (Tính tổng tất cả các xã của từng huyện)
                try
                {
                    List<GroupDto> huyenGroups = new List<GroupDto>();
                    foreach (var group in groups)
                    {
                        if (!string.IsNullOrEmpty(group.MaDinhDanh) && group.Catalog == groupConstants.CATALOG.QUAN_HUYEN)
                            huyenGroups.Add(group);
                    }

                    foreach (var group in huyenGroups)
                    {
                        foreach (var timeLine in timeLines)
                        {
                            SoLieuThongKeTheoDonViElement resultTongDonViCon = new SoLieuThongKeTheoDonViElement();
                            resultTongDonViCon.Catalog = groupConstants.CATALOG.XA_PHUONG;
                            resultTongDonViCon.LoaiThoiGian = timeLine.LoaiThoiGian;
                            resultTongDonViCon.Ky = timeLine.Ky;
                            resultTongDonViCon.Nam = timeLine.Nam;

                            foreach (var soLieu in soLieus)
                            {
                                if (soLieu.Catalog == groupConstants.CATALOG.XA_PHUONG
                                    && soLieu.MaDinhDanh != group.MaDinhDanh
                                    && soLieu.MaDinhDanh.Contains(group.MaDinhDanh)
                                    && timeLine.LoaiThoiGian == soLieu.LoaiThoiGian
                                    && timeLine.Nam == soLieu.Nam && timeLine.Ky == soLieu.Ky)
                                {
                                    resultTongDonViCon = DataHandler(resultTongDonViCon, soLieu);
                                }
                            }

                            // Map data thủ tục
                            var timeRequest = GetThoiGian(timeLine.LoaiThoiGian, timeLine.Ky, timeLine.Nam);
                            var resThuTuc = await _mediator.Send(new SoLieuThongKeThuTucTheoDonViRequest()
                            {
                                Catalogs = [groupConstants.CATALOG.XA_PHUONG],
                                MaDinhDanhCha = group.MaDinhDanh,
                                ChiBaoGomDonViCon = true,
                                TuNgay = timeRequest.StartDate,
                                DenNgay = timeRequest.EndDate,
                            });
                            resultTongDonViCon = DataThuTucHandler(resultTongDonViCon, resThuTuc.Data);
                            resultTongDonViCon.MaDinhDanh = group.MaDinhDanh;

                            // Tính các tỷ lệ và điểm 766
                            resultTongDonViCon = CalcTyLeAndDiem766(resultTongDonViCon);

                            // Lưu dữ liệu vào Database
                            string sqlExcuteTongDonViCon = GetQueryInsertOrUpdateSQL(timeLine.LoaiThoiGian, timeLine.Ky.ToString(), timeLine.Nam.ToString(), "TongDonViCon", resultTongDonViCon.MaDinhDanh, JsonSerializer.Serialize(resultTongDonViCon), resultTongDonViCon.TongDiem766);
                            await _dapperRepository.ExcuteAsync(sqlExcuteTongDonViCon);
                            _logger.LogInformation(DateTime.Now.ToString("HH:mm:ss") + $": Thong ke theo ky - TongDonViCon {resultTongDonViCon.MaDinhDanh}: {timeLine.LoaiThoiGian} {timeLine.Ky} nam {timeLine.Nam}");
                        }
                    }

                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi thống kê tổng đơn vị con của từng huyện: " + ex.Message);
                }
                #endregion

                return Result<string>.Success(message: "Cập nhật số liệu thành công");
            }
            catch (Exception ex)
            {
                _logger.LogInformation("TaskSoLieuBaoCaoTheoKy: " + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public static SoLieuThongKeTheoDonViElement DataHandler(SoLieuThongKeTheoDonViElement prev, SoLieuThongKeTheoDonViElement addVal)
        {
            SoLieuThongKeTheoDonViElement result = prev;

            // Tiếp nhận
            result.TiepNhanTrongKy = prev.TiepNhanTrongKy + addVal.TiepNhanTrongKy;
            result.TiepNhanTrucTuyen = prev.TiepNhanTrucTuyen + addVal.TiepNhanTrucTuyen;
            result.TiepNhanTrucTiep = prev.TiepNhanTrucTiep + addVal.TiepNhanTrucTiep;
            result.TiepNhanBCCI = prev.TiepNhanBCCI + addVal.TiepNhanBCCI;

            result.TiepNhanChungThuc = prev.TiepNhanChungThuc + addVal.TiepNhanChungThuc;
            result.TiepNhanDVCLienThong = prev.TiepNhanDVCLienThong + addVal.TiepNhanDVCLienThong;

            result.TiepNhanTrucTuyenThuTucTrucTuyen = prev.TiepNhanTrucTuyenThuTucTrucTuyen + addVal.TiepNhanTrucTuyenThuTucTrucTuyen;
            result.TiepNhanThuTucTrucTuyen = prev.TiepNhanThuTucTrucTuyen + addVal.TiepNhanThuTucTrucTuyen;

            result.TuChoiTiepNhan = prev.TuChoiTiepNhan + addVal.TuChoiTiepNhan;
            result.HoSoThuocThamQuyenGiaiQuyet = prev.HoSoThuocThamQuyenGiaiQuyet + addVal.HoSoThuocThamQuyenGiaiQuyet;

            // Xử lý
            result.DaXuLy = prev.DaXuLy + addVal.DaXuLy;
            result.DaXuLyTruocHan = prev.DaXuLyTruocHan + addVal.DaXuLyTruocHan;
            result.DaXuLyDungHan = prev.DaXuLyDungHan + addVal.DaXuLyDungHan;
            result.DaXuLyQuaHan = prev.DaXuLyQuaHan + addVal.DaXuLyQuaHan;

            result.TraLai = prev.TraLai + addVal.TraLai;

            result.TrucTuyenDaXuLy = prev.TrucTuyenDaXuLy + addVal.TrucTuyenDaXuLy;
            result.TrucTuyenDaXuLyTruocHan = prev.TrucTuyenDaXuLyTruocHan + addVal.TrucTuyenDaXuLyTruocHan;
            result.TrucTuyenDaXuLyDungHan = prev.TrucTuyenDaXuLyDungHan + addVal.TrucTuyenDaXuLyDungHan;
            result.TrucTuyenDaXuLyQuaHan = prev.TrucTuyenDaXuLyQuaHan + addVal.TrucTuyenDaXuLyQuaHan;

            result.DangXuLyDungHanVaTruocHan = prev.DangXuLyDungHanVaTruocHan + addVal.DangXuLyDungHanVaTruocHan;
            result.DaXuLyDungHanTruocHanVaTraLai = prev.DaXuLyDungHanTruocHanVaTraLai + addVal.DaXuLyDungHanTruocHanVaTraLai;
            result.HoSoDaXuLyCoKetQuaDienTu = prev.HoSoDaXuLyCoKetQuaDienTu + addVal.HoSoDaXuLyCoKetQuaDienTu;

            // Thanh toán
            result.ThuTucCoThuPhi = prev.ThuTucCoThuPhi + addVal.ThuTucCoThuPhi;
            result.ThuTucCoPhatSinhThanhToanTrucTuyen = prev.ThuTucCoPhatSinhThanhToanTrucTuyen + addVal.ThuTucCoPhatSinhThanhToanTrucTuyen;

            result.HoSoCoThuPhi = prev.HoSoCoThuPhi + addVal.HoSoCoThuPhi;
            result.HoSoCoThuPhiThanhToanTrucTuyen = prev.HoSoCoThuPhiThanhToanTrucTuyen + addVal.HoSoCoThuPhiThanhToanTrucTuyen;

            result.SoLuongGiaoDichThanhToanTrucTuyen = prev.SoLuongGiaoDichThanhToanTrucTuyen + addVal.SoLuongGiaoDichThanhToanTrucTuyen;
            result.SoTienGiaoDichThanhToanTrucTuyen = prev.SoTienGiaoDichThanhToanTrucTuyen + addVal.SoTienGiaoDichThanhToanTrucTuyen;

            // Số hóa
            result.HoSoCoDinhDanh = prev.HoSoCoDinhDanh + addVal.HoSoCoDinhDanh;
            result.HoSoCoThanhPhan = prev.HoSoCoThanhPhan + addVal.HoSoCoThanhPhan;
            result.HoSoDaXuLyXong = prev.HoSoDaXuLyXong + addVal.HoSoDaXuLyXong;
            result.HoSoDaXuLyXongCoKetQuaDienTu = prev.HoSoDaXuLyXongCoKetQuaDienTu + addVal.HoSoDaXuLyXongCoKetQuaDienTu;

            result.HoSoTaiSuDungSoHoaThanhPhan = prev.HoSoTaiSuDungSoHoaThanhPhan + addVal.HoSoTaiSuDungSoHoaThanhPhan;
            result.HoSoCoThanhPhanHoacKetQuaSoHoa = prev.HoSoCoThanhPhanHoacKetQuaSoHoa + addVal.HoSoCoThanhPhanHoacKetQuaSoHoa;

            // CSDL Dân cư
            result.TruyVanCSDLDanCu = prev.TruyVanCSDLDanCu + addVal.TruyVanCSDLDanCu;

            // Đánh giá hài lòng
            result.DanhGia = prev.DanhGia + addVal.DanhGia;
            result.DanhGiaRatHaiLong = prev.DanhGiaRatHaiLong + addVal.DanhGiaRatHaiLong;
            result.DanhGiaHaiLong = prev.DanhGiaHaiLong + addVal.DanhGiaHaiLong;
            result.DanhGiaKhongHaiLong = prev.DanhGiaKhongHaiLong + addVal.DanhGiaKhongHaiLong;
            return result;
        }

        public static SoLieuThongKeTheoDonViElement DataThuTucHandler(SoLieuThongKeTheoDonViElement prev, SoLieuThongKeTheoDonViElement addVal)
        {
            SoLieuThongKeTheoDonViElement result = prev;
            result.ThuTuc = prev.ThuTuc + addVal.ThuTuc;
            result.ThuTucPhatSinhHoSo = prev.ThuTucPhatSinhHoSo + addVal.ThuTucPhatSinhHoSo;

            result.ThuTucTrucTuyen = prev.ThuTucTrucTuyen + addVal.ThuTucTrucTuyen;
            result.ThuTucTrucTuyenPhatSinhHoSo = prev.ThuTucTrucTuyenPhatSinhHoSo + addVal.ThuTucTrucTuyenPhatSinhHoSo;
            return result;
        }

        public static SoLieuThongKeTheoDonViElement CalcTyLeAndDiem766(SoLieuThongKeTheoDonViElement data)
        {
            #region Tính tỷ lệ
            if (data.TiepNhanTrucTuyen > 0 && data.TiepNhanTrongKy > 0)
                data.TiepNhanTrucTuyenTyLe = ((double)data.TiepNhanTrucTuyen / (double)data.TiepNhanTrongKy) * 100;

            if (data.TiepNhanTrucTuyenThuTucTrucTuyen > 0 && data.TiepNhanThuTucTrucTuyen > 0)
                data.TiepNhanTrucTuyenThuTucTrucTuyenTyLe = ((double)data.TiepNhanTrucTuyenThuTucTrucTuyen / (double)data.TiepNhanThuTucTrucTuyen) * 100;

            if (data.DaXuLyDungHan + data.DaXuLyTruocHan > 0 && data.DaXuLy > 0)
                data.DaXuLyDungVaTruocHanTyLe = (((double)data.DaXuLyDungHan + (double)data.DaXuLyTruocHan) / (double)data.DaXuLy) * 100;

            if (data.TrucTuyenDaXuLyDungHan + data.TrucTuyenDaXuLyTruocHan > 0 && data.TrucTuyenDaXuLy > 0)
                data.TrucTuyenDaXuLyDungVaTruocHanTyLe = (((double)data.TrucTuyenDaXuLyDungHan + (double)data.TrucTuyenDaXuLyTruocHan) / (double)data.TrucTuyenDaXuLy) * 100;

            if (data.ThuTucCoPhatSinhThanhToanTrucTuyen > 0 && data.ThuTucCoThuPhi > 0)
                data.ThuTucCoPhatSinhThanhToanTrucTuyenTyLe = ((double)data.ThuTucCoPhatSinhThanhToanTrucTuyen / (double)data.ThuTucCoThuPhi) * 100;

            if (data.HoSoCoThuPhiThanhToanTrucTuyen > 0 && data.HoSoCoThuPhi > 0)
                data.HoSoCoThuPhiThanhToanTrucTuyenTyLe = ((double)data.HoSoCoThuPhiThanhToanTrucTuyen / (double)data.HoSoCoThuPhi) * 100;

            if (data.HoSoCoThanhPhan > 0 && data.HoSoCoDinhDanh > 0)
                data.HoSoCoThanhPhanTyLe = ((double)data.HoSoCoThanhPhan / (double)data.HoSoCoDinhDanh) * 100;

            if (data.HoSoDaXuLyXongCoKetQuaDienTu > 0 && data.HoSoDaXuLyXong > 0)
                data.HoSoDaXuLyXongCoSoHoaKetQuaTyLe = ((double)data.HoSoDaXuLyXongCoKetQuaDienTu / (double)data.HoSoDaXuLyXong) * 100;

            if (data.ThuTucPhatSinhHoSo > 0 && data.ThuTuc > 0)
                data.ThuTucPhatSinhHoSoTyLe = ((double)data.ThuTucPhatSinhHoSo / (double)data.ThuTuc) * 100;

            if (data.ThuTucTrucTuyenPhatSinhHoSo > 0 && data.ThuTucTrucTuyen > 0)
                data.ThuTucTrucTuyenPhatSinhHoSoTyLe = ((double)data.ThuTucTrucTuyenPhatSinhHoSo / (double)data.ThuTucTrucTuyen) * 100;
            #endregion

            #region Tính điểm 766
            data.DiemCongKhaiMinhBach = 6;
            data.DiemTyLeDongBoDVCQuocGia = 6;

            if (data.TiepNhanTrongKy > 0)
                data.DiemTienDoGiaiQuyet = (((double)data.DangXuLyDungHanVaTruocHan + (double)data.DaXuLyDungHanTruocHanVaTraLai) / (double)data.TiepNhanTrongKy) * 20;

            // DVCTT
            if (data.ThuTuc > 0)
            {
                double tyLe = ((double)data.ThuTucTrucTuyen / (double)data.ThuTuc) * 100;
                if (tyLe >= 80)
                    data.DiemTyLeCungCapDVCTT = 2;
                else
                    data.DiemTyLeCungCapDVCTT = 2 * 0.8;
            }

            if (data.ThuTucTrucTuyen > 0)
            {
                data.DiemTyLeDVCTTPhatSinhHoSo = (double)(((double)data.ThuTucTrucTuyenPhatSinhHoSo / (double)data.ThuTucTrucTuyen) * 4);
            }

            if (data.TiepNhanTrongKy > 0)
            {
                double tyLe = ((double)data.TiepNhanTrucTuyen / (double)data.TiepNhanTrongKy) * 100;
                if (tyLe >= 50)
                    data.DiemTyLeHoSoTTHCNopTrucTuyen = 6;
                else
                    data.DiemTyLeHoSoTTHCNopTrucTuyen = 6 * 0.5;
            }

            data.DiemCungCapDVCTT = (double)data.DiemTyLeCungCapDVCTT + (double)data.DiemTyLeDVCTTPhatSinhHoSo + (double)data.DiemTyLeHoSoTTHCNopTrucTuyen;

            // ThanhToanTrucTuyen
            if (data.ThuTucCoThuPhi > 0)
            {
                double tyLe = ((double)data.ThuTucCoPhatSinhThanhToanTrucTuyen / (double)data.ThuTucCoThuPhi) * 100;
                if (tyLe >= 50)
                    data.DiemTyLeTTHCCoGiaoDichTTTT = 2;
                else
                    data.DiemTyLeTTHCCoGiaoDichTTTT = 2 * 0.8;
            }

            data.DiemTyLeTTHCCoTheThanhToanTrenCongDVCQG = 2;

            if (data.HoSoCoThuPhi > 0)
            {
                double tyLe = ((double)data.HoSoCoThuPhiThanhToanTrucTuyen / (double)data.HoSoCoThuPhi) * 100;
                if (tyLe >= 30)
                    data.DiemTyLeHoSoTTTT = 6;
                else
                    data.DiemTyLeHoSoTTTT = 3 * 0.3;
            }

            data.DiemThanhToanTrucTuyen = (double)data.DiemTyLeTTHCCoGiaoDichTTTT + (double)data.DiemTyLeTTHCCoTheThanhToanTrenCongDVCQG + (double)data.DiemTyLeHoSoTTTT;

            // Số hóa
            if (data.HoSoThuocThamQuyenGiaiQuyet > 0)
                data.DiemTyLeCapKQDienTu = (double)(((double)data.HoSoDaXuLyCoKetQuaDienTu / (double)data.HoSoThuocThamQuyenGiaiQuyet) * 6);

            if (data.HoSoThuocThamQuyenGiaiQuyet > 0)
            {
                double tyLe = ((double)data.HoSoCoThanhPhanHoacKetQuaSoHoa / (double)data.HoSoThuocThamQuyenGiaiQuyet) * 100;
                if (tyLe >= 80)
                    data.DiemTyLeSoHoaHoSo = 4;
                else
                    data.DiemTyLeSoHoaHoSo = 4 * 0.8;
            }

            if (data.HoSoThuocThamQuyenGiaiQuyet > 0)
            {
                double tyLe = ((double)data.HoSoTaiSuDungSoHoaThanhPhan / (double)data.HoSoThuocThamQuyenGiaiQuyet) * 100;
                if (tyLe >= 80)
                    data.DiemTyLeTaiSuDung = 2;
                else
                    data.DiemTyLeTaiSuDung = 2 * 0.8;
            }

            data.DiemSoHoa = (double)data.DiemTyLeCapKQDienTu + (double)data.DiemTyLeSoHoaHoSo + (double)data.DiemTyLeTaiSuDung;

            data.TongDiem766 = (double)data.DiemCongKhaiMinhBach + (double)data.DiemTyLeDongBoDVCQuocGia + (double)data.DiemTienDoGiaiQuyet +
                (double)data.DiemCungCapDVCTT + (double)data.DiemThanhToanTrucTuyen + (double)data.DiemSoHoa;

            #endregion
            return data;
        }

        private static string GetQueryInsertOrUpdateSQL(string loaiThoiGian, string ky, string nam, string loaiThongKe, string? maDinhDanh, string soLieu, double? diem766)
        {
            Guid id = Guid.NewGuid();
            string tableName = "[Portal].[SoLieuBaoCaoTheoKys]";
            string whereString = $" WHERE LoaiThoiGian = N'{loaiThoiGian}' AND Ky = '{ky}' AND Nam = '{nam}' AND LoaiThongKe = '{loaiThongKe}' ";

            if (!string.IsNullOrEmpty(maDinhDanh))
                whereString += $" AND MaDinhDanh = '{maDinhDanh}'";
            DateTime current = DateTime.Now;

            return
                $"IF EXISTS (SELECT Id FROM {tableName} {whereString}) " +
                    $"BEGIN UPDATE {tableName} " +
                    $"SET Diem766 = {diem766}, SoLieu = N'{soLieu}', LastModifiedOn = '{current}' " +
                    $"{whereString} " +
                    $"END " +
                $"ELSE " +
                    $"BEGIN " +
                    $"INSERT INTO {tableName} " +
                        $"([Id], [LoaiThoiGian], [Ky], [Nam], [LoaiThongKe], [MaDinhDanh], [Diem766], [SoLieu], [CreatedOn]) " +
                    $"VALUES " +
                        $"('{id}', N'{loaiThoiGian}', '{ky}', '{nam}', '{loaiThongKe}', '{maDinhDanh}', {diem766}, N'{soLieu}', '{current}'); " +
                    $"END; ";
        }

        public static List<ThoiGianThongKeElement> GetThoiGian12ThangGanNhat()
        {
            var result = new List<ThoiGianThongKeElement>();
            var currentDate = DateTime.Now;

            // Thêm dữ liệu theo Tháng (12 tháng gần nhất)
            for (int i = 0; i < 12; i++)
            {
                var thang = currentDate.AddMonths(-i);
                result.Add(new ThoiGianThongKeElement
                {
                    LoaiThoiGian = "Tháng",
                    Ky = thang.Month,
                    Nam = thang.Year
                });
            }

            // Thêm dữ liệu theo Quý (4 quý gần nhất)
            for (int i = 0; i < 4; i++)
            {
                var thang = currentDate.AddMonths(-i * 3); // Quý là mỗi 3 tháng
                int quy = (thang.Month - 1) / 3 + 1;
                result.Add(new ThoiGianThongKeElement
                {
                    LoaiThoiGian = "Quý",
                    Ky = quy,
                    Nam = thang.Year
                });
            }

            // Thêm dữ liệu theo Năm (2 năm gần nhất)
            for (int i = 0; i < 2; i++)
            {
                var nam = currentDate.AddYears(-i);
                result.Add(new ThoiGianThongKeElement
                {
                    LoaiThoiGian = "Năm",
                    Ky = 0,
                    Nam = nam.Year
                });
            }

            return result;
        }

        public static DateTimeRequest GetThoiGian(string loaiThoiGian, int ky, int nam)
        {
            DateTime startDate;
            DateTime endDate;

            switch (loaiThoiGian)
            {
                case "Tháng":
                    startDate = new DateTime(nam, ky, 1); // Ngày đầu tháng
                    endDate = startDate.AddMonths(1).AddDays(-1); // Ngày cuối tháng
                    break;

                case "Quý":
                    startDate = new DateTime(nam, (ky - 1) * 3 + 1, 1); // Ngày đầu quý
                    endDate = startDate.AddMonths(3).AddDays(-1); // Ngày cuối quý
                    break;

                case "Năm":
                    startDate = new DateTime(nam, 1, 1); // Ngày đầu năm
                    endDate = new DateTime(nam, 12, 31); // Ngày cuối năm
                    break;

                default:
                    throw new ArgumentException("Loại thời gian không hợp lệ.");
            }

            DateTimeRequest result = new DateTimeRequest();
            result.StartDate = startDate;
            result.EndDate = endDate;

            return result;
        }

        public async Task<List<GroupDto>> GetGroups()
        {
            SearchGroupQuery queryGroups = new SearchGroupQuery();
            queryGroups.Type = "don-vi";
            queryGroups.HasMaDinhDanh = true;
            queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
            queryGroups.PageNumber = 1;
            queryGroups.PageSize = 10000;
            var groupsDto = await _mediator.Send(queryGroups);
            if (groupsDto.Data == null)
                throw new Exception("Groups not found or is empty.");
            List<GroupDto> groups = groupsDto.Data;
            return groups;
        }
    }

    public class DateTimeRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class ThoiGianThongKeElement
    {
        public string LoaiThoiGian { get; set; } = string.Empty;
        public int Ky { get; set; }
        public int Nam { get; set; }
    }
}
