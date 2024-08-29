"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Profile () {

    const {data: session} = useSession();
    const params = useParams();

    const user = useQuery({
        queryKey: ['user', params.userId],
        queryFn: () => api.getUser(params.userId as string)
    });

    if (user.isError) {
        return redirect('/app')
    }

    return (
        <>
            {user.isLoading ? <p>Loading...</p> : null}
            {user.isSuccess ? (
                <div className="flex justify-between p-6 border-b-2 border-gray-500">
                   <div className="flex items-center gap-4">
                       <img src={user.data.image} className="w-24 rounded-full" />
                       <div className="flex flex-col gap-2">
                          <h2 className="text-xl font-semibold">{user.data.name}</h2>
                          <h4>{user.data.email}</h4>
                       </div>
                   </div>
                   <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="text-center">
                            <h3>100</h3>
                            <h4 className="font-semibold">Followers</h4>
                        </div>
                        <div className="text-center">
                            <h3>37</h3>
                            <h4 className="font-semibold">Following</h4>                            </div>
                        </div>
                   </div>
                   {user.data.email !== session?.user?.email ? (
                      <button className="bg-blue-400 p-1 text-white rounded-xl hover:bg-blue-500">Edit Profile</button>  
                    ) : (
                        <button className="bg-blue-400 p-1 text-white rounded-xl hover:bg-blue-500">Follow</button>  
                    )} 
                </div>
            ) : null}
        </>
    );
}