import Header from '../components/layout/header';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <p>Page not found</p>
      </div>
    </div>
  );
}
