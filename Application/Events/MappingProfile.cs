using Domain;
using AutoMapper;

namespace Application.Events
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Event, EventDto>();
        }
    }
}