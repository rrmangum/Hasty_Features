using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Files;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
	[Route("api/files")]
	[ApiController]
	public class FileApiController : BaseApiController
	{
		private IFileService _service = null;
		private IAuthenticationService<int> _authService = null;

		public FileApiController(
			IFileService service,
			ILogger<FileApiController> logger,
			IAuthenticationService<int> authService) : base(logger)
		{
			_service = service;
			_authService = authService;
		}

		[HttpGet("paginate")]
		public ActionResult<ItemResponse<Paged<File>>> GetPage(int pageIndex, int pageSize, bool isDeleted)
		{
			int code = 200;
			BaseResponse response = null;

			try
			{
				Paged<File> page = _service.GetAll(pageIndex, pageSize, isDeleted);

				if (page == null)
				{
					code = 404;
					response = new ErrorResponse("Files not found.");
				}
				else
				{
					response = new ItemResponse<Paged<File>> { Item = page };
				}
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
				base.Logger.LogError(ex.ToString());
			}
			return StatusCode(code, response);
		}

		[HttpGet("current")]
		public ActionResult<ItemResponse<Paged<File>>> GetCurrentPaged(int pageIndex, int pageSize)
		{
			int code = 200;
			BaseResponse response = null;

			try
			{
				int userId = _authService.GetCurrentUserId();

				Paged<File> page= _service.GetByUserId(pageIndex, pageSize, userId);

				if (page == null)
				{
					code = 404;
					response = new ErrorResponse("Files not found.");
				}
				else
				{
					response = new ItemResponse<Paged<File>> { Item = page };
				}
			}
			catch (Exception ex)
			{

				code = 500;
				base.Logger.LogError(ex.ToString());
				response = new ErrorResponse($"Generic Error: {ex.Message}");
			}
			return StatusCode(code, response);
		}

		[HttpGet("search")]
		public ActionResult<ItemResponse<Paged<File>>> SearchPage(int pageIndex, int pageSize, bool isDeleted, string query)
		{
			int code = 200;
			BaseResponse response = null;

			try
			{
				Paged<File> page = _service.Search(pageIndex, pageSize, isDeleted, query);

				if (page == null)
				{
					code = 404;
					response = new ErrorResponse("Files not found.");
				}
				else
				{
					response = new ItemResponse<Paged<File>> { Item = page };
				}
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
				base.Logger.LogError(ex.ToString());
			}
			return StatusCode(code, response);
		}

		[HttpPost]
		public ActionResult<ItemsResponse<BaseFile>> Create(List<IFormFile> file)
		{
			int code = 201;
			BaseResponse response = null;

			try
			{
				int userId = _authService.GetCurrentUserId();

				List<BaseFile> list = _service.Add(file, userId);
				if (list == null)
				{
					code = 400;
					response = new ErrorResponse("No files selected to upload");
				}
				else
				{
					response = new ItemsResponse<BaseFile>() { Items = list };
				}
			}
			catch (Exception ex)
			{
				code = 500;
				base.Logger.LogError(ex.ToString());
				response = new ErrorResponse($"Generic Error: {ex.Message}");
			}
			return StatusCode(code, response);
		}

		[HttpPut("{id:int}")]
		public ActionResult<SuccessResponse> Delete(int id)
		{
			int code = 200;
			BaseResponse response = null;

			try
			{
				_service.ChangeStatus(id);

				response = new SuccessResponse();
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
			}
			return StatusCode(code, response);
		}
	}
}