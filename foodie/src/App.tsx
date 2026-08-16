function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Foodie app
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Delicious meals, delivered fast.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Tailwind is now configured and ready to style your React app with utility-first classes.
            </p>
          </div>

          <div className="grid w-full max-w-md gap-4">
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Today</p>
              <p className="mt-3 text-3xl font-bold">$24.90</p>
              <p className="mt-1 text-sm text-slate-300">Free delivery over $20</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600">
                Order now
              </button>
              <button className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                View menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
