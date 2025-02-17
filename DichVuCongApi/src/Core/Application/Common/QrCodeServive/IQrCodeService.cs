namespace TD.DichVuCongApi.Application.Common.QrCodeServive;

public class iQrCode
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
}
public interface IQrCodeService : ITransientService
{
    public Task LogAsync(QrCodeServiceRequestParams req);
    public Task<iQrCode?> GetQrAsync(GetQrCodeById req);

}


