import { UserRound } from "lucide-react";
type AvatarProps = {
    name?: string;
}

export const Avatar = ({ name }: AvatarProps) => {
    const initial = name?.trim()?.charAt(0)?.toUpperCase();

    return (
        <div
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden bg-slate-100 text-slate-700 ring-1 ring-slate-200 shadow-sm"
            style={{ borderRadius: '9999px' }}
        >
            {initial ? (
                <span className="text-sm font-semibold leading-none">{initial}</span>
            ) : (
                <UserRound className="text-slate-700" size={18} />
            )}
        </div>
    )
}