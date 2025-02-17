using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenDuLieuTaiKhoanCommandHandler : ICommandHandler<ChuyenDuLieuTaiKhoanCommand, int>
{
    private readonly IDapperRepository _dapperRepository;
    public ChuyenDuLieuTaiKhoanCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<Result<int>> Handle(ChuyenDuLieuTaiKhoanCommand request, CancellationToken cancellationToken)
    {
        var sql = $@"UPDATE hs
                    SET  
                    NguoiDaXuLy = CASE 
                                  WHEN NguoiDaXuLy LIKE '%##%' 
                                  THEN REPLACE(REPLACE(REPLACE(NguoiDaXuLy, CONCAT('##', @idUserCurr, '##'), CONCAT('##', @idUserNew, '##')), CONCAT(@idUserCurr, '##'), CONCAT(@idUserNew, '##')), CONCAT('##', @idUserCurr), CONCAT('##', @idUserNew))
                                  ELSE REPLACE(NguoiDaXuLy, @idUserCurr, @idUserNew)
                                  END,
                    NguoiXuLyTiep = CASE 
                                    WHEN NguoiXuLyTiep LIKE '%##%' 
                                    THEN REPLACE(REPLACE(REPLACE(NguoiXuLyTiep, CONCAT('##', @idUserCurr, '##'), CONCAT('##', @idUserNew, '##')), CONCAT(@idUserCurr, '##'), CONCAT(@idUserNew, '##')), CONCAT('##', @idUserCurr), CONCAT('##', @idUserNew))
                                    ELSE REPLACE(NguoiXuLyTiep, @idUserCurr, @idUserNew)
                                    END,
                    NguoiDangXuLy = CASE 
                                    WHEN NguoiDangXuLy LIKE '%##%' 
                                    THEN REPLACE(REPLACE(REPLACE(NguoiDangXuLy, CONCAT('##', @idUserCurr, '##'), CONCAT('##', @idUserNew, '##')), CONCAT(@idUserCurr, '##'), CONCAT(@idUserNew, '##')), CONCAT('##', @idUserCurr), CONCAT('##', @idUserNew))
                                    ELSE REPLACE(NguoiDangXuLy, @idUserCurr, @idUserNew)
                                    END,
                    NguoiXuLyTruoc = CASE 
                                     WHEN NguoiXuLyTruoc LIKE '%##%' 
                                     THEN REPLACE(REPLACE(REPLACE(NguoiXuLyTruoc, CONCAT('##', @idUserCurr, '##'), CONCAT('##', @idUserNew, '##')), CONCAT(@idUserCurr, '##'), CONCAT(@idUserNew, '##')), CONCAT('##', @idUserCurr), CONCAT('##', @idUserNew))
                                     ELSE REPLACE(NguoiXuLyTruoc, @idUserCurr, @idUserNew)
                                     END,
                    NguoiNhanHoSo = CASE 
                                    WHEN NguoiNhanHoSo LIKE '%##%' 
                                    THEN REPLACE(REPLACE(REPLACE(NguoiNhanHoSo, CONCAT('##', @idUserCurr, '##'), CONCAT('##', @idUserNew, '##')), CONCAT(@idUserCurr, '##'), CONCAT(@idUserNew, '##')), CONCAT('##', @idUserCurr), CONCAT('##', @idUserNew))
                                    ELSE REPLACE(NguoiNhanHoSo, @idUserCurr, @idUserNew)
                                    END
                   FROM Business.HoSos hs
				   where MaHoSo = @MaHoSo";
        if (request.MaHoSo.Count > 0)
        {
            foreach (var item in request.MaHoSo)
            {
                var data = await _dapperRepository.ExcuteAsync(sql, new {
                    MaHoSo = item,
                    idUserCurr = request.idUserCurr,
                    idUserNew = request.idUserNew,
                });
            }
        }
        else
        {
            throw new Exception("Không có hồ sơ nào được chọn để chuyển dữ liệu");
        }
        return Result<int>.Success("Chuyển dữ liệu thành công");
    }


}
