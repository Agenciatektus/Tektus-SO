import { useState, useRef } from "react";
import { Moon, Sun, Bell, ChevronDown, User, Settings, LifeBuoy, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const LANGUAGES = [
  { code: "en", label: "English", icon: <span className="text-[16px] mr-2">🇺🇸</span> },
  { code: "pt", label: "Português", icon: <span className="text-[16px] mr-2">🇧🇷</span> },
];

const MOCK_RESULTS = [
  "Tarefa: Configurar envio automático",
  "Cliente: DGA Acadêmico",
  "Usuário: Peterson De Lima",
  "Projeto: Portal da China",
];

export function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Alterna o tema adicionando/removendo a classe 'dark' no html
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  // Fecha menus ao clicar fora
  function handleClickOutside(e: MouseEvent) {
    if (
      !(
        (e.target as HTMLElement).closest("#user-menu") ||
        (e.target as HTMLElement).closest("#avatar-btn")
      )
    ) {
      setShowUserMenu(false);
    }
    if (!((e.target as HTMLElement).closest("#lang-menu") || (e.target as HTMLElement).closest("#lang-btn"))) {
      setShowLangMenu(false);
    }
    if (!((e.target as HTMLElement).closest("#search-dropdown") || (e.target as HTMLElement).closest("#search-input"))) {
      setShowSearchResults(false);
    }
  }
  // Adiciona/remover listener global
  if (typeof window !== "undefined") {
    window.onclick = handleClickOutside;
  }

  return (
    <header className="w-full h-[56px] flex items-center px-4 relative z-20 font-lato text-[14px] bg-white border-b border-[#D9D9D9] dark:bg-[#161817] dark:border-[#0D100F]">
      {/* Campo de busca */}
      <div className="flex-1 flex items-center relative">
        <div className="flex items-center w-full max-w-xl rounded px-3 py-2 border-none bg-white dark:bg-[#161817]">
          <svg className="w-5 h-5 text-[#D9D9D9] dark:text-[#D9D9D9] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
          <input
            id="search-input"
            ref={searchRef}
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-[#161817] dark:text-white placeholder:text-[#D9D9D9] dark:placeholder:text-[#D9D9D9] w-full font-lato text-[14px]"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowSearchResults(e.target.value.length > 0);
            }}
            onFocus={() => setShowSearchResults(search.length > 0)}
            autoComplete="off"
          />
          {/* Dropdown de resultados de busca */}
          {showSearchResults && (
            <div id="search-dropdown" className="absolute left-0 top-12 w-full rounded shadow-lg border border-[#D9D9D9] dark:border-[#0D100F] bg-white dark:bg-[#161817] z-30">
              {MOCK_RESULTS.filter(r => r.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <div className="px-4 py-2 text-[#D9D9D9] text-sm">Nenhum resultado</div>
              ) : (
                MOCK_RESULTS.filter(r => r.toLowerCase().includes(search.toLowerCase())).map((r, i) => (
                  <div key={i} className="px-4 py-2 text-[#161817] dark:text-white text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] cursor-pointer" onClick={() => { setSearch(r); setShowSearchResults(false); }}>{r}</div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {/* Ícones à direita */}
      <div className="flex items-center gap-6 ml-4">
        {/* Bandeira idioma */}
        <div className="relative">
          <button id="lang-btn" onClick={() => setShowLangMenu(v => !v)} className="flex items-center focus:outline-none">
            {lang === "en" ? <span className="text-[16px]">🇺🇸</span> : <span className="text-[16px]">🇧🇷</span>}
            <ChevronDown className="w-4 h-4 text-[#161817] dark:text-white ml-1" />
          </button>
          {showLangMenu && (
            <div id="lang-menu" className="absolute right-0 mt-2 w-40 rounded shadow-lg border border-[#D9D9D9] dark:border-[#0D100F] bg-white dark:bg-[#161817] z-30">
              {LANGUAGES.map(l => (
                <div key={l.code} className={`flex items-center px-4 py-2 text-[#161817] dark:text-white text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] cursor-pointer ${lang === l.code ? 'font-bold' : ''}`} onClick={() => { setLang(l.code); setShowLangMenu(false); }}>
                  {l.icon} {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Notificações */}
        <div className="relative">
          <Bell className="w-6 h-6 text-[#161817] dark:text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-[#00DD4B] text-xs text-white rounded-full px-1.5">3</span>
        </div>
        {/* Alternador de tema */}
        <button onClick={toggleTheme} className="focus:outline-none">
          {darkMode ? (
            <Moon className="w-6 h-6 text-[#161817] dark:text-white" />
          ) : (
            <Sun className="w-6 h-6 text-[#00DD4B]" />
          )}
        </button>
        {/* Avatar usuário */}
        <div className="relative">
          <button id="avatar-btn" onClick={() => setShowUserMenu(v => !v)} className="focus:outline-none">
            <Avatar className="w-8 h-8 border-2 border-[#D9D9D9] dark:border-[#0D100F]">
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
            </Avatar>
          </button>
          {showUserMenu && (
            <div id="user-menu" className="absolute right-0 mt-2 w-56 rounded shadow-lg border border-[#D9D9D9] dark:border-[#0D100F] bg-white dark:bg-[#161817] z-30 py-2">
              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-2 px-4 py-2 text-[#161817] dark:text-white text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] w-full text-left"><User className="w-5 h-5" /> Minha conta</button>
                <button className="flex items-center gap-2 px-4 py-2 text-[#161817] dark:text-white text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] w-full text-left"><Settings className="w-5 h-5" /> Configurações</button>
                <button className="flex items-center gap-2 px-4 py-2 text-[#161817] dark:text-white text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] w-full text-left"><LifeBuoy className="w-5 h-5" /> Suporte</button>
                <div className="border-t border-[#D9D9D9] dark:border-[#0D100F] my-1" />
                <button className="flex items-center gap-2 px-4 py-2 text-red-400 text-sm hover:bg-[#D9D9D9] dark:hover:bg-[#222] w-full text-left"><LogOut className="w-5 h-5" /> Sair</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
