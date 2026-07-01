import MainLayout from "../components/Layout/MainLayout";

import DashboardCard from "../components/dashboard/DashboardCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import EmployeeStatus from "../components/dashboard/EmployeeStatus";
import RecentLeads from "../components/dashboard/RecentLeads";
import ApprovalQueue from "../components/dashboard/ApprovalQueue";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import QuickActions from "../components/dashboard/QuickActions";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import CEOReport from "../components/dashboard/CEOReport";

export default function Dashboard() {
  return (
    <MainLayout>

      <DashboardCard />

      <CEOReport />

      <RevenueChart />

      <EmployeeStatus />

      <RecentLeads />

      <ApprovalQueue />

      <NotificationPanel />

      <TodaySchedule />

      <QuickActions />

      <ActivityFeed />

    </MainLayout>
  );
}