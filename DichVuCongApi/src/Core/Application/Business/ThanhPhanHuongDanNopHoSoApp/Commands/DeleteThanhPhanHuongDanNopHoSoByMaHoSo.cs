using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public  record DeleteThanhPhanHuongDanNopHoSoByMaHoSo(string HoSo) : ICommand;

