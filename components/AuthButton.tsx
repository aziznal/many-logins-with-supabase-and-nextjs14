"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

import { redirect } from "next/navigation";

export default function AuthButton() {
  const supabase = createClient();

  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const _loadUser = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      let error = userError || sessionError;

      if (error) {
        setError(error.message);
        setUser(undefined);
        setSession(undefined);
        return;
      }

      setError(undefined);

      setUser(userData.user!);
      setSession(sessionData.session!);
    };

    _loadUser();
  }, []);

  const signOut = async () => {
    supabase.auth.signOut();
    redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}! You are logged in with {session?.token_type}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
