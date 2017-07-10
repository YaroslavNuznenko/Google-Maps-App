function Marker(options){
    var marker = new google.maps.Marker(options);

    var id=options.id;

    this.render = function(map){
        marker.setMap(map);
    };
    this.getId=function () {
        return id;
    };
    this.setId=function (_id) {
        id=_id;
    };

    this.getGoogleMarker=function () {
        return marker;
    };

    this.getPosition=function () {
        var position=marker.getPosition();
        return JSON.stringify(position);
    }

}