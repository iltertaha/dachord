using Application.Comments;
using Application.MusicEvents;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;


            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.isHostOfTheEvent).AppUser.UserName));

            CreateMap<ActivityAttendee, ParticipantDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMainPhoto).Url));


            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMainPhoto).Url))
                .ForMember(d => d.FollowersCnt, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCnt, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.FollowingCnt, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            

            CreateMap<Comment,CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMainPhoto).Url));


        }

    }
}
