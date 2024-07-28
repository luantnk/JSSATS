﻿using BusinessObjects.Models;
using Repositories.Interface.GenericRepository;

namespace Repositories.Interface;

public interface IGoldPriceRepository : IReadRepository<Gold> , ICreateRepository<Gold>
{
    Task<int> Update(Gold entity);
}