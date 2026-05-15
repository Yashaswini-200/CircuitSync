/**
 * Tasks page placeholder content
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';

const Tasks = () => {
  return (
    <MainLayout>
      <PageShell title="Tasks" description="Plan your engineering mission" accent="green">
        <Card title="Morning Sprint" subtitle="Embedded systems" accent="green">
          <p className="text-sm text-gray-300">Review ARM assembly, solve GPIO challenge, log progress.</p>
        </Card>
        <Card title="Focus Goals" subtitle="VLSI tracks" accent="cyan">
          <p className="text-sm text-gray-300">Complete Verilog module, review timing constraints, update notes.</p>
        </Card>
      </PageShell>
    </MainLayout>
  );
};

export default Tasks;
