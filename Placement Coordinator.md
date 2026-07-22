# Placement Coordinator Web Application — UI/UX Guide

## 1. Product Overview

Build a multi-tenant placement management web application for educational institutions.

Each organization operates independently and manages its own:

* Students
* Placement coordinators
* Sections
* Groups
* Tasks
* Placement preparation activities
* Assessments
* Student performance

A platform-level Super Admin manages all registered organizations and the overall application.

---

## 2. User Roles

### Super Admin

The Super Admin manages the complete platform.

Responsibilities:

* Create, approve, activate, suspend, or delete organizations
* View all organizations
* View organization usage statistics
* Manage subscription plans
* Manage platform settings
* Manage global permissions
* Monitor application activity
* View reports and audit logs
* Handle support requests

### Organization Admin

The Organization Admin manages one institution or organization.

Responsibilities:

* Configure organization details
* Create placement coordinator accounts
* Assign roles and permissions
* Create departments, batches, sections, and groups
* Add or import students
* Assign coordinators to sections or groups
* View organization-wide placement activity
* Manage assessments, tasks, and announcements
* View student preparation reports

### Placement Coordinator

An organization can have more than ten placement coordinators.

Each coordinator should receive permissions through Role-Based Access Control.

Responsibilities may include:

* Manage assigned students
* Manage assigned sections or groups
* Create daily tasks
* Create placement homework
* Create assessments
* Review student submissions
* Monitor student preparation
* Share announcements
* Generate reports

### Student

Students use the platform to prepare for placements.

Responsibilities:

* View assigned tasks
* Complete placement homework
* Take self-assessments
* Attend coordinator-created assessments
* View results and feedback
* Track preparation progress
* View announcements and placement activities
* Manage profile and skills

---

## 3. Authentication

### Login Options

Allow users to log in using:

* Username and password
* Email and password

Recommended additions:

* Forgot password
* Reset password
* Email verification
* Change password
* Remember me
* Logout from all devices
* Account activation status
* Optional multi-factor authentication

### Login Screen

The login page should contain:

* Organization or application logo
* Username or email field
* Password field
* Show or hide password option
* Remember me checkbox
* Forgot password link
* Login button
* Support or contact link

The system must identify the user's organization and role after login and redirect them to the correct dashboard.

---

## 4. Organization Structure

The application should support a flexible organization hierarchy.

```text
Organization
├── Academic Year
├── Department
├── Course or Program
├── Batch
├── Section
│   ├── Section A
│   ├── Section B
│   ├── Section C
│   └── Custom Sections
└── Groups
    ├── Aptitude Group
    ├── Coding Group
    ├── Interview Group
    └── Custom Groups
```

Organizations should be able to create any number of sections such as:

* Section A
* Section B
* Section C
* Section D
* Section E

Sections should not be hard-coded.

Each section should support:

* Section name
* Section code
* Department
* Batch
* Academic year
* Assigned coordinators
* Student count
* Status
* Description

---

## 5. Group Management

Groups allow organizations and coordinators to organize students within or across sections.

Examples:

* Advanced coding group
* Aptitude improvement group
* Interview preparation group
* Company-specific preparation group
* Low-performance support group

A student may belong to multiple groups.

Group creation form:

* Group name
* Description
* Group type
* Associated sections
* Assigned coordinators
* Selected students
* Start date
* End date
* Active or inactive status

Group listing page:

* Group name
* Number of students
* Assigned coordinator
* Related sections
* Active tasks
* Upcoming assessments
* Status
* Actions

---

## 6. Main Navigation

### Student Navigation

```text
Dashboard
Activities
Daily Tasks
Placement Homework
Self-Assessment
Assessments
Results
Announcements
Preparation Progress
Profile
```

### Coordinator Navigation

```text
Dashboard
Students
Sections
Groups
Activities
Daily Tasks
Placement Homework
Assessments
Submissions
Results
Announcements
Reports
Calendar
Settings
```

### Organization Admin Navigation

