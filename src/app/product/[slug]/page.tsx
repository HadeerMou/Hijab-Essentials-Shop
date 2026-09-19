import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductDetail, { RelatedHeading } from '@/components/ProductDetail';
import Reveal from '@/components/Reveal';
import { PRODUCTS, getProduct, relatedProducts } from '@/lib/products';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Not found' };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} · Hijab Essentials`,
      description: product.tagline,
      images: [`/products/${product.slug}-${product.colours[0]}-a.jpg`],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 4);

  return (
    <>
      <ProductDetail product={product} />

      <section className="shell border-t border-mist py-20 md:py-28">
        <Reveal>
          <RelatedHeading />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
