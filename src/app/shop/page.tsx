import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopClient from '@/components/ShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Hijabs in jersey, chiffon, crinkle cotton, modal and silk — plus the undercaps, pins and volumisers that go with them.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="shell py-32">
          <p className="label-sm text-ash">Loading the collection…</p>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
