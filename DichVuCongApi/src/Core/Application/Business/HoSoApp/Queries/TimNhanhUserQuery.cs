

using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public sealed record TimNhanhUserQuery(string SoDinhDanh) : IQuery<UserCSDLResponse>;

