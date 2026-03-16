import { FC, FormEvent, useContext } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { ThemeContext } from '../../contexts/ThemeContext';

export const DarkThemeToggle: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (e: FormEvent) => {
    e.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      aria-label="Toggle dark mode"
      data-testid="dark-theme-toggle"
      onClick={toggleTheme}
      type="button"
      className="w-8 h-8 flex justify-center items-center border border-gray-200 dark:border-gray-600 rounded-lg "
      // className={classNames(theme.root.base, className)}
      //   {...props}
    >
      {theme === 'dark' ? (
        <HiSun aria-label="Currently dark mode" className="" />
      ) : (
        <HiMoon aria-label="Currently light mode" className="" />
      )}
    </button>
  );
};
