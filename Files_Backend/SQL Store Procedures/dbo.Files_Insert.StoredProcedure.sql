USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Files_Insert]    Script Date: 1/27/2023 10:54:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Ryan Mangum>
-- Create date: <2023/01/25>
-- Description: <Files Insert>
-- Code Reviewer: Paul Park

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Files_Insert]
				@Name nvarchar(100)
				,@Url nvarchar(255)
				,@FileTypeId int
				,@UserId int
				,@Id int OUTPUT
				

/*-----------Test Code--------

	Declare @Id int = 0
			
	Declare @Name nvarchar(100) = 'Amazon Logo'
			,@Url nvarchar(255) = 'https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg'
			,@FileTypeId int = 3
			,@UserId int = 5
	
	Execute dbo.Files_Insert
							@Name
							,@Url
							,@FileTypeId
							,@UserId
							,@Id OUTPUT

	SELECT *
	FROM dbo.Files
	WHERE Id = @Id

*/

AS

BEGIN

	INSERT INTO [dbo].[Files]
			   ([Name]
			   ,[Url]
			   ,[FileTypeId]
			   ,[CreatedBy])
		 VALUES
			   (@Name
			   ,@Url
			   ,@FileTypeId
			   ,@UserId)

	SET @Id = SCOPE_IDENTITY()

END

GO
