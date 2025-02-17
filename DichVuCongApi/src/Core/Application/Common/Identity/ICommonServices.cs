using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.Identity;
public interface ICommonServices : ITransientService
{ 
    CommonSettings Get();
}
