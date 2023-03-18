import { useState, FormEvent } from "react";
import Button from "./buttons/Button";
import Image from 'next/image'
import DropdownMenu from "@/components/icons/ChevronDown";
import { ArrowPathIcon } from "@/components/icons/ArrowPath";
import { useUser } from '../context/UserContext';
import AuthModal from "./AuthModal";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";

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
    likedBy: string[];
    page_id: any;
}

const Comments: React.FC = () => {
    const { data: comments, error } = useSWR<Comment[]>("/api/user/getComments", fetcher);

    const [selectedBtn, setSelectedBtn] = useState('top');

    const { user } = useUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    //page id for saveComment
    const router = useRouter();
    const { ids } = router.query;

    //filter comments by page id
    const [filterOption, setFilterOption] = useState("All posts");


    //format date to time ago
    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.abs((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${Math.floor(diffInSeconds)}s`;
        }

        const diffInMinutes = diffInSeconds / 60;
        if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)}m`;
        }

        const diffInHours = diffInMinutes / 60;
        if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h`;
        }

        const diffInDays = diffInHours / 24;
        return `${Math.floor(diffInDays)}d`;
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = (e.target as any).comment.value.trim();
        if (!comment) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            author: user?.email,
            content: comment,
            createdAt: new Date(),
            likes: 0,
            likedBy: [],
            page_id: ids,
        };

        try {
            console.log('Submitting comment:', newComment);
            const response = await fetch(`/api/user/saveComment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: newComment }),

            });
            console.log("comment", comment)

            if (!response.ok) {
                throw new Error("Error saving comment");
            }

            mutate("/api/user/getComments");
            e.currentTarget.reset();
        } catch (error) {
            console.error("Error saving comment:", error);
        }
    };

    const handleLike = async (id: string, uid: any) => {
        // If the user is not logged in, show the login modal
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            const response = await fetch(`/api/user/updateLike/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid }),
            });

            if (!response.ok) {
                throw new Error("Error updating like");
            }

            // Refresh comments after updating the like
            mutate("/api/user/getComments");
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/user/handleDelete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error deleting comment");
            }

            mutate("/api/user/getComments");
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="min-h-32 flex flex-col">
            <div className="hover:bg-opacity-10">
                <div className=" min-h-screen">
                    <div className="container mx-auto">
                        <div className="rounded-lg mx-auto">
                            <AuthModal
                                key={`${isLoginModalOpen}-${setIsLoginModalOpen}`}
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
                                <form
                                    onSubmit={handleSubmit}
                                    className="">

                                    <textarea
                                        name="comment"
                                        placeholder="Write your comment here..."
                                        rows={4}
                                        className="w-full border-2 mb-2 rounded-lg p-4 resize-none focus:border-purple-400 border-transparent hover:border-slate-700/50 bg-gray-900 focus:outline-none"
                                    ></textarea>
                                    <div className="flex justify-center">
                                        <Button text="Submit Post" type="submit" className="" />
                                    </div></form>
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
                            <div className="flex justify-between my-2 mx-2 text-teal-300">
                                <div className="flex hover:bg-opacity-10 hover:bg-white/5 rounded">

                                    <DropdownMenu
                                        items={['All posts', 'Page posts']}
                                        onItemSelected={(item: any) => {
                                            console.log('Selected item:', item)
                                            setFilterOption(item);
                                        }
                                        }
                                        iconProps={{ className: 'ml-1 mt-1', strokeWidth: '1.5' }}
                                    />

                                </div>
                                <button className="flex items-center hover:bg-opacity-10 hover:bg-white/5 rounded px-4 py-2"
                                    onClick={() => mutate("/api/user/getComments")}>
                                    <ArrowPathIcon className="w-4 h-4" text="Refresh" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-0">
                            {comments
                                ?.sort((a, b) => {
                                    if (selectedBtn === 'top') {
                                        return b.likes - a.likes;
                                    } else {
                                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                    }
                                })
                                .filter((comment) =>
                                    filterOption === "All posts"
                                        ? true
                                        : comment.page_id === ids
                                )
                                .map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="p-4 border-b border-slate-600 flex hover:bg-white/5"
                                    >
                                        <Image
                                            src="/logo.png"
                                            alt="User avatar"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div className="">
                                            <div className="flex text-xs w-full">
                                                <span className="text-xs">
                                                    {comment.author}
                                                </span>
                                                <span className="ml-4">
                                                    {formatTimeAgo(new Date(comment.createdAt))} ago
                                                </span>
                                            </div>

                                            <p className="mt-2 text-lg">{comment.content}</p>
                                            <button
                                                onClick={() => handleLike(comment.id, user?.email)}
                                                className="hover:text-purple-400 mt-4"
                                            >
                                                Like ({comment.likes})
                                            </button>

                                            {comment.author === user?.email && (
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
