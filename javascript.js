$(function() {
    $("#Postcode").selectmenu();
});

$(function() {
    $("#type").selectmenu();
});

$(function() {
    $("#date").selectmenu();
});

$(function() {
    $("#rooms").selectmenu();
});

$(function() {
	$("#price-range").slider({
		range:true,
		min: 99999,
		max: 500000,
		values: [ 20, 40 ],
		slide: function( event, ui ){
			$("#propertyPrice").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
		}
	});
	
	$("#propertyPrice").val(" £" + $(" #price-range").slider( "values", 0 ) + " - £" + $("#price-range").slider( "values", 1 ) );
});


$(function() {
	$( "#Search" ).on("click", function(){
		
		var postcode = $("#Postcode").val();
        var type = $("#type").val();
        var date = $("#date").val();
        var rooms = $("#rooms").val();
        var minimumPrice = $("#price-range").slider("option", "values")[0];
		var maximumPrice = $("#price-range").slider("option", "values")[1];
		
		var output="<ul>";
		   for (var i in data.properties) {
			   if ((postcode == data.properties[i].pCode) || (postcode=="Any"))
               if ((date == data.properties[i].added) || (date=="Any"))
               if ((type == data.properties[i].type) || (type=="Any"))
               if ((rooms == data.properties[i].bedrooms) || (rooms=="Any"))
               if (( data.properties[i].price >= minimumPrice && data.properties[i].price <= maximumPrice ))
			   {
				   {
					   {
						   {
                               {
							   output+="<br><br><br>"+"<h2><li>" + 
                               data.properties[i].location + "<br>"+
                                "£" + data.properties[i].price + "<br>"+ data.properties[i].type   +"</li></h2>" +
                                "<img src=" + data.properties[i].picture + ">" + 
                                "<p>" + data.properties[i].description + "</p>" +
                                 "<p>"+"Available rooms : "+"</p>"+"<h4>" + data.properties[i].bedrooms + 
                                "</h4>" +"<button><a href='" + data.properties[i].url + "'>Visit Page</a></button>";
                }   }   }   }   } }  
				output+="</ul>";
				document.getElementById( "search-results-holder1" ).innerHTML = output;
		   });
	});

    $(function() {
        $( ".add-favourites-btn" ).on("click", function(){
            
            try {
                $(this).attr('disabled', true);
                
                var addPropertyID = $(this).closest("p").attr("id");
                
                var FavouriteProperty=JSON.parse(localStorage.getItem("favProperty"));
                
                if(FavouriteProperty == null) {
                    FavouriteProperty = [];
                }
                
                if(FavouriteProperty != null) {
                    for ( var j = 0; j < FavouriteProperty.length; j++) {                        
                        if ( addPropertyID == FavouriteProperty[j]) {                            
                            alert("This property is already in your favourites list."); 
                            FavouriteProperty = [];
                        }
                    }
                }
                
                FavouriteProperty.push(addPropertyID);                
                localStorage.setItem("favProperty", JSON.stringify(FavouriteProperty));                
            }
            
            catch (e) {
                if (e==QUOTA_EXCEEDED_ERR) {
                    console.log("Error: The local storage limit has been exceeded.");
                }
                
                else {
                    console.log("Error: Saving to local storage.");
                }
            }
        });
    });
    
    
    $(function() {
        $( ".remove-favourites-btn" ).on("click", function(){
            
                $(this).attr('disabled', true);
                
                var removePropertyID = $(this).closest("p").attr("id");
                
                FavouriteProperty=JSON.parse(localStorage.getItem("favProperty"));
                
                
                if(FavouriteProperty != null) {
                    for ( var j = 0; j < FavouriteProperty.length; j++) {
                        
                        if ( removePropertyID == FavouriteProperty[j]) {
                            
                            alert("This item has been removed from you favourites.");
                            
                            delete FavouriteProperty[j];
                            
                            localStorage.setItem("favProperty", JSON.stringify(FavouriteProperty));
                            
                            FavouriteProperty[j] = [];
                        }
                    }
                }
                
                if(FavouriteProperty == null) {
                    alert("You don't have any favorites.");
                }
            });
        });
        
        
    $(function() {
        $( ".view-favourites-btn" ).on("click", function(){
            
            console.log("Data restoring from local storage for arrays");
            
            FavouriteProperty=JSON.parse(localStorage.getItem("favProperty"));
            
            var output = "<ul>";
            
            if (FavouriteProperty != null) {
                
                for (var i = 0; i < data.properties.length; i++) {
                    for (j = 0; j < FavouriteProperty.length; j++) {
                        
                        if (data.properties[i].id == FavouriteProperty[j]) {
                            
                            output+=
                            "<h4><li>" + data.properties[i].location +"<br>"+ "</li></h4>"+
                            "<h5><li>"+ "£ "+ data.properties[i].price + "<br><br>" + data.properties[i].bedrooms + "</h5></li>" +
                            "<img src=" + data.properties[i].picture + ">" +"<li><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
                        }
                    }
                }
            }
            output+="</ul>";
            
            document.getElementById( "search-results-holder2" ).innerHTML = output;
        
        });
    });
    
    
    $(function() {
        $( ".clear-favourites-btn" ).on("click", function(){
            
            $("#search-results-holder2").remove();
            
            FavouriteProperty=JSON.parse(localStorage.getItem("favProperty"));
            
            localStorage.clear();
            
        });
        
    });    