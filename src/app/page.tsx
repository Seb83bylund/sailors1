"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Home() {

  const { data: session } = useSession();

  if (session) {
    return redirect('/app');
  }

  return (
   <div className="flex justify-center mt-16">
      <div className="flex flex-col gap-4 text-center">
           <div className="flex justify-center"> 
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" className="w-12 h-12"/>
           </div>
           <h1 className="text-2xl font-semibold">Happening now</h1>
           <h2 className="text-xl">Join today</h2>
           <button className="bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500" onClick={() => signIn('github')}>Sign in with Github</button>
           <p className="text-sm">Don't have a Github account yet? Sign up <a href="https://github.com" className="underline" target="_blank">here</a>.</p>
      </div>
   
   </div>
  );
}
