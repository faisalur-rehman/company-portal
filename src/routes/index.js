import React from "react"
import { Redirect } from "react-router-dom"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

//dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import TourGuideForm from "../pages/Dashboard/Form"
import Introduction from "../pages/Forms/Introduction"
import GeneralInformation from "pages/Forms/GeneralInformation"
import ToursMilan from "pages/Forms/TourMilan"
import MeetPoint from "pages/Forms/MeetingPoint"
import FAQ from "pages/Forms/FAQ"
import Town from "pages/Forms/Town"
import UploadAssets from "pages/Forms/UploadAssets"
import CompanyProfile from "pages/Forms/CompanyProfile"
import CompanyJobDescription from "pages/Forms/CompanyJobDescription"
import ReactAdmin from "pages/AdminView/CompanyProfiles"
import JobsFeed from "pages/Jobs/JobsFeed"
import CompanyJob from "pages/Jobs/CompanyJob"
import RecruitersAdminView from "pages/AdminView/RecruiterProfiles"
import AdminWelcome from "pages/AdminView/AdminWelcome"
import EmployerData from "pages/Forms/JobDescription/EmployerData"
import JobDetails from "pages/Forms/JobDescription/JobDetails"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  // { path: "/form", component: TourGuideForm },
  // { path: "/introduction", component: Introduction },
  // { path: "/generalInformation", component: GeneralInformation },
  // { path: "/tourMilan", component: ToursMilan },
  // { path: "/meetPoint", component: MeetPoint },
  // { path: "/faq", component: FAQ },
  // { path: "/town", component: Town },
  // { path: "/uploadAssets", component: UploadAssets },
  { path: "/profile", component: UserProfile },
  { path: "/companyProfile", component: CompanyProfile },
  { path: "/jobDescription", component: CompanyJobDescription },
  { path: "/adminView", component: ReactAdmin },
  { path: "/jobsFeed", component: JobsFeed },
  { path: "/companyJob", component: CompanyJob },
  { path: "/recruitersAdminView", component: RecruitersAdminView },
  { path: "/welcomeAdmin", component: AdminWelcome },
  { path: "/employerData", component: EmployerData },
  { path: "/jobDetails", component: JobDetails },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
