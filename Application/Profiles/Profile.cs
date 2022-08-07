using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }    

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string Image { get; set; }

        // to indicate current logged in user following this profile or not
        public bool Following { get; set; }

        public int FollowersCnt { get; set; }

        public int FollowingCnt { get; set; }
        public ICollection<Photo> Photos { get; set; }
        
    }
}
