@@ .. @@
 import Login from "./pages/login";
 import Lessons from "./pages/Lessons";
 import Courses from "./pages/Courses";
 import CourseDetails from "./pages/CourseDetails";
+import AddCourse from "./pages/AddCourse";

 function App() {
   return (
@@ .. @@
         <Route path="/lessons" element={<Lessons />} />
         <Route path="/courses" element={<Courses />} />
         <Route path="/courses/:courseId" element={<CourseDetails />} />
+        <Route path="/courses/add" element={<AddCourse />} />
       </Routes>
     </Router>
   );
 }