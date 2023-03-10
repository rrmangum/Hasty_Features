USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_ChangeStatus_ById]    Script Date: 2/14/2023 2:08:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/01/25>
-- Description: <Files DeleteById>
-- Code Reviewer: Paul Park

-- MODIFIED BY: Ryan Mangum
-- MODIFIED DATE: 2023-02-11
-- Code Reviewer: Manuel Garcia
-- Note:
-- =============================================

CREATE PROC [dbo].[Files_ChangeStatus_ById]
		@Id int

/*---------Test Code------------

	DECLARE @Id int = 124
	
	SELECT *
	FROM [dbo].[Files]
	WHERE Id = @Id	

	EXECUTE dbo.Files_ChangeStatus_ById @Id

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
