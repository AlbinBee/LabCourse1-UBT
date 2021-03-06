using Application.Events;
using AutoMapper;
using Domain;

namespace Application.Categories
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Event, EventDto>();
        }
    }
}