import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { LangProvider } from "@/contexts/LangContext";
import { DataProvider } from "@/contexts/DataContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/PublicLayout";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Portfolio from "@/pages/Portfolio";
import PortfolioDetail from "@/pages/PortfolioDetail";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

import Login from "@/pages/admin/Login";
import Signup from "@/pages/admin/Signup";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AdminServices from "@/pages/admin/AdminServices";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminArticles from "@/pages/admin/AdminArticles";
import AdminLogos from "@/pages/admin/AdminLogos";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminIG from "@/pages/admin/AdminIG";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";

function RequireAuth() {
  const { user, token } = useAuth();
  if (!user && !token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster richColors position="top-right" />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetail />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/:slug" element={<PortfolioDetail />} />
              <Route path="articles" element={<Articles />} />
              <Route path="articles/:slug" element={<ArticleDetail />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />

            <Route path="/admin" element={<RequireAuth />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="logos" element={<AdminLogos />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="analytics/:section" element={<AdminAnalytics />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="media-library" element={<AdminMedia />} />
                <Route path="ig" element={<AdminIG />} />
                <Route path="content-generator" element={<AdminIG />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </LangProvider>
  );
}
