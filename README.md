# [Starred Notes]
# Check it on render.com: [Starrednotes](https://starrednotes.onrender.com)
# Database Schema Design
![db-schema](./images/starrednotes.png)
# API Documentation



# Courses
- Users should be able to view all the courses.
    - GET /api/courses
- Users should be able to create a course.
    - POST /api/courses
- Users should be able to update their course(s) contents.
    - PUT /api/courses/:course_id
- Users should be able to delete their courses.
    - DELETE /api/courses/:course_id
# Lessons
- Users should be able to view all the lessons.
    - GET /api/courses/:course_id/lessons
- Users should be able to create a lesson.
    - POST /api/courses/:course_id
- Users should be able to update their lesson(s) contents.
    - PUT /api/courses/:course_id/:lesson_id
- Users should be able to delete their lessons.
    - DELETE /api/courses/:course_id/:lesson_id
# Course Comments
- Users should be able to view all the comments.
    - GET /api/courses/:course_id/comments
- Users should be able to add a comment.
    - POST /api/courses/:course_id
- Users should be able to update their comments.
    - PUT /api/courses/:course_id/:comment_id
- Users should be able to delete their comments.
    - DELETE /api/courses/:course_id/:comment_id