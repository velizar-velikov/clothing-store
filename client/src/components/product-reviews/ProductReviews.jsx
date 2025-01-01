import { Button, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';

import ProductReviewItem from './product-review-item/ProductReviewItem.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

import { useAGetAllReviewsForProduct } from '../../hooks/custom/useReviews.js';
import { useGetOneProduct } from '../../hooks/custom/useProducts.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import paths from '../../config/paths.js';

export default function ProductReviews() {
    const { productId } = useParams();
    const { userId } = useAuthContext();
    const { product, isLoading: isLoadingProduct } = useGetOneProduct(productId);
    const { reviews, setReviews, isLoading: isLoadingReviews } = useAGetAllReviewsForProduct(productId, userId);

    return (
        <>
            {isLoadingProduct || isLoadingReviews ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-8 col-md-7 col-lg-6 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <div className="d-flex mb-3 gap-5">
                        <Button as={Link} to={paths.details.getHref(productId)} className="col-2 h-50">
                            Back
                        </Button>
                        <h3 className="text-center d-flex flex-wrap justify-content-center align-items-center gap-2">
                            <span>{product.name}</span>
                            <span className="h6 text-secondary">{product.brand}</span>
                            <span className="ms-3">reviews</span>
                        </h3>
                    </div>
                    {reviews.length == 0 ? (
                        <p className="text-center">There are no reviews for this product yet. Be the first to rate it!</p>
                    ) : (
                        <Accordion defaultActiveKey="0">
                            {reviews.map((review, index) => (
                                <ProductReviewItem key={review._id} index={index} setReviews={setReviews} {...review} />
                            ))}
                        </Accordion>
                    )}
                </Container>
            )}
        </>
    );
}
