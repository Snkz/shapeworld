#!shapeworld/bin/python
from flask import Flask
from flask import request
from flask import Response
from shapegen.shapeToGeojson import *
from shapegen.geojsonToShape import *

import os
import uuid 
import json

import logging
from logging.handlers import RotatingFileHandler as rfh

app = Flask(__name__, static_folder='')

root = ""

@app.route('/')
def index():
    return app.send_static_file('index.html')


#@app.route('/download.geojson', methods=['POST'])
def download():
    features = request.get_json(force=True);
    raster = request.args.get('raster');
    shp_file = "output/%s.out.%s." %(raster, str(uuid.uuid4()))
    path = root + shp_file
    if geojsonToShape(features, path, raster) == 0:
        return shp_file
    else:
        return "Could not produce shapefile"

@app.route('/shptogeo.json', methods=['POST'])
def upload():

    # Guranteed to be valid (at least) one element lists
    shp = request.files.getlist("shp")
    dbf = request.files.getlist("dbf")


    # May or may not have been submitted
    shx = request.files.getlist("shx")
    prj = request.files.getlist("prj")

    shp = shp[0] if (shp and len(shp) == 1) else None
    dbf = dbf[0] if (dbf and len(dbf) == 1) else None

    shx = shx[0] if (shx and len(shx) == 1) else None
    prj = prj[0] if (prj and len(prj) == 1) else None

    # Check if both files were supplied
    if (not shp or not dbf):
        return Response(json.dumps({'status':400, 
            'message': 'Bad Request, please supply one shp and one dbf file'}),
            status=400, mimetype="application/json");

    geojson = shapefileToGeojson(shp, shx, dbf, prj)

    if (not geojson):
        return Response(json.dumps({'status':400, 
            'message': 'Bad Request, please supply properly formatted files'}),
            status=400, mimetype="application/json");

    return Response(geojson, 
            status=200,
            mimetype="application/json");

@app.route('/<path:path>')
def serve_anything(path):
    print path
    return app.send_static_file(path)

if __name__ == '__main__':
    handler = rfh('shapeworld.log', maxBytes=10000, backupCount=3)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.run(host="0.0.0.0",port=8080, debug=True)
