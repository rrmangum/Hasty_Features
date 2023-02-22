# Hasty Features


This repo is a collection of my work from the Los Angeles based startup, Hasty. The repo is organized in sub-folders by feature.

---

### Feature #1 - Files Backend

I built the entire backend for handling file storage, when I started there was not a single line of code, or even a database table. The service first uploads files to an Amazon S3 bucket, and then stores the resulting URL in the website database. I completed the code and tested the controllers using the Postman client.

* Relational Table Design
* Storage Procedures
* .NET Models
* Service Methods
* Service Interface
* API Controller

---

### Feature #2 - File Manager

I created a file manager for use by website administrators. This displays file data in a table format with the option of altering the view to a grid/card view. Admins can switch from viewing active files to deleted files, and can chose to restore or delete any file in their database using this component. Additionally admins can follow links to various cloud storage providers. 

### Grid View
![File Manager Grid View](https://github.com/rrmangum/Hasty_Features/blob/main/Images/file_manager_grid.png?raw=true)

### Table View
![File Manager Table View](https://github.com/rrmangum/Hasty_Features/blob/main/Images/file_manager_table.png?raw=true)

---

### Feature #3 - User Settings Page

This page allows users to update their profile information. It is a secured route that can only be accessed by logged in users. They can change their name, and upload a new profile picture. 

![User Settings Page](https://github.com/rrmangum/Hasty_Features/blob/main/Images/user_settings_page.png?raw=true)
---

### Feature #4 - File Upload React Component

This is a dynamic functional component that is meant to be used by other developers on the team. They can import the component either as a single file upload (renders as an icon) or as multiple file uploads (render as a drop zone). The two different presentations of the component and functionality are tied to props and must be passed to the component when imported in the parent component. This uses the react-dropzone library. The resulting file data returned from the upload file API is wrapped in Formik to make it easier for other developers to access the file url. This component is meant for developers to implement in specific components and therefore does not have a significant styling effort.

![File Upload Component](https://github.com/rrmangum/Hasty_Features/blob/main/Images/file_uploader.png?raw=true)
