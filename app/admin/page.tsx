'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  
  const [books, setBooks] = useState<any[]>([])
  const [selectedBook, setSelectedBook] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [chapterContent, setChapterContent] = useState('')
  const [chapterNumber, setChapterNumber] = useState(1)

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*')
    if (data) setBooks(data)
  }

  async function addBook(e: any) {
    e.preventDefault()
    const { error } = await supabase.from('books').insert([{ title, description, cover_url: coverUrl }])
    if (error) alert(error.message)
    else {
      alert('Книга добавлена!')
      setTitle(''); setDescription(''); setCoverUrl('');
      fetchBooks()
    }
  }

  async function addChapter(e: any) {
    e.preventDefault()
    if (!selectedBook) return alert('Сначала выберите книгу!')
    const { error } = await supabase.from('chapters').insert([{
      book_id: selectedBook,
      chapter_number: chapterNumber,
      title: chapterTitle,
      content: chapterContent
    }])
    if (error) alert(error.message)
    else {
      alert('Глава добавлена!')
      setChapterTitle(''); setChapterContent(''); setChapterNumber(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 font-sans">
      <h1 className="text-3xl mb-8 font-bold text-amber-500 border-b border-neutral-700 pb-4">Админ-панель SilkEwa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ФОРМА КНИГИ */}
        <form onSubmit={addBook} className="bg-neutral-800 p-6 rounded-lg space-y-4 shadow-lg border border-neutral-700">
          <h2 className="text-xl font-bold mb-4 text-amber-400">1. Добавить новый роман</h2>
          <input type="text" placeholder="Название книги" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 text-white" required />
          <textarea placeholder="Описание романа..." value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 text-white h-24" required></textarea>
          <input type="text" placeholder="Ссылка на обложку (URL картинки)" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 text-white" />
          <button type="submit" className="bg-amber-600 text-black px-6 py-3 rounded font-bold hover:bg-amber-500 w-full">Сохранить роман</button>
        </form>

        {/* ФОРМА ГЛАВЫ */}
        <form onSubmit={addChapter} className="bg-neutral-800 p-6 rounded-lg space-y-4 shadow-lg border border-neutral-700">
          <h2 className="text-xl font-bold mb-4 text-amber-400">2. Добавить главу</h2>
          <select onChange={e => setSelectedBook(e.target.value)} className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 text-white" required>
            <option value="">-- Выберите роман --</option>
            {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
          </select>
          <div className="flex gap-4">
            <input type="number" placeholder="Глава №" value={chapterNumber} onChange={e => setChapterNumber(Number(e.target.value))} className="w-1/3 p-3 bg-neutral-900 rounded border border-neutral-700 text-white" required />
            <input type="text" placeholder="Название главы" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} className="w-2/3 p-3 bg-neutral-900 rounded border border-neutral-700 text-white" required />
          </div>
          <textarea placeholder="Вставьте сюда текст главы..." value={chapterContent} onChange={e => setChapterContent(e.target.value)} className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 text-white h-48" required></textarea>
          <button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded font-bold hover:bg-emerald-500 w-full">Опубликовать главу</button>
        </form>
      </div>
    </div>
  )
}
