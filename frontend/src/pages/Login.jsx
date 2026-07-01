import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Input from '../components/inputs/Input';
import PageContainer from '../components/common/PageContainer';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    await login(form);
  };

  return (
    <PageContainer className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Sign in</h2>
      <p className="text-sm text-slate-600">Access the BLUEPEAK AI OS workspace.</p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <PrimaryButton className="w-full" type="submit">Login</PrimaryButton>
      </form>
      <div className="flex justify-between text-sm text-slate-600">
        <Link to="/register">Create account</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </PageContainer>
  );
}
