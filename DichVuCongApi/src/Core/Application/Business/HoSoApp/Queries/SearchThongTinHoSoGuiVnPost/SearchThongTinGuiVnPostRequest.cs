using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchThongTinHoSoGuiVnPost;
public sealed record SearchThongTinGuiVnPostRequest(List<string> Ids) : IRequest<List<ThongTinGuiVnPostResponse>>;

