import express from 'express';
import { getCourses, getCourse, getInstructorCourses, addCourse } from "../controllers/Controllers.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.get("/instructor", getInstructorCourses);
// router.get("/instructor/:id", getInstructorCourses);
router.get("/instructor/:id", getCourse);

export default router;
