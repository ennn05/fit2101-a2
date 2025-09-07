import { getAllCourses, getCoursesByInstructor, getCourseByCode } from "../models/course.js";
import { createCourse } from "../models/course.js";

export const getCourses = async (req, res) => {
    try {
        const courses = await getAllCourses();
        console.log("Courses fetched:", courses);
        return res.status(200).json({ success: true, data: courses });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch courses." });
    }
};

export const getInstructorCourses = async (req, res) => {
    console.log("HI")
    const instructorId = req?.user?.user_id;
    console.log(instructorId);
    if (!instructorId) return res.status(401).json({success: false, error: "Unauthorized" });

    try {
        const courses = await getCoursesByInstructor(instructorId);
        return res.status(200).json({ success: true, data: courses });        
    }
    catch (error) {
        console.error("Error fetching courses by instructor:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch courses by instructor." });
    }
};

export const getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await getCourseByCode(id);
        if (course) {
            return res.status(200).json({ success: true, data: course });
        }
        return res.status(404).json({ success: false, message: "Course not found." });
    }
    catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch course." });
    }
};

export const addCourse = async (req, res) => {
    try {
        const { course_code, course_title, total_credits, status, assignedLessons } = req.body;
        
        // Validate required fields
        if (!course_code || !course_title || !total_credits) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: course_code, course_title, total_credits" 
            });
        }

        // For now, use a default instructor ID (1) since we don't have authentication
        // In a real app, this would come from the authenticated user
        const instructorId = 1;

        const courseData = {
            course_code,
            course_title,
            total_credits: parseInt(total_credits),
            course_creator: instructorId,
            course_status: status || 'draft'
        };

        console.log("Creating course:", courseData);
        const newCourse = await createCourse(courseData);
        
        // TODO: Handle assigned lessons if needed
        if (assignedLessons && assignedLessons.length > 0) {
            console.log("Assigned lessons:", assignedLessons);
            // Implement lesson assignment logic here
        }

        return res.status(201).json({ 
            success: true, 
            data: newCourse,
            message: "Course created successfully" 
        });
    }
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to create course." 
        });
    }

}