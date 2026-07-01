import { Link } from 'react-router-dom';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Input from '../components/inputs/Input';
import PageContainer from '../components/common/PageContainer';

export default function ForgotPassword() {
  return (
    <PageContainer className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Reset password</h2>
      <p className="text-sm text-slate-600">Enter your email to receive a secure reset link.</p>
      <form className="space-y-4">
        <Input placeholder="Email" />
        <PrimaryButton className="w-full" type="submit">Send reset link</PrimaryButton>
      </form>
      <Link className="text-sm text-slate-600" to="/login">Back to login</Link>
    </PageContainer>
  );
}
