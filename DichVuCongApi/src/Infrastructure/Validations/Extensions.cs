﻿using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.Validations;
public static class Extensions
{
    public static IServiceCollection AddBehaviours(this IServiceCollection services, Assembly assemblyContainingValidators)
    {
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        return services;
    }
}
