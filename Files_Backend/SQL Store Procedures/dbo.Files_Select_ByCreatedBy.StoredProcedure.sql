USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_ByCreatedBy]    Script Date: 1/27/2023 10:54:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/01/25>
-- Description: <Files SelectByCreatedBy Pagination>
-- Code Reviewer: Paul Park

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Files_Select_ByCreatedBy]
		@PageIndex int
		,@PageSize int
		,@UserId int

/*---Test Code---

	DECLARE @PageIndex int = 0
			,@PageSize int = 3
			,@UserId int = 5

	EXECUTE dbo.Files_Select_ByCreatedBy
			@PageIndex
			,@PageSize
			,@UserId

	SELECT *
	FROM [dbo].[Files]

*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT f.[Id]
		  ,f.[Name]
		  ,f.[Url]
		  ,f.[FileTypeId]
		  ,t.[Name] AS FileType
		  ,f.[IsDeleted]
		  ,f.[CreatedBy]
		  ,f.[DateCreated]		  
		  ,TotalCount = Count(1) OVER()

	  FROM [dbo].[Files] AS f inner join [dbo].[FileTypes] AS t
							  ON f.FileTypeId = t.Id
	  WHERE f.CreatedBy = @UserId
	  ORDER BY f.Id	  

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END


GO
