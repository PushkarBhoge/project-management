import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { SignIn, SignUp } from "@clerk/clerk-react";

const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/landing" element={<LandingPage />} />
                <Route
                    path="/sign-in/*"
                    element={
                        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-zinc-950 p-4 transition-colors">
                            <SignIn routing="path" path="/sign-in" />
                        </div>
                    }
                />
                <Route
                    path="/sign-up/*"
                    element={
                        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-zinc-950 p-4 transition-colors">
                            <SignUp routing="path" path="/sign-up" />
                        </div>
                    }
                />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="team" element={<Team />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projectsDetail" element={<ProjectDetails />} />
                    <Route path="taskDetails" element={<TaskDetails />} />
                    <Route path="projects/:projectId/tasks/:taskId" element={<TaskDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
