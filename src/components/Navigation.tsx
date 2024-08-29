"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function Navigation () {

    const user = useQuery({
        queryKey: ['user'],
        queryFn: api.getCurrentUser
    });

    return (
        <nav className="p-4 flex flex-col gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" className="w-12 h-12"/>
            <Link href="#" className="text-xl font-semibold hover:underline">Home</Link>
            <Link href={user.isSuccess ? "/app/profile/" + user.data.id : "/app"} className="text-xl font-semibold hover:underline">Profile</Link>
            <Link href="#" className="text-xl font-semibold hover:underline">Notifications</Link>
            <button onClick={() => signOut()} className="text-xl font-semibold text-left hover:underline">Sign Out</button>
            <Link href="/app" className="bg-blue-400 p-2 text-white rounded-xl text-center hover:bg-blue-500 hover:underline">Tweet</Link>
        </nav>
    );
}