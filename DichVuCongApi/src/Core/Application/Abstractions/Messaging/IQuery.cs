﻿namespace TD.DichVuCongApi.Application.Abstractions.Messaging;
public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{

}
