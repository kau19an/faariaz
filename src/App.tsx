import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Category from "./pages/Category";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostEditor from "./pages/admin/PostEditor";
import LanguageRedirector from "./components/LanguageRedirector";

function App() {
  return (
    <>
      <LanguageRedirector />

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/:lang/login" element={<Login />} />

        {/* Main */}
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Post />} />
          <Route path="blog/topic/:slug" element={<Category />} />
        </Route>

        {/* Languages */}
        <Route path="/:lang" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Post />} />
          <Route path="blog/topic/:slug" element={<Category />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute />}>
          {/* Main */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/new" element={<PostEditor />} />
          <Route path="/admin/edit/:slug" element={<PostEditor />} />

          {/* Languages */}
          <Route path="/:lang/admin" element={<AdminDashboard />} />
          <Route path="/:lang/admin/new" element={<PostEditor />} />
          <Route path="/:lang/admin/edit/:slug" element={<PostEditor />} />
        </Route>

        {/* 404 */}
        <Route path="/:lang/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
