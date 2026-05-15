/**
 * Battles page placeholder content
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';

const Battles = () => {
  return (
    <MainLayout>
      <PageShell title="Battles" description="Challenge your engineering peers" accent="purple">
        <Card title="Ongoing Battle" subtitle="Embedded vs VLSI" accent="purple">
          <p className="text-sm text-gray-300">You are currently leading the current matchup with a strong task completion streak.</p>
        </Card>
        <Card title="Next Duel" subtitle="Prepare to compete" accent="cyan">
          <p className="text-sm text-gray-300">Ready up for your next question battle and keep your ranking high.</p>
        </Card>
      </PageShell>
    </MainLayout>
  );
};

export default Battles;
