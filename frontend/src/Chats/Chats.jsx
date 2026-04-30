import { useMemo, useState } from "react";
import Lists from "../Components/Lists";
import Avatar from "react-avatar";
import { Search, Send, MessageSquare, Circle, Plus } from 'lucide-react';
import Data from '../assets/Data.json';

function Chats() {
    const chatMembers = useMemo(
        () => Data.flatMap((project) =>
            project.TeamMembers.map((member, idx) => ({
                ...member,
                project: project.ProjectTitle,
                chatId: `${project.ProjectTitle}-${member.id}-${idx}`,
                status: member.progress >= 70 ? 'Online' : member.progress >= 45 ? 'Active' : 'Away',
                unread: member.progress < 70 ? 2 : 0,
            }))
        ),
        []
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(chatMembers[0]?.chatId ?? '');
    const [draft, setDraft] = useState('');
    const [unreadCounts, setUnreadCounts] = useState(
        chatMembers.reduce((acc, member) => ({ ...acc, [member.chatId]: member.unread }), {})
    );

    const initialHistory = useMemo(() => {
        const history = {};
        chatMembers.forEach((member) => {
            history[member.chatId] = [
                {
                    id: `${member.chatId}-1`,
                    sender: 'them',
                    text: `Hi ${member.name}, are you ready to review the ${member.activity} update?`,
                    time: '09:12',
                },
                {
                    id: `${member.chatId}-2`,
                    sender: 'me',
                    text: `Yes, I’ll share the latest details for ${member.project} shortly.`,
                    time: '09:15',
                },
            ];
        });
        return history;
    }, [chatMembers]);

    const [chatHistory, setChatHistory] = useState(initialHistory);

    const filteredChats = chatMembers.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.project.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedMember = chatMembers.find((member) => member.chatId === selectedChatId) || chatMembers[0];
    const messages = chatHistory[selectedChatId] || [];

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        setUnreadCounts((prev) => ({ ...prev, [chatId]: 0 }));
    };

    const handleSend = () => {
        if (!draft.trim()) return;
        const message = {
            id: `${selectedChatId}-${Date.now()}`,
            sender: 'me',
            text: draft.trim(),
            time: 'Now',
        };

        setChatHistory((prev) => ({
            ...prev,
            [selectedChatId]: [...prev[selectedChatId], message],
        }));
        setDraft('');
    };

    return (
        <>
            <Lists />
            <main className="min-h-screen bg-slate-50 pt-28 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-600">Team chats</p>
                                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Collaborate with your team instantly</h1>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Search conversations, send quick updates, and keep every chat aligned with your project work.</p>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-700">
                                <Plus size={16} />
                                New conversation
                            </button>
                        </div>
                    </section>

                    <div className="mt-8 grid gap-6 xl:grid-cols-[320px_1.7fr_320px]">
                        <aside className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Chats</h2>
                                    <p className="text-sm text-slate-500">{filteredChats.length} active conversations</p>
                                </div>
                                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Live</div>
                            </div>
                            <div className="relative mb-5">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search chats"
                                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none shadow-sm transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                />
                            </div>
                            <div className="space-y-3 overflow-y-auto pr-1 max-h-[52vh]">
                                {filteredChats.map((member) => (
                                    <button
                                        key={member.chatId}
                                        type="button"
                                        onClick={() => handleSelectChat(member.chatId)}
                                        className={`flex w-full items-start gap-4 rounded-[1.75rem] p-4 text-left transition ${selectedChatId === member.chatId ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'hover:bg-slate-50'}`}
                                    >
                                        <div className="relative">
                                            <Avatar name={member.name} size="44" round={true} />
                                            <span className={`absolute right-0 top-0 h-3.5 w-3.5 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'Active' ? 'bg-amber-400' : 'bg-slate-400'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="block text-sm font-semibold text-slate-900">{member.name}</span>
                                                {unreadCounts[member.chatId] > 0 && (
                                                    <span className="rounded-full bg-cyan-600 px-2 py-0.5 text-[11px] font-semibold text-white">{unreadCounts[member.chatId]}</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">{member.project}</p>
                                            <p className="mt-2 text-sm text-slate-500">{member.activity} update</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center gap-4">
                                    <Avatar name={selectedMember.name} size="52" round={true} />
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900">{selectedMember.name}</h2>
                                        <p className="text-sm text-slate-500">{selectedMember.project} · {selectedMember.activity}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Progress {selectedMember.progress}%</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{selectedMember.tasks} tasks</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{selectedMember.status}</span>
                                </div>
                            </div>

                            <div className="mt-6 h-[520px] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex flex-col gap-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-xl rounded-3xl px-5 py-4 text-sm leading-6 shadow-sm ${message.sender === 'me' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                                <p>{message.text}</p>
                                                <span className={`mt-2 block text-xs ${message.sender === 'me' ? 'text-cyan-100' : 'text-slate-400'}`}>{message.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                                <input
                                    type="text"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    placeholder="Write a message..."
                                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={handleSend}
                                    className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-600 px-4 text-white transition hover:bg-cyan-700"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </section>

                        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Chat insights</h2>
                                    <p className="text-sm text-slate-500">Quick team activity summary</p>
                                </div>
                                <MessageSquare className="text-cyan-600" />
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-3xl bg-cyan-50 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Active project</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">{selectedMember.project}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">Current focus</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedMember.activity}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-50 p-4">
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <span>Pending tasks</span>
                                        <span className="font-semibold text-slate-900">{selectedMember.tasks}</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-slate-200">
                                        <div className="h-full rounded-full bg-cyan-600" style={{ width: `${selectedMember.progress}%` }} />
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                    <h3 className="text-sm font-semibold text-slate-900">Action items</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                        {selectedMember.todo && selectedMember.todo.length > 0 ? (
                                            selectedMember.todo.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <Circle className="mt-1 h-3 w-3 text-cyan-500" />
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-500">No action items yet for this chat.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Chats;