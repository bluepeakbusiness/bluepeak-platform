import PageContainer from '../components/common/PageContainer';
import PageHeader from '../components/common/PageHeader';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';

export default function Profile() {
  return (
    <PageContainer>
      <PageHeader title="Profile" subtitle="Manage your account profile and preferences." actions={<><SecondaryButton>Upload avatar</SecondaryButton><PrimaryButton>Save</PrimaryButton></>} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">User profile placeholder</div>
        <div className="rounded-xl border border-slate-200 p-4">Preferences placeholder</div>
      </div>
    </PageContainer>
  );
}
