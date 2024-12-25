export default function RatingStars({ averageRating }) {
    return (
        <div className="stars">
            {new Array(Math.round(averageRating)).fill('star').map((star, i) => (
                <i key={i} className="fa fa-star text-warning"></i>
            ))}
            {new Array(5 - Math.round(averageRating)).fill('star').map((star, i) => (
                <i key={i + 5} className="fa-regular fa-star"></i>
            ))}
        </div>
    );
}