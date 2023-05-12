using System;

namespace Hasty.Models.Domain.Files
{
    public class File : BaseFile
    {	
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public LookUp Type { get; set; }
        public DateTime DateCreated { get; set; }

    }
}