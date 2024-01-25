import React from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='px-5 py-8 lg:px-12 lg:py-12'>
      <div className='border-2 lg:border-[3px] py-2 px-4 lg:px-8 border-white text-white rounded-md flex justify-between items-center font-bold backdrop-filter backdrop-blur-lg border-opacity-40 text-sm lg:text-base'>
        <span><Link to='/'>Homepage</Link></span>
        <div className='flex items-center gap-4'>
          {user ? (
            <span onClick={handleSignOut} style={{ cursor: 'pointer' }}>
              Sign Out
            </span>
          ) : (
            <>
              <span><Link to='/login'>Login</Link></span>
              <span className='p-1 border-2 border-white rounded-md'>
                <Link to='/signup'>Create Account</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
