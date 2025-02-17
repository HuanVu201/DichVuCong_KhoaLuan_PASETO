namespace TD.DichVuCongApi.Application.Common.Publisher;
public interface IBusinessPublisher : ITransientService
{
    #region Ket noi dvc
    Task PublishAsync<TBusinessEvent>(TBusinessEvent bussinessEvent);
    #endregion
}
