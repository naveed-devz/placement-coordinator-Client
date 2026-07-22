import { useState } from "react";
import { LoginScreen } from "@/components/layout/login-screen";
import { StudentShell } from "@/components/layout/student-shell";
import { initialAnnouncements, initialAssessments, initialHomework, initialTasks } from "@/data/student";
import { ActivitiesSection } from "@/sections/activities/activities-section";
import { AnnouncementsSection } from "@/sections/announcements/announcements-section";
import { AssessmentsSection } from "@/sections/assessments/assessments-section";
import { CodingPracticeSection } from "@/sections/coding-practice/coding-practice-section";
import { DailyTasksSection } from "@/sections/daily-tasks/daily-tasks-section";
import { DashboardSection } from "@/sections/dashboard/dashboard-section";
import { HomeworkSection } from "@/sections/homework/homework-section";
import { PreparationProgressSection } from "@/sections/preparation-progress/preparation-progress-section";
import { ProfileSection } from "@/sections/profile/profile-section";
import { ResultsSection } from "@/sections/results/results-section";
import { SelfAssessmentSection } from "@/sections/self-assessment/self-assessment-section";
import type { AnnouncementItem, AssessmentItem, HomeworkItem, NavLabel, TaskItem } from "@/types/student";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState<NavLabel>("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [taskItems, setTaskItems] = useState<TaskItem[]>(initialTasks);
  const [homeworkItems, setHomeworkItems] = useState<HomeworkItem[]>(initialHomework);
  const [assessmentItems, setAssessmentItems] = useState<AssessmentItem[]>(initialAssessments);
  const [announcementItems, setAnnouncementItems] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [toastMessage, setToastMessage] = useState("");

  function showToast(message: string) {
    setToastMessage(message);
  }

  function handleTaskAction(title: string) {
    setTaskItems((items) =>
      items.map((item) => {
        if (item.title !== title) return item;
        if (item.status === "Not started") return { ...item, status: "In progress" };
        return { ...item, status: "Completed" };
      }),
    );
    showToast("Task status updated.");
  }

  function handleSubmitHomework(title: string) {
    setHomeworkItems((items) => items.map((item) => (item.title === title ? { ...item, status: "Submitted" } : item)));
    showToast("Homework submitted successfully.");
  }

  function handleCreateAssessment(assessment: AssessmentItem) {
    setAssessmentItems((items) => [assessment, ...items]);
    showToast("Practice assessment created.");
  }

  function handleJoinAssessment(title: string) {
    setAssessmentItems((items) => items.map((item) => (item.title === title ? { ...item, status: "Joined" } : item)));
    showToast("Assessment joined.");
  }

  function handleMarkRead() {
    setAnnouncementItems((items) => items.map((item) => ({ ...item, read: true })));
    showToast("All announcements marked read.");
  }

  function renderSection() {
    switch (activeNav) {
      case "Activities":
        return <ActivitiesSection />;
      case "Daily Tasks":
        return <DailyTasksSection query={query} setQuery={setQuery} taskItems={taskItems} onTaskAction={handleTaskAction} />;
      case "Placement Homework":
        return <HomeworkSection homeworkItems={homeworkItems} onSubmitHomework={handleSubmitHomework} />;
      case "Coding Practice":
        return <CodingPracticeSection onAction={showToast} />;
      case "Self-Assessment":
        return <SelfAssessmentSection onLaunch={(title) => showToast(`${title} launched.`)} />;
      case "Assessments":
        return (
          <AssessmentsSection
            assessmentItems={assessmentItems}
            onCreateAssessment={handleCreateAssessment}
            onJoinAssessment={handleJoinAssessment}
          />
        );
      case "Results":
        return <ResultsSection />;
      case "Announcements":
        return <AnnouncementsSection announcementItems={announcementItems} onMarkRead={handleMarkRead} />;
      case "Preparation Progress":
        return <PreparationProgressSection />;
      case "Profile":
        return <ProfileSection />;
      default:
        return <DashboardSection taskItems={taskItems} onTaskAction={handleTaskAction} />;
    }
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <StudentShell
      activeNav={activeNav}
      mobileMenuOpen={mobileMenuOpen}
      sidebarCollapsed={sidebarCollapsed}
      toastMessage={toastMessage}
      onChangeNav={setActiveNav}
      onCloseMenu={() => setMobileMenuOpen(false)}
      onOpenMenu={() => setMobileMenuOpen(true)}
      onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
      onLogout={() => setIsLoggedIn(false)}
      onDismissToast={() => setToastMessage("")}
    >
      {renderSection()}
    </StudentShell>
  );
}

export default App;