```text
Dashboard
Students
Coordinators
Roles and Permissions
Departments
Batches
Sections
Groups
Activities
Tasks
Assessments
Announcements
Reports
Organization Settings
```

### Super Admin Navigation

```text
Dashboard
Organizations
Organization Requests
Users
Plans and Subscriptions
Platform Analytics
Support
Audit Logs
Global Settings
```

---

## 7. Dashboard

Each role should have a different dashboard.

### Student Dashboard

Display:

* Welcome message
* Preparation progress
* Today's tasks
* Pending homework
* Upcoming assessments
* Latest assessment score
* Completed activities
* Missed deadlines
* Recent announcements
* Coordinator feedback
* Skill performance chart

Recommended cards:

* Tasks due today
* Pending homework
* Upcoming assessments
* Completed tasks
* Average score
* Current preparation level

### Placement Coordinator Dashboard

Display:

* Total assigned students
* Assigned sections
* Active groups
* Tasks created
* Pending submissions
* Upcoming assessments
* Students needing attention
* Recent student activity
* Assessment performance
* Section-wise progress

Recommended charts:

* Student preparation progress
* Assessment score distribution
* Task completion rate
* Section-wise performance
* Group-wise performance
* Weekly activity trend

### Organization Admin Dashboard

Display:

* Total students
* Total coordinators
* Total departments
* Total sections
* Active groups
* Active assessments
* Student participation rate
* Assessment completion rate
* Placement preparation progress
* Coordinator activity
* Recent organization activity

### Super Admin Dashboard

Display:

* Total organizations
* Active organizations
* Suspended organizations
* Total users
* Total students
* Total coordinators
* Subscription distribution
* Organization growth
* Platform activity
* Support requests
* System health summary

---

## 8. Activities Module

The Activities module tracks placement-related events and actions.

Activity examples:

* Aptitude training
* Coding practice
* Mock interview
* Resume review
* Group discussion
* Company orientation
* Placement drive
* Workshop
* Seminar
* Technical training

Activity creation form:

* Activity title
* Description
* Activity type
* Date
* Start time
* End time
* Location or meeting link
* Assigned sections
* Assigned groups
* Assigned students
* Assigned coordinators
* Attachments
* Attendance required
* Status

Activity statuses:

* Draft
* Scheduled
* Ongoing
* Completed
* Cancelled

Activity detail screen:

* Activity information
* Participants
* Attendance
* Attachments
* Notes
* Feedback
* Related tasks
* Completion summary

---

## 9. Daily Tasks Bar

The dashboard should include a daily tasks section or task bar.

The component should show:

* Today's tasks
* Due time
* Priority
* Completion status
* Assigned by
* Related section or group
* Quick complete action

Task statuses:

* Not started
* In progress
* Completed
* Overdue
* Skipped

Task priorities:

* Low
* Medium
* High
* Critical

The daily task bar may appear as:

```text
[3 Pending] [2 Completed] [1 Overdue]

09:00 AM  Complete aptitude test        High
12:00 PM  Submit resume                Medium
05:00 PM  Finish coding assignment     High
```

Students should be able to:

* Open task details
* Mark task as started
* Submit task
* Add comments
* Upload attachments
* View feedback

---

## 10. Placement Homework Module

Placement coordinators can create homework for students, sections, or groups.

Homework creation form:

* Title
* Description
* Instructions
* Category
* Difficulty
* Assigned sections
* Assigned groups
* Selected students
* Start date
* Due date
* Maximum score
* Attachments
* Submission type
* Allow late submissions
* Auto-reminder settings

Homework categories:

* Aptitude
* Coding
* Communication
* Resume preparation
* Interview preparation
* Group discussion
* Technical subjects
* Company-specific preparation

Submission types:

* Text response
* File upload
* URL submission
* Multiple files
* Code submission
* External platform link

Student homework view:

* Instructions
* Due date
* Remaining time
* Attachments
* Submission area
* Submission history
* Coordinator feedback
* Score

Coordinator submission view:

* Student name
* Section
* Submission date
* Submission status
* Score
* Feedback
* Late submission indicator

