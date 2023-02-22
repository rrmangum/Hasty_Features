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

### Feature #2 - File Upload React Component

This is a dynamic functional component that is meant to be used by other developers on the team. They can import the component either as a single file upload (renders as an icon) or as multiple file uploads (render as a drop zone). The two different presentations of the component and functionality are tied to props and must be passed to the component when imported in the parent component. This uses the react-dropzone library.


