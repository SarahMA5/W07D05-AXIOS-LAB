

$( document ).ready(function() {


    //Random Cat Image.
    function getRandom(){
    axios({
        method:'get',
        url: ' https://api.thecatapi.com/v1/images/search'
    })
    .then(response=>{
        console.log(response.data[0].url);
        $("#image").attr("src",response.data[0].url);
    
    })
    .catch(error=>{
        console.log(error);
    })


    //Get breed id

    
    
    $( "#submit" ).click(function() {
        var inputBreed=$("#breed").val();
        console.log(inputBreed);
        getBreedID(inputBreed);
      });
    }

      $( "#random" ).click(function() {
        getRandom();
      });

      
      function getBreedID(input){
        var id;
        axios({
            method:'get',
            url: 'https://api.thecatapi.com/v1/breeds'
        })
        .then(response=>{
            console.log(response.data);
            for(item in (response.data)){
                //console.log(response.data[item].name)
                if((response.data[item].name).toLowerCase()==input.toLowerCase()){
                    console.log(response.data[item].id)
                     id=response.data[item].id;
                     getImageByBreedID(id);

                     return id;
                }
            }
        })
        .catch(error=>{
            console.log(error);
        })
        //console.log("Found ID: "+id)
       

    }

        //Image By Category
        function getImageByBreedID(breedID){

        axios({
            method:'get',
            url: `https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`
        })
        .then(response=>{
            console.log(response.data[0].url);
            console.log("Got URL:")
            $("#image").attr("src",response.data[0].url);
        })
        .catch(error=>{
            console.log(error);
        })
    
}
});