---

## 11. Self-Assessment Module

Students should be able to create or take self-assessments to evaluate their preparation.

Self-assessment categories:

* Aptitude
* Logical reasoning
* Verbal ability
* Coding
* Technical knowledge
* Communication
* Interview readiness
* Resume readiness

Self-assessment flow:

```text
Choose Category
      ↓
Choose Difficulty
      ↓
Choose Number of Questions
      ↓
Start Assessment
      ↓
Submit Answers
      ↓
View Score and Explanation
      ↓
Receive Preparation Suggestions
```

Self-assessment screen:

* Assessment title
* Category
* Difficulty
* Question count
* Estimated duration
* Start button

Assessment attempt screen:

* Question number
* Question content
* Answer options
* Previous and next controls
* Mark for review
* Timer
* Question navigator
* Submit assessment button

Result screen:

* Total score
* Correct answers
* Incorrect answers
* Unanswered questions
* Time taken
* Category-wise performance
* Answer explanations
* Weak areas
* Recommended next steps

---

## 12. Coordinator-Created Assessments

Placement coordinators can create assessments for:

* Individual students
* Groups
* Sections
* Departments
* Entire batches

Assessment creation flow:

```text
Assessment Details
      ↓
Question Selection or Creation
      ↓
Assignment Rules
      ↓
Schedule
      ↓
Review
      ↓
Publish
```

Assessment details:

* Assessment name
* Description
* Category
* Difficulty
* Instructions
* Duration
* Total marks
* Passing marks
* Number of attempts
* Negative marking
* Shuffle questions
* Shuffle options
* Show result immediately
* Allow answer review

Question types:

* Single-choice
* Multiple-choice
* True or false
* Short answer
* Long answer
* Coding question
* File upload
* Numerical answer

Assessment status:

* Draft
* Scheduled
* Active
* Completed
* Archived

Coordinator result view:

* Total assigned students
* Attempted
* Not attempted
* Passed
* Failed
* Average score
* Highest score
* Lowest score
* Average completion time

---

## 13. Question Bank

Add a reusable question bank for coordinators.

Question bank filters:

* Category
* Topic
* Difficulty
* Question type
* Created by
* Organization
* Tags

Question details:

* Question
* Answer options
* Correct answer
* Explanation
* Marks
* Negative marks
* Difficulty
* Tags
* Created by
* Last updated

Allow coordinators to:

* Create questions
* Edit questions
* Duplicate questions
* Import questions
* Export questions
* Archive questions
* Add questions to assessments

---

## 14. Student Management

Student listing page columns:

* Student name
* Registration number
* Email
* Phone
* Department
* Batch
* Section
* Groups
* Preparation score
* Account status
* Actions

Filters:

* Department
* Batch
* Section
* Group
* Preparation status
* Account status
* Assessment performance

Student profile page:

* Personal information
* Academic information
* Skills
* Resume
* Placement preparation progress
* Tasks
* Homework
* Assessments
* Scores
* Attendance
* Coordinator feedback
* Activity timeline

---

## 15. Coordinator Management

Coordinator listing page:

* Coordinator name
* Email
* Phone
* Role
* Assigned sections
* Assigned groups
* Permissions
* Status
* Last active
* Actions

Coordinator creation form:

* Name
* Email
* Username
* Phone
* Employee ID
* Role
* Assigned sections
* Assigned groups
* Permissions
* Account status

---

## 16. Roles and Permissions

Use Role-Based Access Control.

Example roles:

* Organization Admin
* Senior Placement Coordinator
* Placement Coordinator
* Assessment Manager
* Student Manager
* Report Viewer

Permission groups:

### Student Permissions

* View students
* Create students
* Edit students
* Delete students
* Import students
* Export students

### Section and Group Permissions

* View sections
* Create sections
* Edit sections
* Delete sections
* Manage group members

### Task Permissions

* View tasks
* Create tasks
* Edit tasks
* Delete tasks
* Review submissions

### Assessment Permissions

