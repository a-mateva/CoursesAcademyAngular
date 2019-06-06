import RatingInterface from './rating.model';

export default interface CourseInterface {
    id: number;
    title: string;
    description: string;
    rating?: number;
    ratings: RatingInterface[]
}