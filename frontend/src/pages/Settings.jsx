import PageContainer from '../components/common/PageContainer';
import PageHeader from '../components/common/PageHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function Settings() {
  return (
    <PageContainer>
      <PageHeader title="Settings" subtitle="Configure your workspace preferences and security options." actions={<PrimaryButton>Save</PrimaryButton>} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">Theme settings placeholder</div>
        <div className="rounded-xl border border-slate-200 p-4">Notifications placeholder</div>
      </div>
    </PageContainer>
  );
}
