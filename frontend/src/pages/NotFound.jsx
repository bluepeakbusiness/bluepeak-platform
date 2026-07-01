import { Link } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

export default function NotFound() {
  return (
    <PageContainer className="space-y-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-slate-600">The page you requested is not available yet.</p>
      <Link className="text-blue-600" to="/">Return home</Link>
    </PageContainer>
  );
}
