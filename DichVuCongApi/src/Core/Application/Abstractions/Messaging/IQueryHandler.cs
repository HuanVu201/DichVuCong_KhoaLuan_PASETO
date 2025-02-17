namespace TD.DichVuCongApi.Application.Abstractions.Messaging;
internal interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : class, IQuery<TResponse>
{

}
