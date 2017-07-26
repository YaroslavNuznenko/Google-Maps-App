function Map(options){
    this._map;
    /**
     * @type {Array}
     */
    this._markers = [];
    this.localKey = 'map';
    var self=this;
    this.init = function(){
        this._map = new google.maps.Map(document.getElementById(options.elemId), {
            center: options.map.center,
            zoom: options.map.zoom
        });

        if(options.mapKey !== undefined){
            self.localKey = options.mapKey;
        }

        this._markers = loadMarkers();
        this.renderMarkers();
    };
    /**
     *
     * @returns {Marker[]}
     */
    function loadMarkers(){
        var data = localStorage.getItem(self.localKey);
        if(data){
            data = JSON.parse(data);
            var arr = [];
            data.forEach(function(mData){
                arr.push(new Marker(mData));
            });

            return arr;
        }

        return [];

    }

    this.renderMarkers = function(){
        var self = this;
        this._markers.forEach(function(marker){
            marker.render(self._map);
        })
    }



}

function AdminMap(options){
    Map.call(this, options);
    var self=this;
    this.form=null;
    var selectedMarker;
    var parentInt=this.init;

    this.init=function () {
        parentInt.call(this);
        this.form=new MapForm(this,options.formId);
    }
    this.saveMarker=function (marker) {
        if(marker.getId()){
            //edit marker
            for(var i=0;i<this._markers.length;i++){
                if(marker.getId()==this._markers[i].getId())
                {
                    this._markers[i]=marker;
                }
            }
        }
        else{
            //new marker
            marker.setId(Date.now());
            this._markers.push(marker);
        }
        this.saveMarkersToLocalStorage();
    };
    this.removeMarker=function () {
        console.log(this._markers);
        for(var i=0;i<this._markers.length;i++){
            if(selectedMarker.id==this._markers[i].getId())
            {   this._markers[i].getGoogleMarker().setMap(null);
                this._markers.splice(i,1);
                this.saveMarkersToLocalStorage();
                return false;
            }
        }
    };
    this.getEditMarker=function() {
        console.log(this._markers);
        console.log(selectedMarker);
            for(var i=0;i<this._markers.length;i++){
                if(selectedMarker.id==this._markers[i].getId())
                {
                    this.saveMarkersToLocalStorage();
                    return this._markers[i];
                }
            }
    };
    var parentRenderMarkets=this.renderMarkers;
    this.renderMarkers=function () {

        parentRenderMarkets.call(this);
        this._markers.forEach(function (marker) {
           marker.getGoogleMarker().addListener('click',function () {
               selectedMarker=this;

           });
        });
    };

    this.getSelectedMarker=function () {
        return selectedMarker;
    }

    this.saveMarkersToLocalStorage=function () {
        var arr=[];

        this._markers.forEach(function (marker)  {
            arr.push({
                position:marker.getGoogleMarker().getPosition(),
                title:marker.getGoogleMarker().getTitle(),
                id:marker.getId()
            })
        })
        localStorage.setItem(self.localKey,JSON.stringify(arr));
    };
}
