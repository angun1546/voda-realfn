function GenreTab({ tabs, active, onChange }) {
  return (
    <div className="w-full backdrop-blur-[20px] bg-[rgba(24,24,27,0.8)] py-9">
      <div className="flex flex-wrap justify-center gap-4 max-w-[1920px] mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`h-16 rounded-full font-serif text-2xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              active === tab.id
                ? 'bg-primary-400 text-[#2e1065] px-9 py-3.5'
                : 'bg-zinc-800 border-2 border-zinc-600 text-zinc-400 px-[38px] py-[14px]'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenreTab
