import { supabase } from './supabase';

// Эта строчка заставляет сервер загружать данные заново при каждом обновлении
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Загружаем данные на сервере
  const { data: books } = await supabase.from('books').select('*');

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <header className="flex justify-between items-center p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold tracking-widest text-amber-500 uppercase">
          SilkEwa
        </h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-amber-400 transition">
            Библиотека
          </a>
        </nav>
      </header>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-900">
          <img
            src="/yin-lang.jpg"
            alt="Yin Lang"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center space-y-4 px-4">
          <h2 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg">
            Миры SilkEwa
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Погрузитесь в истории о страсти, тайнах и запретной любви.
          </p>
        </div>
      </section>

      <section className="p-8 max-w-6xl mx-auto">
        <h3 className="text-3xl font-serif text-amber-500 mb-8 border-b border-neutral-800 pb-2">
          Мои Романы
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books?.map((book) => (
            <div
              key={book.id}
              className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-600 transition group cursor-pointer shadow-lg"
            >
              <div className="h-64 bg-neutral-800 relative flex items-center justify-center">
                <span className="text-neutral-500 font-serif text-xl">
                  Обложка
                </span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                  {book.title}
                </h4>
                <p className="text-sm text-neutral-400 mt-2 line-clamp-3">
                  {book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {(!books || books.length === 0) && (
          <p className="text-neutral-500">Книг пока нет...</p>
        )}
      </section>
    </main>
  );
}
