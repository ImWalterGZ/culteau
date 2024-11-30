const NavbarMinimal = () => {
  return (
    <nav className="bg-[#d7ede0] px-4 py-3 flex items-center justify-between">
      {/* Back Button */}
      <button className="w-12 h-12 bg-[#1b5e2f] rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Logo/Title */}
      <h1 className="text-[#1b5e2f] text-2xl font-medium">Culteau</h1>

      {/* Profile Button */}
      <button className="w-12 h-12 bg-[#1b5e2f] rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </nav>
  );
};

export default NavbarMinimal;
