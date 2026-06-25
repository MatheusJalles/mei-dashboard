export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold">MEI Dashboard</h1>
          <p className="text-gray-400 text-sm">Controle financeiro do microempreendedor</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
          <span className="text-blue-400 text-lg">👤</span>
        </div>
      </div>
    </header>
  )
}