import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Input from '../components/inputs/Input';
import PageContainer from '../components/common/PageContainer';
import { authApi } from '../services/authApi';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    await authApi.register(form);
  };

  return (
    <PageContainer className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Create account</h2>
      <p className="text-sm text-slate-600">Join the BLUEPEAK platform.</p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input placeholder="Full name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
        <Input placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <PrimaryButton className="w-full" type="submit">Register</PrimaryButton>
      </form>
      <Link className="text-sm text-slate-600" to="/login">Back to login</Link>
    </PageContainer>
  );
}
