/**
 * Teams page placeholder content
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';

const Teams = () => {
  return (
    <MainLayout>
      <PageShell title="Teams" description="Sync with your accountability crew" accent="cyan">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card title="Active Squad" subtitle="Embedded systems team" accent="cyan">
            <p className="text-sm text-gray-300">Coordinate daily checkpoints, share wins, and log collaborative progress.</p>
          </Card>
          <Card title="Collaboration" subtitle="VLSI study group" accent="green">
            <p className="text-sm text-gray-300">Review shared tasks, plan joint sessions, and support each other through challenges.</p>
          </Card>
        </div>
      </PageShell>
    </MainLayout>
  );
};

export default Teams;
