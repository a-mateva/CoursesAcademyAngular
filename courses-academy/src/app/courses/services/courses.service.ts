import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, merge } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import CourseInterface from '../models/course.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import RatingInterface from '../models/rating.model';


@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>('http://localhost:3000/courses')
      .pipe(map(courses => {
        courses.forEach(course => {
          let ratingSum = 0;
          for (const rate of course.ratings) {
            ratingSum += rate.rating_value;
          }
          if (ratingSum > 0) {
            course.rating = ratingSum / course.ratings.length;
          }

        });
        return courses;
      }));
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/courses/" + id);
  }

  addNewCourse(course: CourseInterface): Observable<any> {
    if (course.id) {
      return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
    } else {      
      course.ratings = [];
      return this.http.post('http://localhost:3000/courses', course);
    }
  }

  getById(id: number): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`http://localhost:3000/courses/${id}`)
      .pipe(map(course => {
        let ratingSum = 0;
        for (const rate of course.ratings) {
          ratingSum += rate.rating_value;
        }
        if (ratingSum > 0) {
          course.rating = ratingSum / course.ratings.length;
        }

        return course;
      }));
  }

  rateCourse(id: number, userId: number, rating: number): Observable<CourseInterface> {
    const ratedCourse = this.getById(id);
    const ratingObject: RatingInterface = {
      user_id: userId,
      rating_value: rating
    };

    return ratedCourse.pipe(
      map(rc => {

        //връща индекса на обект рейтинг от масива ratings, в който userid да е като подадения параметър
        const positionOfCurrentUserRating = rc.ratings.findIndex(r => r.user_id === userId);
        if (positionOfCurrentUserRating !== -1) {

          if (rc.ratings[positionOfCurrentUserRating].rating_value === rating) {
            return of(rc);
          }

          rc.ratings.splice(positionOfCurrentUserRating, 1);
        }

        rc.ratings.push(ratingObject);

        let ratingsSum = 0;
        for (const item of rc.ratings) {
          ratingsSum += item.rating_value;
        }
        rc.rating = ratingsSum / rc.ratings.length;
        
        return this.addNewCourse(rc);
      })
    ).pipe(mergeAll());
  }
}
