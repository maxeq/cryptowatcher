import { useState, FormEvent } from "react";
import { formatDistanceToNow } from "date-fns";
import Button from "./Button";
import Image from 'next/image'
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { ArrowPathIcon } from "@/components/icons/ArrowPath";
import { useUser } from '../context/UserContext';
import AuthModal from "./AuthModal";
import useSWR, { mutate } from "swr";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching data");
    }
    return response.json();
};

interface Comment {
    id: string;
    author: any;
    content: string;
    createdAt: Date;
    likes: number;
}

const Comments: React.FC = () => {
    const { data: comments, error } = useSWR<Comment[]>("/api/getComments", fetcher);

    const [selectedBtn, setSelectedBtn] = useState('top');

    const { user } = useUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = (e.target as any).comment.value.trim();
        if (!comment) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            author: user?.email, // Replace with the actual user's ID when you implement authentication
            content: comment,
            createdAt: new Date(),
            likes: 0,
        };

        try {
            const response = await fetch("/api/saveComment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                throw new Error("Error saving comment");
            }

            mutate("/api/getComments");
            e.currentTarget.reset();
        } catch (error) {
            console.error("Error saving comment:", error);
        }
    };

    const handleLike = async (id: string) => {
        try {
            const response = await fetch(`/api/updateLike/${id}`, {
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error("Error updating like");
            }

            // Refresh comments after updating the like
            mutate("/api/getComments");
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/deleteComment/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error deleting comment");
            }

            mutate("/api/getComments");
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="min-h-32 flex flex-col">
            <div className="hover:bg-opacity-10">
                <div className=" min-h-screen">
                    <div className="container mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-lg mx-auto">

                            <AuthModal
                                isOpen={isLoginModalOpen}
                                onClose={() => setIsLoginModalOpen(false)}
                                mode="login"
                            />

                            {!user ? (
                                <div className="bg-gray-900 p-16">
                                    <div className="mx-8 flex justify-center">
                                        <Button text="Login to discuss" onClick={() => setIsLoginModalOpen(true)} />
                                    </div>
                                </div>

                            ) : (
                                <>
                                    <textarea
                                        name="comment"
                                        placeholder="Write your comment here..."
                                        rows={4}
                                        className="w-full border-2 mb-2 rounded-lg p-4 resize-none focus:border-purple-400 border-transparent hover:border-slate-700/50 bg-gray-900 focus:outline-none"
                                    ></textarea>
                                    <div className="flex justify-center">
                                        <Button text="Submit Post" type="submit" className="" />
                                    </div>
                                </>
                            )}


                            <div className="mx-4 mt-4">
                                <div className="border md:rounded-lg border-slate-700/50 text-slate-600">
                                    <div className="flex justify-evenly m-2">
                                        <button
                                            type="button"
                                            className={`border ${selectedBtn === 'top' ? 'text-white border-transparent bg-slate-600 rounded-md px-14 flex items-center ' : 'hover:text-slate-100 px-14 flex items-center border-transparent transition duration-300 ease-in-out'}`}
                                            onClick={() => setSelectedBtn('top')}>
                                            Top
                                        </button>
                                        <button
                                            type="button"
                                            className={`border ${selectedBtn === 'latest' ? 'text-white border-transparent bg-slate-600 rounded-md px-14 flex items-center' : 'hover:text-slate-100 px-14 flex items-center border-transparent transition duration-300 ease-in-out'}`}
                                            onClick={() => setSelectedBtn('latest')}>
                                            Latest
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between my-4 mx-4 text-teal-300">
                                <div className="flex hover:bg-opacity-10 hover:bg-white/5 rounded px-2">
                                    <span className="mr-1">All posts</span>
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                                <div className="flex items-center ml-4 hover:bg-opacity-10 hover:bg-white/5 rounded px-2">
                                    <ArrowPathIcon className="w-4 h-4" />
                                    <span className="ml-1">Refresh</span>
                                </div>
                            </div>
                        </form>
                        
                        <div className="space-y-0">
                            {comments?.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="p-4 border-b border-slate-600 flex hover:bg-white/5"
                                >
                                    <Image
                                        src="/logo.png" // Replace with the actual user's avatar URL
                                        alt="User avatar"
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                    <div className="">
                                        <div className="flex text-xs">
                                            <div>
                                                <span className="text-sm">{comment.author}</span>
                                                <span className="ml-4">
                                                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-lg">{comment.content}</p>
                                        <button
                                            onClick={() => handleLike(comment.id)}
                                            className="hover:text-purple-400 mt-4"
                                        >
                                            Like ({comment.likes})
                                        </button>

                                        {comment.author === "User" && ( // Replace with an actual user ID check when you implement authentication
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="hover:text-red-600 ml-2"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Comments;
