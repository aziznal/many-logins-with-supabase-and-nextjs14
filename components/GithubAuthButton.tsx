"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

import { GithubIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function GithubAuthButton() {
  const supabase = createClient();

  const loginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      alert("Something went wrong" + error.message);
    }

    redirect("/");
  };

  return (
    <Button
      type="button"
      onClick={() => {
        loginWithGithub();
      }}
    >
      <GithubIcon />
      Github
    </Button>
  );
}
