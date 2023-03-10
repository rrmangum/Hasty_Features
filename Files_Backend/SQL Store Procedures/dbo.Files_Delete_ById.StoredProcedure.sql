USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_Delete_ById]    Script Date: 1/30/2023 11:44:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/01/25>
-- Description: <Files DeleteById>
-- Code Reviewer: Paul Park

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Files_Delete_ById]
		@Id int

/*---------Test Code------------

	DECLARE @Id int = 19
	
	SELECT *
	FROM [dbo].[Files]
	WHERE Id = @Id	

	EXECUTE dbo.Files_Delete_ById @Id

	SELECT *
	FROM [dbo].[Files]
	WHERE Id = @Id	

*/

AS

BEGIN

	UPDATE [dbo].[Files]
	SET [isDeleted] = ~isDeleted
	WHERE [Id] = @Id

END


GO
