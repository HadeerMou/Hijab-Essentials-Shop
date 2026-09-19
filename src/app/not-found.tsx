import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[65vh] flex-col items-center justify-center py-24 text-center">
      <p className="label-sm text-ash">404</p>
      <h1 className="h-section mt-5">
        This one has <span className="font-script">slipped</span> away
      </h1>
      <p className="prose-brand mt-4 max-w-sm">
        The page you were after is not here. It may have been a colourway we retired.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/shop" className="btn-solid">
          Shop the collection
        </Link>
        <Link href="/" className="btn-ghost">
          Back home
        </Link>
      </div>
    </div>
  );
}
