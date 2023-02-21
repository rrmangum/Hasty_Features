USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[FileTypes_SelectAll]    Script Date: 1/27/2023 10:54:57 AM ******/
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

CREATE PROC [dbo].[FileTypes_SelectAll]

/*---Test Code---

	EXECUTE [dbo].[FileTypes_SelectAll]

*/

AS

BEGIN

	SELECT [Id]
		  ,[Name]
	  FROM [dbo].[FileTypes]

END

GO
