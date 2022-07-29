#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 14 20:03:41 2022

@author: akseluhr
"""

from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
import time
from fuzzywuzzy import fuzz
import json
from scipy import sparse
import pickle


######################################

# Model

######################################

class PreProcess:
    """
    Data preprocessing
    
    """
    def _init_(self, pathname):
        self.pathname = pathname
        
            # Read csv file
    def read_csv(self, path, includeDates=False):
        
        if includeDates:
            data = pd.read_csv(path) 
                              #parse_dates=['timestamp'])
        else:
            data = pd.read_csv(path)
        return data
    
    def read_data(self):
        movie_data = self.read_csv('/Users/akseluhr/Documents/GitHub/filmy-priv/data/movies.csv')
        links_data = self.read_csv('/Users/akseluhr/Documents/GitHub/filmy-priv/data/links.csv')
        mat_movie_features = sparse.load_npz('/Users/akseluhr/Documents/GitHub/Filmy-priv/prepared_movies.npz')
        hashmap = pickle.load(open('/Users/akseluhr/Documents/GitHub/Filmy-priv/hashmap.p', 'rb'))
        return mat_movie_features, hashmap, movie_data, links_data
    
    
class KnnRecommender:
    """
    This is an item-based collaborative filtering recommender with
    KNN implmented by sklearn
    """
    def __init__(self, data, hashmap, movie_data, links_data):
        self.data = data
        self.hashmap = hashmap
        self.movie_data = movie_data
        self.links_data = links_data
        self.movie_rating_thres = 0
        self.user_rating_thres = 0
        self.model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)

      
    def _fuzzy_matching(self, hashmap, fav_movie):
        """
        return the closest match via fuzzy ratio.
        If no match found, return None
        Parameters
        ----------
        hashmap: dict, map movie title name to index of the movie in data
        fav_movie: str, name of user input movie
        Return
        ------
        index of the closest match
        """
        match_tuple = {}
        # get match
        for title, idx in hashmap.items():
            ratio = fuzz.ratio(title.lower(), fav_movie.lower())
            if ratio >= 75:
                match_tuple.append((title, idx, ratio))
        # sort
        match_tuple = sorted(match_tuple, key=lambda x: x[2])[::-1]
        if not match_tuple:
            print('Oops! No match is found')
        else:
            print('Found possible matches in our database: '
                  '{0}\n'.format([x[0] for x in match_tuple]))
            
            return match_tuple[0][1], match_tuple
    
        
    def _inference(self, model, data, hashmap,
                   fav_movie, n_recommendations):
        """
        return top n similar movie recommendations based on user's input movie
        Parameters
        ----------
        model: sklearn model, knn model
        data: movie-user matrix
        hashmap: dict, map movie title name to index of the movie in data
        fav_movie: str, name of user input movie
        n_recommendations: int, top n recommendations
        Return
        ------
        list of top n similar movie recommendations
        """
        # fit
        model.fit(data)
        # get input movie index
        print('You have input movie:', fav_movie)
        idx, all_similar_titles = self._fuzzy_matching(hashmap, fav_movie)
        # inference
        print('Recommendation system start to make inference')
        print('......\n')
        t0 = time.time()
        distances, indices = model.kneighbors(
            data[idx],
            n_neighbors=n_recommendations+1)
        # get list of raw idx of recommendations
        raw_recommends = \
            sorted(
                list(
                    zip(
                        indices.squeeze().tolist(),
                        distances.squeeze().tolist()
                    )
                ),
                key=lambda x: x[1]
            )[:0:-1]
        print('It took my system {:.2f}s to make inference \n\
              '.format(time.time() - t0))
        # return recommendation (movieId, distance)
        return raw_recommends, all_similar_titles

        
    def make_recommendations(self, fav_movie, n_recommendations):
        """
        make top n movie recommendations
        Parameters
        ----------
        fav_movie: str, name of user input movie
        n_recommendations: int, top n recommendations
        """
        recommended_titles = []

        # get data
       # movie_user_mat_sparse, hashmap = self._prep_data()
        # get recommendations
        raw_recommends, all_similar_titles = self._inference(
            self.model, self.data, self.hashmap,
            fav_movie, n_recommendations)
        # print results
        reverse_hashmap = {v: k for k, v in self.hashmap.items()}
        print('Recommendations for {}:'.format(fav_movie))
        # Lookup recommended ID:s to movie titles 
        
        for i, (idx, dist) in enumerate(raw_recommends):
            

            
            
            recommended_titles.append(reverse_hashmap[idx])


        return recommended_titles, all_similar_titles
    
    def look_up_imdb_IDs(self, recommendations):
        imdb_IDs = []
        movie_data_copy = self.movie_data.copy()
        for i in range(len(recommendations)):
            
            movie = movie_data_copy.loc[movie_data_copy['title'] == recommendations[i]]
            movie_imdb = self.links_data.loc[self.links_data['movieId'] == movie['movieId'].iloc[0], 'imdbId'].iloc[0]
            movie_imdb = int(movie_imdb)
            imdb_IDs.append(movie_imdb)

        return imdb_IDs
    
    def convert(imdbId):
        if isinstance(imdbId, np.nt64): return int(imdbId)  
        raise TypeError


######################################

# API

######################################
best_friends = {'Monica':'Rachel','Joey':'Chandler','Ross':'Phoebe'}

app = Flask(__name__)

@app.route("/")
def hello_from_root():
    #Test through terminal by running: curl http://0.0.0.0:80
    return jsonify(message='Hello from root!')

# Lyssnar på POST i url:et /recms!
@app.route("/recms", methods=['POST'])
def make_recommendation():
    
    # Användarens sökning: {'movie_title': 'Heat (1995)'}
    print(request.json)
    data = request.json
    
    # Hämtar value för "movie_title" (i detta fall Heat (1995)
    movie = data["movie_title"]
    #curl -X POST http://0.0.0.0:8085/recms -H 'Content-Type: application/json' -d '{"movie_title":"Iron Man (2008)"}'

    if request.method == "POST":
        
        try:
            # Prepare data
            pre = PreProcess()
            mat_movie_features_csv, hashmap, movie_data, links_data = pre.read_data()
 

            # Create model
            recommender = KnnRecommender(mat_movie_features_csv, hashmap, movie_data, links_data)
            # Lägg användarens keywords här
            recommended_titles, similar_titles = recommender.make_recommendations(movie, 20)

            # Lookup här
            recommended_imdb_IDs = recommender.look_up_imdb_IDs(recommended_titles)

            zipped_movie_id = {'similar_titles': similar_titles, 'recommendations': [{'title': title, 'imdbId': imdbId} for title, imdbId in zip(recommended_titles, recommended_imdb_IDs)]}


 
        except:
            recommended_titles = ['Movie not found']
        return json.dumps(
            zipped_movie_id, default=recommender.convert, indent=4

        )
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8085)
            