* View assessments
* Create assessments
* Edit assessments
* Publish assessments
* Review results
* Manage question bank

### Reporting Permissions

* View reports
* Export reports
* View organization analytics

Avoid assigning permissions directly to every coordinator. Create reusable roles and assign roles to coordinators.

---

## 17. Announcements and Notifications

Organizations and coordinators should be able to publish announcements.

Announcement form:

* Title
* Message
* Audience
* Sections
* Groups
* Students
* Publish date
* Expiry date
* Priority
* Attachments

Notification types:

* New task assigned
* Homework due
* Assessment scheduled
* Assessment starting
* Assessment result published
* Submission reviewed
* Announcement published
* Task overdue
* Account updates

Notification channels:

* In-app notification
* Email
* Optional SMS
* Optional WhatsApp integration

---

## 18. Calendar

Provide a shared placement calendar.

Calendar events:

* Assessments
* Tasks
* Homework deadlines
* Activities
* Placement drives
* Interviews
* Workshops
* Company visits

Calendar views:

* Day
* Week
* Month
* Agenda

Allow filtering by:

* Section
* Group
* Activity type
* Coordinator
* Assessment
* Placement drive

---

## 19. Placement Drive Module

This module is recommended because it is essential for a placement coordinator application.

Placement drive details:

* Company name
* Job title
* Job description
* Eligibility criteria
* Required skills
* Minimum academic percentage
* Allowed departments
* Eligible batches
* Application deadline
* Drive date
* Salary package
* Job location
* Number of openings
* Registration link
* Attachments

Placement stages:

```text
Eligible
→ Applied
→ Shortlisted
→ Aptitude Round
→ Technical Round
→ HR Round
→ Selected
→ Rejected
```

Student placement status should be visible in both student and coordinator dashboards.

---

## 20. Reports and Analytics

### Student Reports

* Task completion rate
* Homework completion rate
* Assessment performance
* Category-wise scores
* Preparation progress
* Attendance
* Placement eligibility
* Placement application status

### Coordinator Reports

* Coordinator activity
* Tasks created
* Assessments created
* Students managed
* Submission review time
* Assigned section performance

### Section Reports

* Total students
* Active students
* Task completion
* Assessment completion
* Average score
* Top-performing students
* Students needing attention

### Organization Reports

* Department-wise performance
* Batch-wise performance
* Section-wise performance
* Group-wise performance
* Placement drive results
* Selected students
* Company-wise placement statistics

Export options:

* PDF
* Excel
* CSV

---

## 21. Search, Filters, and Bulk Actions

All major list pages should include:

* Global search
* Filters
* Sorting
* Pagination
* Column visibility
* Export
* Bulk selection

Bulk actions may include:

* Assign to section
* Add to group
* Assign coordinator
* Activate account
* Deactivate account
* Assign task
* Assign assessment
* Send announcement
* Export selected records

---

## 22. Audit Logs

Maintain logs for important actions.

Log fields:

* User
* Role
* Organization
* Action
* Module
* Record
* Previous value
* Updated value
* Date and time
* IP address

Track actions such as:

* Student created or deleted
* Coordinator permission changed
* Assessment published
* Score updated
* Organization suspended
* Section deleted
* Group membership changed

---

## 23. UI Design Guidelines

### Layout

Use a responsive admin dashboard layout:

```text
┌────────────────────────────────────────────────────────┐
│ Top Header                                             │
├──────────────┬─────────────────────────────────────────┤
│ Sidebar      │ Page Header                             │
│ Navigation   ├─────────────────────────────────────────┤
│              │ Main Content                            │
│              │                                         │
│              │ Cards / Tables / Charts / Forms         │
└──────────────┴─────────────────────────────────────────┘
```

### Sidebar

The sidebar should support:

* Organization logo
* Collapsed and expanded states
* Role-based menu items
* Active menu indicator
* Nested menu sections
* Profile and logout at the bottom

### Top Header

Include:

* Page title
* Organization name
* Search
* Notifications
* Help
* Profile menu

### Page Header

Include:

