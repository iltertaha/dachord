using Application.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MusicEvents
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public string Venue { get; set; }

        public string HostUsername { get; set; }

        public bool IsCancelled { get; set; }
        public ICollection<ParticipantDto> Attendees { get; set; }

    }
}
