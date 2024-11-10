
export default function EntityBox({ image, name, surname }) {
    return (
        <div className="card card-side bg-base-100 shadow-xl m-4 items-center">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h5 className="card-title">{surname}</h5>
            </div>
            <figure className="h-14  p-1 flex-shrink-0">
                <img
                    className="h-full w-full object-cover rounded-lg"
                    src={image}
                    alt="League"
                />
            </figure>
        </div>

    );
}