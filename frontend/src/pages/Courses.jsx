@@ .. @@
   const handleCourseClick = (courseId) => {
     navigate(`/courses/${courseId}`);
   };

+  const handleAddCourse = () => {
+    navigate("/courses/add");
+  };
+
   const handleLogout = () => {
     localStorage.removeItem("user");
     navigate("/");
@@ .. @@
         {/* Add Course Button */}
-        <button className="fab" onClick={() => console.log("Add course clicked")}>
+        <button className="fab" onClick={handleAddCourse}>
           +
         </button>
       </div>