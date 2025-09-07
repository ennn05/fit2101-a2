import sql from "../db.js";

export const getAllCourses = async () => {
    const courses = await sql`SELECT * FROM "LMS".course;`;
    return courses;
}

export const getCoursesByInstructor = async (instructorId) => {
    const courses = await sql`SELECT * FROM "LMS".course WHERE course_creator = ${instructorId};`;
    return courses;
}

export const getCourseByCode = async (courseCode) => {
    const courses = await sql`SELECT * FROM "LMS".course c LEFT JOIN "LMS".instructor i ON c.course_creator = i.inst_user_id JOIN "LMS".user u
    ON i.inst_user_id = u.user_id WHERE course_code = ${courseCode};`;
    return courses[0];
}

export const createCourse = async (courseData) => {
    const { course_code, course_title, total_credits, course_creator, course_status } = courseData;
    
    const today = new Date().toISOString();
    
    const newCourse = await sql`
        INSERT INTO "LMS".course 
        (course_code, course_title, course_total_credit, course_creator, course_status, course_date_created, course_date_updated)
        VALUES (${course_code}, ${course_title}, ${total_credits}, ${course_creator}, ${course_status}, ${today}, ${today})
        RETURNING *;
    `;
    
    return newCourse[0];
