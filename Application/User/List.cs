using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<AppUserDto>> { }

        public class Handler : IRequestHandler<Query, List<AppUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AppUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.ToListAsync();

                return _mapper.Map<List<AppUser>, List<AppUserDto>>(users);
            }
        }
    }
}