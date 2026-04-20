import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
    <div className="rounded-2xl bg-white p-10 text-center shadow-soft">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="mt-2 text-slate-500">Page not found.</p>
      <Link className="mt-4 inline-block rounded-xl bg-brand-600 px-4 py-2 text-white" to="/">
        Go to dashboard
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
