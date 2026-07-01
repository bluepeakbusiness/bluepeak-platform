import MainLayout from "../components/Layout/MainLayout";

import DashboardCard from "../components/dashboard/DashboardCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import CEOReport from "../components/dashboard/CEOReport";
import EmployeeStatus from "../components/dashboard/EmployeeStatus";
import ApprovalQueue from "../components/dashboard/ApprovalQueue";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard(){

return(

<MainLayout>

<div className="dashboard-grid">

<div className="stats">

<DashboardCard />

<DashboardCard />

<DashboardCard />

<DashboardCard />

</div>

<CEOReport/>

<RevenueChart/>

<EmployeeStatus/>

<ApprovalQueue/>

<ActivityFeed/>

<QuickActions/>

</div>

</MainLayout>

);

}