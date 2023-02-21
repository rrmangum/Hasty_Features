using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Sabio.Data.Providers;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Sabio.Models;
using Sabio.Services.Interfaces;
using Sabio.Data;
using Sabio.Models.Domain;
using System;
using File = Sabio.Models.Domain.Files.File;
using Microsoft.AspNetCore.Http;
using Sabio.Models.AppSettings;
using Microsoft.Extensions.Options;
using Sabio.Models.Enums;
using Sabio.Models.Domain.Files;
using System.Globalization;

namespace Sabio.Services
{
	public class FileService : IFileService
	{
		IDataProvider _data = null;
		private static IAmazonS3 s3Client;
		private AwsKeys _awsKeys;

		public FileService(IDataProvider data, IOptions<AwsKeys> awsKeys)
		{
			_data = data;
			_awsKeys = awsKeys.Value;
		}

		public Paged<File> GetAll(int pageIndex, int pageSize, bool isDeleted)
		{
			Paged<File> pagedList = null;
			List<File> list = null;
			int totalCount = 0;

			string procName = "[dbo].[Files_SelectAll]";

			_data.ExecuteCmd(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@PageIndex", pageIndex);
					col.AddWithValue("@PageSize", pageSize);
					col.AddWithValue("@IsDeleted", isDeleted);
				},
				singleRecordMapper: delegate (IDataReader reader, short set)
				{
					int startingIndex = 0;

					File file = MapSingleFile(reader, ref startingIndex);

					if (totalCount == 0)
					{
						totalCount = reader.GetSafeInt32(startingIndex++);
					}

					if (list == null)
					{
						list = new List<File>();
					}

					list.Add(file);
				}
				);
			if (list != null)
			{
				pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
			}
			return pagedList;
		}

		public Paged<File> GetByUserId(int pageIndex, int pageSize, int userId)
		{
			Paged<File> pagedList = null;
			List<File> list = null;
			int totalCount = 0;

			string procName = "[dbo].[Files_Select_ByCreatedBy]";

			_data.ExecuteCmd(procName,
			inputParamMapper: delegate (SqlParameterCollection col)
			{
				col.AddWithValue("@PageIndex", pageIndex);
				col.AddWithValue("@PageSize", pageSize);
				col.AddWithValue("@UserId", userId);
			},
			singleRecordMapper: delegate (IDataReader reader, short set)
			{
				int startingIndex = 0;

				File file = MapSingleFile(reader, ref startingIndex);

				if (totalCount == 0)
				{
					totalCount = reader.GetSafeInt32(startingIndex++);
				}

				if (list == null)
				{
					list = new List<File>();
				}
				list.Add(file);
			});
			if (list != null)
			{
				pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
			}
			return pagedList;
		}

		public Paged<File> Search(int pageIndex, int pageSize, bool isDeleted, string query)
		{
			Paged<File> pagedList = null;
			List<File> list = null;
			int totalCount = 0;

			string procName = "[dbo].[Files_Search]";

			_data.ExecuteCmd(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@PageIndex", pageIndex);
					col.AddWithValue("@PageSize", pageSize);
					col.AddWithValue("@IsDeleted", isDeleted);
					col.AddWithValue("@Query", query);
				},
				singleRecordMapper: delegate (IDataReader reader, short set)
				{
					int startingIndex = 0;

					File file = MapSingleFile(reader, ref startingIndex);

					if (totalCount == 0)
					{
						totalCount = reader.GetSafeInt32(startingIndex++);
					}

					if (list == null)
					{
						list = new List<File>();
					}

					list.Add(file);
				}
				);
			if (list != null)
			{
				pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
			}
			return pagedList;
		}

		public void ChangeStatus(int id)
		{
			string procName = "[dbo].[Files_ChangeStatus_ById]";

			_data.ExecuteNonQuery(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@Id", id);
				});
		}

		public List<BaseFile> Add(List<IFormFile> files, int userId)
		{
			const string bucketName = "sabio-training";
			RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
			s3Client = new AmazonS3Client(_awsKeys.AccessKey, _awsKeys.SecretKey, bucketRegion);
			var fileTransferUtility = new TransferUtility(s3Client);

			List<BaseFile> list = null;

			foreach (IFormFile file in files)
			{
				string keyName = $"{Guid.NewGuid()}/{file.FileName.Replace(" ", String.Empty)}";
				string url = $"https://{bucketName}.s3-{bucketRegion.SystemName}.amazonaws.com/{keyName}";
							
				var fileTransferUtilityRequest = new TransferUtilityUploadRequest
				{
					BucketName = bucketName,
					Key = keyName,
					InputStream = file.OpenReadStream(),
				};

				fileTransferUtility.Upload(fileTransferUtilityRequest);

				list = AddFileToDb(userId, list, file, url);
			}
			return list;
		}

		private List<BaseFile> AddFileToDb(int userId, List<BaseFile> list, IFormFile file, string url)
		{
			string fileType = file.ContentType.Substring(file.ContentType.LastIndexOf("/") + 1);
			TextInfo info = CultureInfo.CurrentCulture.TextInfo;
			fileType = info.ToTitleCase(fileType);

			string procName = "[dbo].[Files_Insert]";
			int id = 0;

			BaseFile aFile = new BaseFile();

			_data.ExecuteNonQuery(procName,
				inputParamMapper: delegate (SqlParameterCollection col)
				{
					col.AddWithValue("@Name", file.FileName);
					col.AddWithValue("@Url", url);
					col.AddWithValue("@FileTypeId", FindFileTypeId(fileType));
					col.AddWithValue("@UserId", userId);

					SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
					idOut.Direction = ParameterDirection.Output;

					col.Add(idOut);
				}, returnParameters: delegate (SqlParameterCollection returnCollection)
				{
					object oId = returnCollection["@Id"].Value;

					int.TryParse(oId.ToString(), out id);

					aFile.Id = id;
					aFile.Name = file.FileName;
					aFile.Url = url;

					if (list == null)
					{
						list = new List<BaseFile>();
					}
					list.Add(aFile);
				}
			);
			return list;
		}

		private int FindFileTypeId(string fileType)
		{
			FileType fileTypeId = (FileType)Enum.Parse(typeof(FileType), fileType);

			return (int) fileTypeId;
		}

		private static File MapSingleFile(IDataReader reader, ref int startingIndex)
		{
			File aFile = new();

			aFile.Id = reader.GetSafeInt32(startingIndex++);
			aFile.Name = reader.GetSafeString(startingIndex++);
			aFile.Url = reader.GetSafeString(startingIndex++);
			aFile.Type = new LookUp();
			aFile.Type.Id = reader.GetSafeInt32(startingIndex++);
			aFile.Type.Name = reader.GetSafeString(startingIndex++);
			aFile.IsDeleted = reader.GetSafeBool(startingIndex++);
			aFile.CreatedBy = reader.GetSafeInt32(startingIndex++);
			aFile.DateCreated = reader.GetSafeDateTime(startingIndex++);

			return aFile;
		}
	}
}