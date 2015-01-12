ShapeWORLD
=========

A website for converting and editing shapefiles to geojson

### API
You can post the service to convert shapefile into geojson

#### Minimal
curl -is -F shp=@newcounts.shp -F dbf=@newcounts.dbf localhost:8080/shptogeo.json
#### Full request
curl -is -F shp=@newcounts.shp -F dbf=@newcounts.dbf -F prj=@newcounts.prj -F shx=@newcounts.shx localhost:8080/shptogeo.json
