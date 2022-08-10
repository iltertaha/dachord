using Application.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MusicEvents
{
    public class EventParams : PagingParams
    {
        public bool IsGoing { get; set; }

        public bool IsHost { get; set; }

        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
