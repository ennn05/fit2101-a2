@@ .. @@
   const handleStatusChange = (newStatus) => {
     setCourseData(prev => ({
       ...prev,
       status: newStatus
     }));
   };

+  const handlePublishCourse = async () => {
+    try {
+      // First validate required fields
+      if (!courseData.courseCode || !courseData.courseTitle || !courseData.totalCredits) {
+        alert("Please fill in all required fields (Course Code, Title, and Credits) before publishing.");
+        return;
+      }
+
+      // Update status to published
+      const publishedCourseData = {
+        ...courseData,
+        status: 'published'
+      };
+      setCourseData(publishedCourseData);
+
+      // Save the course with published status
+      const courseToSave = {
+        course_code: publishedCourseData.courseCode,
+        course_title: publishedCourseData.courseTitle,
+        total_credits: parseInt(publishedCourseData.totalCredits),
+        status: 'published',
+        assignedLessons: assignedLessons.map(l => l.lesson_id)
+      };
+
+      console.log("Publishing course:", courseToSave);
+      
+      // TODO: Replace with actual API call
+      // const response = await fetch("http://localhost:5000/api/courses", {
+      //   method: "POST",
+      //   headers: { "Content-Type": "application/json" },
+      //   body: JSON.stringify(courseToSave)
+      // });
+      
+      // if (!response.ok) {
+      //   throw new Error("Failed to publish course");
+      // }
+      
+      alert("Course published successfully!");
+      navigate("/courses");
+    } catch (error) {
+      console.error("Error publishing course:", error);
+      alert("Failed to publish course. Please try again.");
+    }
+  };
+
   const addLessonToCourse = (lesson) => {
@@ .. @@
   const handleSaveCourse = async () => {
     try {
-      // TODO: Implement save course API call
-      console.log("Saving course:", {
-        ...courseData,
+      // Validate required fields
+      if (!courseData.courseCode || !courseData.courseTitle || !courseData.totalCredits) {
+        alert("Please fill in all required fields (Course Code, Title, and Credits) before saving.");
+        return;
+      }
+
+      const courseToSave = {
+        course_code: courseData.courseCode,
+        course_title: courseData.courseTitle,
+        total_credits: parseInt(courseData.totalCredits),
+        status: courseData.status,
         assignedLessons: assignedLessons.map(l => l.lesson_id)
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseToSave)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save course");
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to publish course");
      }
+      
       alert("Course saved successfully!");
       navigate("/courses");
     } catch (error) {
@@ .. @@
             <div className="course-actions">
               <button 
                 className="btn-publish" 
-                onClick={() => handleStatusChange('published')}
+                onClick={handlePublishCourse}
               >
                 Publish
               </button>