﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MusicEvents
{
    public class ParticipantDto
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string Image { get; set; }

        public bool Following { get; set; }

        public int FollowersCnt { get; set; }

        public int FollowingCnt { get; set; }
    }
}
