import { NextResponse } from 'next/server';
import { PRODUCTS_DATA } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('q');

  let results = [...PRODUCTS_DATA];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tamilName?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    products: results,
  });
}

