'use client';

import { useEffect } from 'react';

import { useUser } from '@/src/providers/UserContext';

type ProfileModalProps = {
  onClose?: () => void;
};

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { user, logoutUser } = useUser();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-navbar w-full max-w-sm rounded-2xl p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">Profile</h2>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-md p-2 font-normal text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>

            <p className="font-light">{user?.user_email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Username</p>

            <p className="font-light">{user?.user_name}</p>
          </div>

          {/* <button className="cursor-pointer rounded-md border border-gray-200 bg-gray-100 px-8 py-2 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          </button> */}
        </div>

        <button
          onClick={async () => {
            await logoutUser();
            onClose?.();
          }}
          className="mt-6 w-full cursor-pointer rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
