
function MapForm(map,formId) {
    this.marker;
    var formElement=document.getElementById(formId);

    var formInputs={
        positionInput:document.getElementById(formId+'-coords'),
        titleInput:document.getElementById(formId+'-name')
    };
    this.addMarker=function () {
        marker=new Marker(
        {   position:map._map.center,
            title:"New Marker",
            draggable:true,
            map:map._map
        });
        formElement.classList.remove('hidden');
        formInputs.positionInput.value=marker.getPosition();
        formInputs.titleInput.value=marker.getGoogleMarker().getTitle();

        marker.getGoogleMarker().addListener('dragend',function () {
            formInputs.positionInput.value=marker.getPosition();
        });
    };
    this.getTitle=function () {
        return formInputs.titleInput.value;
    }
    this.editMarker=function(){
        marker=map.getEditMarker();
        formElement.classList.remove('hidden');
        //marker.getGoogleMarker().draggable=true;
        formInputs.positionInput.value=marker.getPosition();
        formInputs.titleInput.value=marker.getGoogleMarker().getTitle();
        map.saveMarker(marker);
    };
    this.saveMarker=function () {
        marker.getGoogleMarker().title=formInputs.titleInput.value;
        map.saveMarker(marker);
        marker.getGoogleMarker().draggable=false;
        marker=undefined;

        formElement.classList.add('hidden');
        formInputs.positionInput.value='';
        formInputs.titleInput.value='';
    };
}
