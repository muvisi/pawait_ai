const Loader = () => {
  return (
    <div className="w-full rounded-xl h-full flex justify-center items-center py-4 bg-gray-100 dark:bg-gray-900 animate-pulse min-h-screen">
      {/* <svg
        className="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg> */}
      <img
        className="h-[70px] animate-bounce"
        src={'/images/logo2.png'}
        alt="Logo"
      />
    </div>
  );
};
export default Loader;
