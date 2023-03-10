USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_Search]    Script Date: 2/14/2023 2:08:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/02/11>
-- Description: <Files Search Pagination>
-- Code Reviewer: 

-- MODIFIED BY: Ryan Mangum
-- MODIFIED DATE: 2023/02/13
-- Code Reviewer: Manuel Garcia
-- Note:
-- =============================================

CREATE PROC [dbo].[Files_Search]
			@PageIndex int
			,@PageSize int
			,@IsDeleted bit
			,@Query nvarchar(100)

/*---------Test Code----------

	DECLARE @PageIndex int = 0
			,@PageSize int = 300
			,@IsDeleted bit = 0
			,@Query nvarchar(100) = 'React'

	EXECUTE [dbo].[Files_Search]
			@PageIndex
			,@PageSize
			,@IsDeleted
			,@Query

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
	  WHERE f.[isDeleted] = @IsDeleted AND (f.Name LIKE '%' + @Query + '%') 
																			OR (t.name LIKE '%' + @Query + '%') 
																			OR (f.Id LIKE '%' + @Query + '%')
	  ORDER BY f.Id

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END


GO
