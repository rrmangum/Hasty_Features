USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_SelectAll]    Script Date: 1/27/2023 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/01/25>
-- Description: <Files SelectAll Pagination>
-- Code Reviewer: Paul Park

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Files_SelectAll]
			@PageIndex int
			,@PageSize int

/*---------Test Code----------

	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[Files_SelectAll]
			@PageIndex
			,@PageSize

*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT f.[Id]
		  ,f.[Name]
		  ,f.[Url]
		  ,f.[FileTypeId]
		  ,t.[Name] as FileType
		  ,f.[IsDeleted]
		  ,f.[CreatedBy]
		  ,f.[DateCreated]		  
		  ,TotalCount = Count(1) OVER()

	  FROM [dbo].[Files] AS f inner join [dbo].[FileTypes] AS t
							  ON f.FileTypeId = t.Id
	  ORDER BY f.Id

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END


GO
