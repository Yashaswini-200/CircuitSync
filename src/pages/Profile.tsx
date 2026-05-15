/**
 * Profile page placeholder content
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';

const Profile = () => {
  return (
    <MainLayout>
      <PageShell title="Profile" description="Your engineering identity" accent="green">
        <Card title="User Stats" subtitle="Track your progress" accent="green">
          <p className="text-sm text-gray-300">Check rank, XP, streak stability, and next milestone goals.</p>
        </Card>
        <Card title="Settings" subtitle="System preferences" accent="purple">
          <p className="text-sm text-gray-300">Adjust notifications, theme preferences, and personalization settings.</p>
        </Card>
      </PageShell>
    </MainLayout>
  );
};

export default Profile;
