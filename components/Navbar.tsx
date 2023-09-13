import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-end py-10 border-b-2 border-red-800">
        <li className="mx-1">
          <Link legacyBehavior href="/">
            <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl ">Home</a>
          </Link>
        </li>
        <li className="mx-1">
          <Link legacyBehavior href="/members">
            <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Members</a>
          </Link>
        </li>
        <li className="mx-1">
          <Link legacyBehavior href="/rush">
            <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Rush</a>
          </Link>
        </li>
        <li className='mx-1'>
          <Link legacyBehavior href="/brothers">
            <a className="text-black hover:text-gray-400 transition-colors duration-300 px-4 py-2 rounded-md font-bold text-xl">Brothers</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
