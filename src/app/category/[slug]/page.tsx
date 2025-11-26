export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">
          Kategori: {params.slug}
        </h1>
        <p>Bu test sayfası. Eğer bunu görüyorsan route çalışıyor demektir.</p>
      </div>
    </main>
  );
}
