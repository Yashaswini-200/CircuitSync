/**
 * Streaks page placeholder content
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';

const Streaks = () => {
  return (
    <MainLayout>
      <PageShell title="Streaks" description="Keep your consistency alive" accent="orange">
        <Card title="Current Cadence" subtitle="Daily commitment" accent="orange">
          <p className="text-sm text-gray-300">Today is streak day 4. Maintain your rhythm with a quick task.</p>
        </Card>
        <Card title="Risk Meter" subtitle="24-hour window" accent="purple">
          <p className="text-sm text-gray-300">A missed session will reset your streak. Keep the momentum.</p>
        </Card>
      </PageShell>
    </MainLayout>
  );
};

export default Streaks;
