export const MarkButton = ({ children, onClick, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={`hover:bg-gray-300 font-bold py-2 px-4 rounded transition ${
                isActive ? 'text-gray-700 bg-gray-300' : 'text-gray-500'
            }`}
        >
            {children}
        </button>
    )
}
