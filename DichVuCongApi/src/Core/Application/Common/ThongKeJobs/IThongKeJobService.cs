
namespace TD.DichVuCongApi.Application.Common.ThongKeJobs;
public interface IThongKeJobService : ITransientService
{
    Task AddOrUpdate();
}
