#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 14 20:03:41 2022

@author: akseluhr
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from fuzzywuzzy import fuzz
import os
import json
from scipy import sparse
import pickle


######################################

# Model

######################################

class PreProcess:
    def _init_(self, pathname):
        self.pathname = pathname
    # Läser csv file

    def read_csv(self, path, includeDates=False):
        if includeDates:
            data = pd.read_csv(path)
        else:
            data = pd.read_csv(path)
        return data

    def read_data(self):
        ROOT_DIR = os.path.realpath(os.path.join(os.path.dirname(__file__)))
        movie_data = self.read_csv(ROOT_DIR+'/movies.csv')
        links_data = self.read_csv(ROOT_DIR+'/links.csv')
        mat_movie_features = sparse.load_npz(ROOT_DIR+'/prepared_movies.npz')
        hashmap = pickle.load(open(ROOT_DIR+'/hashmap.p', 'rb'))
        return mat_movie_features, hashmap, movie_data, links_data


class KnnRecommender:
    def __init__(self, data, hashmap, movie_data, links_data):
        self.data = data
        self.hashmap = hashmap
        self.movie_data = movie_data
        self.links_data = links_data
        self.movie_rating_thres = 0
        self.user_rating_thres = 0
        self.model = NearestNeighbors(
            metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)

    def _fuzzy_matching(self, hashmap, fav_movie):
        match_tuple = []
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
        # fit
        model.fit(data)
        idx, all_similar_titles = self._fuzzy_matching(hashmap, fav_movie)
        # inference
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
        return raw_recommends, all_similar_titles

    def make_recommendations(self, fav_movie, n_recommendations):
        recommended_titles = []
        raw_recommends, all_similar_titles = self._inference(
            self.model, self.data, self.hashmap,
            fav_movie, n_recommendations)

        reverse_hashmap = {v: k for k, v in self.hashmap.items()}
        for i, (idx, dist) in enumerate(raw_recommends):
            recommended_titles.append(reverse_hashmap[idx])
        return recommended_titles, all_similar_titles

    def look_up_imdb_IDs(self, recommendations):
        imdb_IDs = []
        movie_data_copy = self.movie_data.copy()
        for i in range(len(recommendations)):
            movie = movie_data_copy.loc[movie_data_copy['title']
                                        == recommendations[i]]
            movie_imdb = self.links_data.loc[self.links_data['movieId']
                                             == movie['movieId'].iloc[0], 'imdbId'].iloc[0]
            movie_imdb = int(movie_imdb)
            imdb_IDs.append(movie_imdb)
        return imdb_IDs

    def convert(imdbId):
        if isinstance(imdbId, np.nt64):
            return int(imdbId)
        raise TypeError


######################################

# API

######################################

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_from_root():
    return jsonify(message='Hello from root!')

# Lyssnar på POST i url:et /recms!


@app.route("/recms", methods=['POST'])
def make_recommendation():

    # Användarens sökning: {'movie_title': 'Heat (1995)'}
    data = request.json

    # Hämtar value för "movie_title" (i detta fall Heat (1995)
    movie = data["movie_title"]

    if request.method == "POST":
        try:
            # Läser in data
            pre = PreProcess()
            mat_movie_features_csv, hashmap, movie_data, links_data = pre.read_data()
            # Skapar model
            recommender = KnnRecommender(
                mat_movie_features_csv, hashmap, movie_data, links_data)
            # Lägg användarens keywords här
            recommended_titles, similar_titles = recommender.make_recommendations(
                movie, 6)
            # Lookup här
            recommended_imdb_IDs = recommender.look_up_imdb_IDs(
                recommended_titles)
            zipped_movie_id = {'similar_titles': similar_titles, 'recommendations': [
                {'title': title, 'imdbId': imdbId} for title, imdbId in zip(recommended_titles, recommended_imdb_IDs)]}
        except:
            recommended_titles = ['Movie not found']
        return json.dumps(
            zipped_movie_id, default=recommender.convert, indent=4
        )


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8085)
