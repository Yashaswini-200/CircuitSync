import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import CalendarDashboard from '../components/Calendar/CalendarDashboard';

const CalendarPage = () => {
  return (
    <MainLayout>
      <PageShell title="Calendar" description="Track your productivity and completed days" accent="cyan">
        <CalendarDashboard />
      </PageShell>
    </MainLayout>
  );
};

export default CalendarPage;
