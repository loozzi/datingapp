﻿using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    otp => otp.MapFrom(
                        src => src.Photos.FirstOrDefault(p => p.IsMain).Url
                    )
                )
                .ForMember(
                    dest => dest.Age,
                    otp => otp.MapFrom(
                        src => src.DateOfBirth.CalculateAge()
                    )
                );
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, otp => otp.MapFrom(
                        src => src.Sender.Photos.FirstOrDefault(p => p.IsMain).Url
                    ))
                .ForMember(dest => dest.RecipientPhotoUrl, otp => otp.MapFrom(
                        src => src.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url
                    ));
        }
    }
}
