using AutoMapper;
using DatingApp.API.Dtos;
using System.Linq;
using System;
namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>().ForMember(dest => dest.PhotoUrl,option => 
                     {option.MapFrom(src=> src.Photos.FirstOrDefault(predicate=>predicate.IsMain).Url ); } )
                     .ForMember(dest => dest.Age, option => { option.MapFrom(src=> src.DateOfBirth.CalculateAge());} )  ;
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl,option => 
                     {option.MapFrom(src=> src.Photos.FirstOrDefault(predicate=>predicate.IsMain).Url ); } )
                     .ForMember(dest => dest.Age, option => { option.MapFrom(src=> src.DateOfBirth.CalculateAge());} )  ;
            ;
            CreateMap<Photo,PhotosForDetailDto>();
CreateMap<UserForUpdateDto,User>();
CreateMap<Photo,PhotoForReturnDto>();
CreateMap<PhotoForCreationDto,Photo>();
        }   
    }
}