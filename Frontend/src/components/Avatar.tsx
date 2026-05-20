export const Avatar = ({name}: {name: string}) => {
    return (
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-slate-600 text-neutral-50 border rounded-full">
            <span className="font-medium text-body">{name[0]}</span>
        </div>
    )
}