* Page title
* Description
* Breadcrumbs
* Primary action button

Example:

```text
Students

Manage students, sections, groups, and placement preparation.

[Import Students] [Add Student]
```

---

## 24. Design System

Use consistent design tokens.

### Colors

Recommended categories:

* Primary: brand and main actions
* Success: completed, passed, active
* Warning: pending, upcoming, attention required
* Error: failed, overdue, suspended
* Info: informational states
* Neutral: backgrounds, borders, text

### Typography

Use clear hierarchy:

* Page title
* Section title
* Card title
* Body text
* Supporting text
* Table text
* Labels

### Components

Create reusable components for:

* Buttons
* Input fields
* Select dropdowns
* Date pickers
* Tables
* Cards
* Tabs
* Badges
* Modals
* Drawers
* Tooltips
* Empty states
* Skeleton loaders
* Charts
* File uploads
* Pagination
* Confirmation dialogs

---

## 25. Form Design Guidelines

Forms should:

* Group related fields
* Use clear labels
* Show required fields
* Display inline validation
* Preserve unsaved data where possible
* Warn before closing an incomplete form
* Support draft saving for long forms

Use a multi-step form for:

* Organization onboarding
* Assessment creation
* Placement drive creation
* Bulk student import

---

## 26. Mobile Responsiveness

The application should be usable on:

* Desktop
* Tablet
* Mobile

On mobile:

* Sidebar becomes a drawer
* Tables become responsive cards or horizontally scrollable tables
* Dashboard cards stack vertically
* Primary actions remain accessible
* Assessment navigation remains easy to use
* Daily tasks display as a timeline

---

## 27. Empty, Loading, and Error States

Every module should include proper UI states.

### Empty State

Example:

```text
No assessments created yet.

Create your first assessment and assign it to students.

[Create Assessment]
```

### Loading State

Use:

* Skeleton cards
* Skeleton rows
* Progress indicators

### Error State

Show:

* Clear error message
* Suggested action
* Retry button
* Support link for serious failures

---

## 28. Recommended Missing Features

The following features should be included to make the application complete:

* Placement drive management
* Company management
* Eligibility management
* Student resume management
* Question bank
* Attendance tracking
* Announcements
* Notifications
* Calendar
* Reports and exports
* Bulk student import
* Audit logs
* Subscription and plan management
* File and document management
* Coordinator feedback
* Student skill profiles
* Placement status tracking
* Organization branding
* Email templates
* Data backup and restore
* Activity history

---

## 29. Core Data Entities

```text
SuperAdmin
Organization
OrganizationUser
Role
Permission
Coordinator
Student
Department
Program
AcademicYear
Batch
Section
Group
GroupMember
Activity
Task
Homework
HomeworkSubmission
Assessment
AssessmentQuestion
AssessmentAttempt
Question
QuestionOption
Announcement
Notification
PlacementCompany
PlacementDrive
PlacementApplication
StudentSkill
StudentResume
Feedback
AuditLog
Subscription
```

---

## 30. Suggested Main User Flow

```text
Super Admin
    ↓
Creates or approves organization
    ↓
Organization Admin configures departments and sections
    ↓
Organization Admin creates coordinators and roles
    ↓
Students are added or imported
    ↓
Students are assigned to sections and groups
    ↓
Coordinators create activities, tasks, homework, and assessments
    ↓
Students complete assigned work
    ↓
Coordinators review performance and submissions
    ↓
Organization tracks placement readiness and drive results
```

---

## 31. MVP Scope

The first version should contain:

* Authentication
* Organization management
* Student management
* Coordinator management
* Roles and permissions
* Sections
* Groups
* Dashboard
* Daily tasks
* Placement homework
* Self-assessments
* Coordinator-created assessments
* Results
* Announcements
* Basic reports

The following can be introduced in later phases:

* Placement drives
* Company management
* Resume builder
* Advanced analytics
* AI-generated assessments
* AI preparation recommendations
* Video interview practice
* WhatsApp and SMS notifications
* Subscription billing
* Mobile application

