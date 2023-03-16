import { useState, FormEvent } from "react";
import { formatDistanceToNow } from "date-fns";
import Button from "./Button";
import Image from 'next/image'
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { ArrowPathIcon } from "@/components/icons/ArrowPath";
import { useUser } from '../context/UserContext';
import AuthModal from "./AuthModal";


interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: Date;
    likes: number;
}

const Comments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedBtn, setSelectedBtn] = useState('top');

    const { user } = useUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = (e.target as any).comment.value.trim();
        if (!comment) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            author: "User", // Replace with the actual user's name or ID when you implement authentication
            content: comment,
            createdAt: new Date(),
            likes: 0,
        };

        setComments([newComment, ...comments]);
        e.currentTarget.reset();
    };

    const handleLike = (id: string) => {
        setComments(
            comments.map((comment) =>
                comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
            )
        );
    };

    const handleDelete = (id: string) => {
        setComments(comments.filter((comment) => comment.id !== id));
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
                                onLoginButtonClick={() => setIsLoginModalOpen(true)} />

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
                            {comments.map((comment) => (
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
                                                    {formatDistanceToNow(comment.createdAt)} ago
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
