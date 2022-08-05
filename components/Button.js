export const Button = ({ children, onClick }) => {
    return (
        <button onClick={ onClick } className={`rounded-lg bg-orange-500 text-white px-4 py-2 shadow-lg`}>
            { children }
        </button>
    )
}