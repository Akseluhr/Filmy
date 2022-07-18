#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 14 20:03:41 2022

@author: akseluhr
"""

from flask import Flask, jsonify, request
#import kNN.ipynb
import pandas as pd
import numpy as np
from datetime import datetime
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import os
import time
import gc
from fuzzywuzzy import fuzz




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
    def read_data(self, path, includeDates=False):
        
        if includeDates:
            data = pd.read_csv(path) 
                              #parse_dates=['timestamp'])
        else:
            data = pd.read_csv(path)
        return data
    
    def pre_process(self):
        rating_data = self.read_data('/Users/akseluhr/Documents/GitHub/filmy-priv/data/ratings.csv', True)
        movie_data = self.read_data('/Users/akseluhr/Documents/GitHub/filmy-priv/data/movies.csv')
    
        sum_ratings_per_movie = rating_data['movieId'].value_counts()
        ids_to_keep = sum_ratings_per_movie[sum_ratings_per_movie >= 100].index
        rating_data_filtered = rating_data.loc[rating_data['movieId'].isin(ids_to_keep)]
        # pivot ratings into movie features
        df_movie_features = rating_data_filtered.pivot(
            index='movieId',
            columns='userId',
            values='rating'
        ).fillna(0)
    
        # convert dataframe of movie features to scipy sparse matrix
        mat_movie_features = csr_matrix(df_movie_features.values)
                                    
        hashmap = {
            movie: i for i, movie in
            enumerate(list(movie_data.set_index('movieId').loc[df_movie_features.index].title)) # noqa
        }
        
        return mat_movie_features, hashmap
    
    
class KnnRecommender:
    """
    This is an item-based collaborative filtering recommender with
    KNN implmented by sklearn
    """
    def __init__(self, data, hashmap):
        self.data = data
        self.hashmap = hashmap
        self.movie_rating_thres = 0
        self.user_rating_thres = 0
        self.model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
        
    
    def set_model_params(self, n_neighbors, algorithm, metric, n_jobs=None):
        """
        set model params for sklearn.neighbors.NearestNeighbors
        Parameters
        ----------
        n_neighbors: int, optional (default = 5)
        algorithm: {'auto', 'ball_tree', 'kd_tree', 'brute'}, optional
        metric: string or callable, default 'minkowski', or one of
            ['cityblock', 'cosine', 'euclidean', 'l1', 'l2', 'manhattan']
        n_jobs: int or None, optional (default=None)
        """
        if n_jobs and (n_jobs > 1 or n_jobs == -1):
            os.environ['JOBLIB_TEMP_FOLDER'] = '/tmp'
        self.model.set_params(**{
            'n_neighbors': n_neighbors,
            'algorithm': algorithm,
            'metric': metric,
            'n_jobs': n_jobs})
      
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
        match_tuple = []
        # get match
        for title, idx in hashmap.items():
            ratio = fuzz.ratio(title.lower(), fav_movie.lower())
            if ratio >= 60:
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

        # get data
       # movie_user_mat_sparse, hashmap = self._prep_data()
        # get recommendations
        raw_recommends, all_similar_titles = self._inference(
            self.model, self.data, self.hashmap,
            fav_movie, n_recommendations)
        # print results
        reverse_hashmap = {v: k for k, v in self.hashmap.items()}

        print('Recommendations for {}:'.format(fav_movie))
        for i, (idx, dist) in enumerate(raw_recommends):
            print('{0}: {1}, with distance '
                  'of {2}'.format(i+1, reverse_hashmap[idx], dist))


######################################

# API

######################################
best_friends = {'Monica':'Rachel','Joey':'Chandler','Ross':'Phoebe'}

app = Flask(__name__)

@app.route("/")
def hello_from_root():
    #Test through terminal by running: curl http://0.0.0.0:80
    return jsonify(message='Hello from root!')


@app.route("/find_friend", methods=['POST','GET'])
def get_best_friend():
    print(request.json)
    data = request.json
    person = data["person"]
    #curl -X POST http://0.0.0.0:80/find_friend -H 'Content-Type: application/json' -d '{"person":"Joey"}'
    return {"best_friend":best_friends[person]}


if __name__ == "__main__":

    # Prepare data
    pre = PreProcess()
    mat_movie_features, hashmap = pre.pre_process()
    
    # Create model
    recommender = KnnRecommender(mat_movie_features, hashmap)
    recommender.set_model_params(20, 'brute', 'cosine', -1)

    recommender.make_recommendations('Iron Man', 10)
   # app.run(host='0.0.0.0', port=8085)