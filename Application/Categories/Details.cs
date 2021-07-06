using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Categories;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class Details
    {
        public class Query : IRequest<CategoryDto>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, CategoryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CategoryDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories
                .FindAsync(request.Id);

                if (category == null)
                    throw new RestException(HttpStatusCode.NotFound, new { category = "Not Found" });

                var categoryToReturn = _mapper.Map<Category, CategoryDto>(category);

                return categoryToReturn;
            }
        }
    }
}