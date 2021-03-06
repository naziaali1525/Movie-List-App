import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import { paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    };

    componentDidMount() {
        this.setState({ movies: getMovies(), genres: getGenres() });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);   
        this.setState({ movies });
    };

    handleLike = () => {
    console.log('Like clicked');
    };

    handlePageChange = page => {
        this.setState({currentPage : page });
    };

    handleGenreSelect = genre => {
       this.setState({ selectedGenre: genre });
    };

    render() { 

        const { length: count } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            selectedGenre, 
            movies: allMovies 
           } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;
        
        const movies = paginate(allMovies, currentPage, pageSize);
        const filtered = selectedGenre 
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                    items={this.state.genres}   
                    selectedItem={this.state.selectedGenre}      
                    onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database.</p>
            <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                { movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like liked={movie.liked} onClick={this.handleLike} />
                        </td>
                        <td>
                            <button onClick={ () => this.handleDelete(movie)} className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                ))}
               
            </tbody>
        </table>
            <pagination
              itemCount = {filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
              
            />

            </div>

            
        </div>
        );
    }
}
 
export default Movies;