export default function Pagination({page, handlePrev, handleNext}){
    return (
        <>
            <div className="flex py-5 mt-5 items-center justify-center">
                <button onClick={handlePrev} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"><i className="fa-solid fa-arrow-left"></i></button>
                <label className="px-4 text-center w-12">{page}</label>
                <button onClick={handleNext} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </>
    )
}