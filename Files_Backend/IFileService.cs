using Microsoft.AspNetCore.Http;
using Sabio.Models;
using Sabio.Models.Domain.Files;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFileService
    {
		Paged<File> GetAll(int pageIndex, int pageSize, bool isDeleted);
        Paged<File> GetByUserId(int pageIndex, int pageSize, int userId);
		Paged<File> Search(int pageIndex, int pageSize, bool isDeleted, string query);
		public List<BaseFile> Add(List<IFormFile> files, int userId);
		void ChangeStatus(int id);		
	}
}