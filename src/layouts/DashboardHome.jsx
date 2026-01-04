
import Charts from "./Charts";
import HabitsTable from "./HabitsTable";
import OverviewCards from "./OverviewCards";

const DashboardHome = () => {
  return (
    <>
      <OverviewCards/>
        <Charts />
      <HabitsTable />
    </>
  );
};

export default DashboardHome;
